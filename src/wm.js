(function () {
    var isIE = (function () {
        return "ActiveXObject" in window
    })();

    function merge(target, src) {
        // Object.assign
        if (src != null) {
            for (var p in src) {
                target[p] = src[p];
            }
        }

        return target;
    }

    function addStyle(html) {
        var style = document.createElement("style");
        document.getElementsByTagName('head')[0].appendChild(style);
        if ('\v' == 'v') {//ie8
            style.styleSheet.cssText = html;
        }
        else {
            style.innerHTML = html;
        }
    }

    // function addListener(name, fn, target) {
    //     target = target || document;
    //     document['addEventListener'](name, function (e) {
    //         fn(e || window.event);
    //     });
    // }

    function trim(str) {
        return str.replace(/(\s+$)|(^\s+)/ig, '');
    }

    // function getRotationDegrees(obj) {
    //     var matrix = obj.css("-webkit-transform") ||
    //         obj.css("-moz-transform") ||
    //         obj.css("-ms-transform") ||
    //         obj.css("-o-transform") ||
    //         obj.css("transform");
    //     if (matrix !== 'none') {
    //         var values = matrix.split('(')[1].split(')')[0].split(',');
    //         var a = values[0];
    //         var b = values[1];
    //         var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    //     } else {
    //         var angle = 0;
    //     }

    //     return angle;//(angle < 0) ? angle + 360 : angle;
    // }

    function getElements(selector) {
        return document.querySelectorAll(selector);
    }

    //将水印内容以span添加到页面上
    var HTMLGenerator = function (cfg) {
        if (cfg.tile)
            HTMLTileGenerator.apply(this, arguments);
        else
            HTMLSingleGenerator.apply(this.arguments);
    };


    //将水印内容以span添加到页面上
    var HTMLSingleGenerator = function (cfg) {
        cfg = merge({
            opacity: 0.005,
            fontSize: 21,
            color: "yellow",
            rotate: -30
        }, cfg);

        this.textClassName = 'wm-text-placeholder';

        this.addTextStyle = function () {
            //add style for span
            var style = "." + this.textClassName + "{\
                    opacity:"+ cfg.opacity + ";\
                    -webkit-opacity:"+ cfg.opacity + ";\
                    -moz-opacity:"+ cfg.opacity + ";\
                    position:absolute;\
                    font-size:"+ cfg.fontSize + "px;\
                    color:"+ cfg.color + ";\
                    display:inline;\
                    text-decoration:none;\
                    pointer-events:none;\
                    -webkit-user-select:none;\
                    -moz-user-select:none;\
                    -ms-user-select:none;\
                    user-select:none;\
                    transform:rotate("+ cfg.rotate + "deg);\
                }\
            }";
            addStyle(style);
        }

        this.attach = function () {
            this.addTextStyle();

            //create span for watermark
            var elements = getElements(cfg.selector);
            for (var i = 0; i < elements.length; i++) {
                var span = document.createElement("span");
                span.className = this.textClassName;
                span.style.filter = "alpha(opacity=" + cfg.opacity * 100 + ")";
                span.innerHTML = cfg.content;
                elements[i].appendChild(span);
            }
        }
    }

    //继承html模式，但开启了水平和垂直平铺
    var HTMLTileGenerator = function (cfg) {
        cfg = merge({
            row: 6,
            rowInterval: 90,
            col: 3,
            colInterval: 180,
            x: 0,
            y: 0,
            unit: 'px'
        }, cfg);

        HTMLSingleGenerator.apply(this, arguments);

        this.containerClassName = "wm-container";//需要手动添加样式
        this.addContainerStyle = function () {
            var style = "." + this.containerClassName + "{\
                position:relative;\
                top:0;\
                z-index:999;\
                overflow:hidden;\
            }";
            addStyle(style);
        }

        this.createContainer = function () {
            var container = document.createElement('div');
            container.className = this.containerClassName;

            for (var r = 0; r < cfg.row; r++) {
                for (var c = 0; c < cfg.col; c++) {
                    var tile = document.createElement('span');
                    tile.className = this.textClassName;
                    tile.style.marginTop = (r * cfg.rowInterval + cfg.y) + cfg.unit;
                    tile.style.marginLeft = (c * cfg.colInterval + cfg.x) + cfg.unit;
                    tile.innerHTML = cfg.content;
                    container.appendChild(tile);
                }
            }

            return container;
        }

        this.attach = function () {
            // this.addContainerStyle();
            this.addTextStyle();

            var elements = getElements(cfg.selector);
            for (var i = 0; i < elements.length; i++) {
                elements[i].appendChild(this.createContainer());
            }
        }
    }

    //使用css的::before特性添加
    var CSS3Generator = function (cfg) {
        cfg = merge({
            "color": "yellow",
            "opacity": 0.005,
            "fontSize": 21,
            "rotate": -30,
            "suffix": "::before",
        }, cfg);

        cfg.originSelector = cfg.selector;
        if (cfg.selector.indexOf(':') < 0) {
            var segs = cfg.selector.split(',');
            for (var i = 0; i < segs.length; i++) {
                if (segs[i].indexOf(':') < 0) {
                    segs[i] = trim(segs[i]) + cfg.suffix;
                }
            }

            cfg.selector = segs.join(",");
        }

        this.attach = function () {
            var style = "@media screen{\
                "+ cfg.selector + "{\
                    content:\""+ (cfg.content || '') + "\";\
                    opacity:"+ cfg.opacity + ";\
                    -webkit-opacity:"+ cfg.opacity + ";\
                    -moz-opacity:"+ cfg.opacity + ";\
                    position:absolute;\
                    font-size:"+ cfg.fontSize + "px;\
                    color:"+ cfg.color + ";\
                    display:inline;\
                    text-decoration:none;\
                    pointer-events:none;\
                    -webkit-user-select:none;\
                    -moz-user-select:none;\
                    -ms-user-select:none;\
                    user-select:none;\
                    transform:rotate("+ cfg.rotate + "deg);\
                }\
            }"

            addStyle(style);
        }
    }

    //以背景图的形式添加
    var BgGenerator = function (cfg) {
        let config = merge({
            color: '#eee',
            rotate: -30,
            fontSize: 21
        }, cfg);

        function getImageDataUrl(msg) {
            let canvas = document.createElement('canvas')
            // console.log(config)
            canvas.width = config.width || config.fontSize * msg.length * 0.7;
            canvas.height = config.height || config.fontSize * msg.length * 0.4;

            let ctx = canvas.getContext('2d')
            ctx.translate(config.fontSize / 3, canvas.height - config.fontSize / 3)
            ctx.rotate(config.rotate * Math.PI / 180)
            ctx.font = config.fontSize + 'px Arial'
            ctx.fillStyle = config.color
            ctx.fillText(msg, 0, 0)

            return canvas.toDataURL('png')
        }

        function setWatermark(el) {
            let content = config.content
            if (typeof (config.content) == 'function') {
                content = config.content()
                if (!content) {
                    return setTimeout(() => {
                        setWatermark(el)
                    }, 10)
                }
            }

            setTimeout(() => {
                let img = getImageDataUrl(content)
                if (cfg.tile)
                    el.style.background = `repeat url(${img})`
                else
                    el.style.background = `url(${img})`
            }, 0)
        }

        this.attach = function () {
            var elements = getElements(config.selector);
            for (let i = 0; i < elements.length; i++) {
                setWatermark(elements[i])
            }

        }

    }

    //在文本中插入特征量
    var TxtGenerator = function (cfg) {
        let config = merge({
            targetNodeType: Node.TEXT_NODE,
            tag: "i",
            tagWidth: "1px",
            containerTag: "span",
            userSelect: "none", //'none' 'inherit'
            headerWidth: 2,
            totalWidth: 20,
            skipChars: [
                "，",
                "。",
                "：",
                "；",
                "“",
                "”",
                "。",
                "《",
                "》",
                "（",
                "）",
                "——",
                "【",
                "】",
            ],
            fnIsSkipChars: function (char) {
                if (char) {
                    return (
                        (config.skipChars && config.skipChars.indexOf(char) > -1) ||
                        char.charCodeAt(0) < 256
                    );
                }

                return false;
            },
        }, cfg);

        function insert(node, marks) {
            if (node) {
                //wholeText
                // console.log(node, node.constructor, node instanceof Text);
                let text = null;
                if (node.nodeType == Node.TEXT_NODE) {
                    text = node.wholeText;
                } else if (node.innerText) {
                    text = node.innerText;
                } else {
                    text = node.textContent;
                }

                if (text !== null && text.length > marks.length) {
                    let html = "";
                    let hasInsert = false;
                    for (let i = 0, j = 0; i < text.length; i++) {
                        html += text[i];
                        if (config.fnIsSkipChars(text[i]) === false) {
                            var needInsert = marks[j % marks.length] == "1"; //标记位为1的才添加
                            j++;
                            if (needInsert) {
                                hasInsert = true;
                                html += `<${config.tag} style='display:inline-block;width:${config.tagWidth};'></${config.tag}>`; //height:${config.tagWidth}
                            }
                        }
                    }

                    if (hasInsert) {
                        let span = document.createElement(config.containerTag);
                        span.innerHTML = html;
                        span.style.userSelect = config.userSelect;
                        node.replaceWith(span);
                    }
                }
            }
        }

        function scanNodes(element, marks) {
            var children = element.childNodes;
            if (children.length) {
                children.forEach(function (node) {
                    if (node.nodeType === config.targetNodeType) {
                        insert(node, marks);
                    } else {
                        scanNodes(node, marks);
                    }
                });
            }
        }

        function addMark(target, num, config) {
            if (isNaN(+num)) {
                throw "请先转换为字值";
            }

            let marks = num.toString(2);
            //添加三个0前缀
            if (marks.length < config.totalWidth) {
                marks = marks.padStart(config.totalWidth, "0");
            } else {
                marks = marks.substring(marks.length - config.totalWidth);
            }

            if (config.headerWidth > 0) {
                marks = new Array(config.headerWidth + 1).join("0") + marks;
            }

            scanNodes(target, marks);
        }

        this.attach = function () {
            var elements = getElements(config.selector);
            for (let i = 0; i < elements.length; i++) {
                addMark(elements[i], config.content, config)
            }
        }
    }

    // function hackCopy(runtime) {
    //     addListener("copy", function () {
    //         runtime.hide();
    //         setTimeout(function () {
    //             runtime.show();
    //         }, 10);
    //     });
    // }

    function attach(options) {
        var cfg = {
            "selector": "p, td",
            "mode": null,//"css", "html", "bg", "txt"
            "tile": true,//
            "content": "",

            "color": "yellow",
            "opacity": 0.005,
            "fontSize": 21,
            "rotate": -30,
            "suffix": "::before",
        };

        if (typeof options == 'string') {
            cfg.content = options;
        }
        else {
            merge(cfg, options);
        }

        var runtime = null;
        if (cfg.mode == 'css')
            runtime = new CSS3Generator(cfg);
        else if (cfg.mode == 'bg')
            runtime = new BgGenerator(cfg);
        else if (cfg.mode == 'txt')
            runtime = new TxtGenerator(cfg);
        else if (cfg.mode == 'html')
            runtime = new HTMLGenerator(cfg);
        else
            runtime = ('\v' == 'v') ? new HTMLGenerator(cfg) : new CSS3Generator(cfg);//use html for ie8


        // if (isIE || !(runtime instanceof wmCSS3)) {
        //     hackCopy(runtime);
        // }

        return runtime.attach();
    }


    var wm = {
        create: attach,
        distroy: function () { }
    }

    window.wm = wm;

    if (window.module) {

    }
})();

