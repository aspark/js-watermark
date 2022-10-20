(function (root) {
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

    //max:最大长度， min：最小长度，rangeStart,rangeLength:字符范围，默认使用字母65,26，中文：4e00_9fff
    function randomChars(max, min, rangeStart, rangeLength) {
        let chars = '';
        let count = Math.max(min || 1, Math.round(Math.random() * max));//字符数量
        rangeStart = rangeStart === null || rangeStart === undefined ? 65 : rangeStart;
        rangeLength = rangeLength === null || rangeLength === undefined ? 26 : rangeLength;
        for (let i = 0; i < count; i++) {
            chars += (String.fromCodePoint || String.fromCharCode)(Math.round(Math.random() * rangeLength) + rangeStart)
        }

        return chars;
    }

    //<= 1.0	Not perceptible by human eyes.
    //1 - 2	Perceptible through close observation.
    //2 - 10	Perceptible at a glance.
    //11 - 49	Colors are more similar than opposite
    //100	Colors are exact opposite
    function deltaRGB(rgbA, rgbB) {
        let labA = rgb2lab(rgbA);
        let labB = rgb2lab(rgbB);
        let deltaL = labA[0] - labB[0];
        let deltaA = labA[1] - labB[1];
        let deltaB = labA[2] - labB[2];
        let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
        let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
        let deltaC = c1 - c2;
        let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
        deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
        let sc = 1.0 + 0.045 * c1;
        let sh = 1.0 + 0.015 * c1;
        let deltaLKlsl = deltaL / (1.0);
        let deltaCkcsc = deltaC / (sc);
        let deltaHkhsh = deltaH / (sh);
        let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
        let result = i < 0 ? 0 : Math.sqrt(i);
        // console.log(rgbA, rgbB, result);

        return result;
    }

    function rgb2lab(rgb) {
        let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
        r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
        y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
        z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
        x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
        y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
        z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
        return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
    }

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
        let config = merge({
            row: 6,
            rowInterval: 90,
            col: 3,
            colInterval: 180,
            x: 0,
            y: 0,
            unit: 'px',
            containerClassName: 'wm-container',
            containerStyle: true,
        }, cfg);

        HTMLSingleGenerator.apply(this, arguments);

        this.containerClassName = config.containerClassName;//需要手动添加样式
        this.addContainerStyle = function () {
            let style = '';
            if (typeof config.containerStyle === 'boolean') {
                if (config.containerStyle === true) {
                    style = "." + this.containerClassName + "{\
                        position:absolute;\
                        top:0;\
                        left:0;\
                        z-index:-1;\
                    }";
                }
            }
            else if (config.containerStyle && typeof config.containerStyle === 'string') {
                style = config.containerStyle;
            }

            if (style)
                addStyle(style);
        }

        this.createContainer = function () {
            var container = document.createElement('div');
            container.className = this.containerClassName;

            for (var r = 0; r < config.row; r++) {
                for (var c = 0; c < config.col; c++) {
                    var tile = document.createElement('span');
                    tile.className = this.textClassName;
                    tile.style.marginTop = (r * config.rowInterval + config.y) + config.unit;
                    tile.style.marginLeft = (c * config.colInterval + config.x) + config.unit;
                    tile.innerHTML = config.content;
                    container.appendChild(tile);
                }
            }

            return container;
        }

        var observer = null;
        if (config.renew && !!(typeof MutationObserver)) {
            observer = new MutationObserver(function (mutations) {
                console.log("changed", arguments)
                mutations.forEach(function (mutation) {
                    if (mutation.type === "childList" && !!mutation.removedNodes) {
                        mutation.removedNodes.forEach(function (node) {
                            if (node.classList.contains(config.containerClassName)) {
                                mutation.target.appendChild(node);
                            }
                        })
                    }
                });
            });
        }

        this.attach = function () {
            this.addContainerStyle();
            this.addTextStyle();

            var elements = getElements(cfg.selector);
            for (var i = 0; i < elements.length; i++) {
                elements[i].appendChild(this.createContainer());

                if (config.renew && observer && elements[i].htmlObserved != true) {
                    observer.observe(elements[i], {
                        childList: true
                    });
                    elements[i].htmlObserved = true
                }
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
            fontSize: 21,

            width: null,
            height: null
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

        var observer = null;
        if (config.renew && !!(typeof MutationObserver)) {
            observer = new MutationObserver(function (mutations) {
                // console.log("attributes changed", arguments)
                mutations.forEach(function (mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName == 'style') {
                        if (mutation.target.cssStyleBackground != mutation.target.style.background) {
                            mutation.target.style.background = mutation.target.cssStyleBackground;
                        }
                    }
                });
            });
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

                el.cssStyleBackground = el.style.background;

                if (config.renew && observer && el.cssObserved != true) {
                    observer.observe(el, {
                        attributes: true,
                        attributeFilter: ['style']
                    });
                    el.cssObserved = true
                }
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
            tagTxt: '',
            tagWidth: "1px",
            containerTag: "span",
            userSelect: "none", //'none' 'inherit'
            headerWidth: 2,
            totalWidth: 20,
            noise: false, // 是否添加干扰字符，或使用自定义的方法生成function():char
            noiseAll: false,// 在所有字符后添加干扰
            noiseColor: "transparent", //干扰字符的颜色
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

                let noise = null;
                if (config.noise == true) {
                    noise = function () {
                        return randomChars(6, null, 0x4e00, 3000);
                    }
                }
                else if (typeof config.noise == 'function') {
                    noise = config.noise;
                }

                if (text !== null && text.length > marks.length) {
                    let html = "";
                    let hasInsert = false;
                    for (let i = 0, j = 0; i < text.length; i++) {
                        html += text[i];
                        if (config.fnIsSkipChars(text[i]) === false) {
                            let tagWidth = marks[j % marks.length] == "1" ? config.tagWidth : '0px';//标记位为1的才添加
                            let needInsert = (noise && config.noiseAll) || tagWidth !== '0px';

                            j++;
                            if (needInsert) {
                                hasInsert = true;
                                if (noise) {
                                    html += `<${config.tag} style='display:inline-block;width:${tagWidth};color:${config.noiseColor};white-space:nowrap;wordbreak:keep-all'>${noise(config)}</${config.tag}>`; //height:${config.tagWidth}
                                }
                                else {
                                    html += `<${config.tag} style='display:inline-block;width:${tagWidth};'></${config.tag}>`; //height:${config.tagWidth}
                                }
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

        function addMark(target, marks) {
            scanNodes(target, marks);
        }

        this.attach = function () {
            let num = config.content;
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

            var elements = getElements(config.selector);
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.userSelect = config.userSelect;
                addMark(elements[i], marks, config)
            }
        }
    }

    var PixelGenerator = function (cfg) {
        if (!window.html2canvas) {
            throw new Exception('need html2canvas lib')
        }

        let config = merge({
            // replaceByCanvas: false
        }, cfg)

        this.draw = function (el, marks) {
            // el.style.position = 'relative'
            let that = this;
            if (el.nodeName == 'CANVAS') {
                //todo:
            }
            else {
                html2canvas(el).then(function (canvas) {
                    that.scan(el, canvas, marks)
                })
            }
        }

        let getColor = function (data, index) {
            // return data[index].toString('16') + data[index + 1].toString('16') + data[index + 2].toString('16') + data[index + 3].toString('16')

            return (data[index] << 16) + (data[index + 1] << 8) + data[index + 2]// + data[index + 3]
        }

        let difColor = function (a, b) {
            return deltaRGB([a & 0xff0000 >> 16, a & 0xff00 >> 8, a & 0xff], [b & 0xff0000 >> 16, b & 0xff00 >> 8, b & 0xff]) > 50;
        }


        this.scan = function (el, canvas, marks) {

            //   document.body.appendChild(canvas)

            let width = canvas.width;
            let height = canvas.height;
            let context = canvas.getContext('2d');
            // console.log(context.getImageData(0, 0, width, height))
            let image = context.getImageData(0, 0, width, height, { colorSpace: "srgb" })
            let data = image.data;
            let bgColor = getColor(data, 0)
            let lastColor = null;
            let size = context.measureText('中')
            let rowDelta = Math.round((size.fontBoundingBoxAscent + size.fontBoundingBoxDescent) / 2);
            let colDelta = Math.round(size.width / 2);
            // context.fillStyle = "white";
            // context.fillRect(0, 0, width, height);
            // context.fillText('中', 60, 60);

            // console.log(size)
            let matchCount = 0;
            for (let row = 0; row < height; row += rowDelta) {
                for (let col = 0; col < width; col++) {
                    let color = getColor(data, (row * width + col) * 4);

                    if (lastColor && difColor(color, lastColor) && difColor(color, bgColor) == false) {
                        // console.log(color);
                        matchCount++;
                        let needPixel = marks[matchCount % marks.length] == "1";//标记位为1的才添加
                        if (needPixel) {
                            data[(row * width + col) * 4] = 0;
                            data[(row * width + col) * 4 + 1] = 0;
                            data[(row * width + col) * 4 + 2] = 0;
                            data[(row * width + col) * 4 + 3] = 255;
                            // var i = document.createElement('i');
                            // i.style.display = 'inline-block'
                            // i.style.width = '1px'
                            // i.style.height = '1px'
                            // i.style.position = 'absolute'
                            // i.style.top = row + 'px'
                            // i.style.left = col + 'px'
                            // i.style.backgroundColor = config.color;
                            // i.textContent = color;
                            // el.appendChild(i);
                        }
                    }

                    lastColor = color;
                }
            }
            context.putImageData(image, 0, 0)
            el.replaceWith(canvas)
        }

        this.attach = function () {
            let num = config.content;
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


            let elements = getElements(config.selector)
            for (let i = 0; i < elements.length; i++) {
                this.draw(elements[i], marks)
            }
        }

    }

    function attach(options) {
        var cfg = {
            "selector": "p, td",
            "mode": null,//"css", "html", "bg", "txt"
            "tile": true,//
            "content": "",

            "color": "yellow",
            "opacity": 0.005, // 0.03
            "fontSize": 21,
            "rotate": -30,
            "renew": true
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
        else if (cfg.mode == 'pixel')
            runtime = new PixelGenerator(cfg);
        else
            runtime = ('\v' == 'v') ? new HTMLGenerator(cfg) : new CSS3Generator(cfg);//use html for ie8


        // if (isIE || !(runtime instanceof wmCSS3)) {
        //     hackCopy(runtime);
        // }

        return runtime.attach();
    }


    var wm = {
        create: attach,
        distroy: function () { },
        randomChars: randomChars
    }


    if (typeof define === 'function' && define.amd) {
        define(wm);
    } else if (typeof exports === 'object') {
        module.exports = w;
    }

    root.wm = wm;
})(window);

