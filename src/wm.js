(function(){
    var isIE = (function(){
        return "ActiveXObject" in window
    })();

    function merge(target, src){
        // Object.assign
        if(src!=null){
            for(var p in src){
                target[p]= src[p];
            }
        }

        return target;
    }

    function addStyle(html){
        var style = document.createElement("style");
        document.getElementsByTagName('head')[0].appendChild(style);
        if('\v'=='v'){//ie8
            style.styleSheet.cssText=html;
        }
        else{
            style.innerHTML=html;
        }
    }

    function addListener(name, fn, target){
        target = target|| document;
        document['addEventListener'](name, function(e){
            fn(e||window.event);
        });
    }

    function trim(str){
        return str.replace(/(\s+$)|(^\s+)/ig, '');
    }

    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else {
            var angle = 0;
        }

        return angle;//(angle < 0) ? angle + 360 : angle;
    }

    function getElements(selector){
        return document.querySelectorAll(selector);
    }

    var wmHTML = function(cfg){//only for ie 8
        this.textClassName = 'wm-text-placeholder';

        this.addTextStyle = function(){
            //add style for span
            var style = "."+this.textClassName+"{\
                    opacity:"+cfg.opactiy+";\
                    -webkit-opacity:"+cfg.opactiy+";\
                    -moz-opacity:"+cfg.opactiy+";\
                    position:absolute;\
                    font-size:"+cfg.fontsize+"px;\
                    color:"+cfg.color+";\
                    display:inline;\
                    text-decoration:none;\
                    pointer-events:none;\
                    -webkit-user-select:none;\
                    -moz-user-select:none;\
                    -ms-user-select:none;\
                    user-select:none;\
                    transform:rotate("+cfg.rotate+"deg);\
                }\
            }";
            addStyle(style);
        }

        this.attach = function(){
            this.addTextStyle();

            //create span for watermark
            var elements = getElements(cfg.selector);
            for(var i=0; i<elements.length; i++){
                var span = document.createElement("span");
                span.className = this.textClassName;
                span.style.filter = "alpha(opacity="+cfg.opactiy*100+")";
                span.innerHTML = cfg.content;
                elements[i].appendChild(span);
            }
        }

        var isHidden = false;
        this.show = function(){
            if(!isHidden)
                return;

            isHidden = false;
            var elements = getElements('.'+this.textClassName);
            for(var i = 0; i<elements.length; i++){
                elements[i].innerHTML=cfg.content;
            }
        }

        this.hide = function(){
            if(isHidden)
                return;

            isHidden = true;
            var elements = getElements('.'+this.textClassName);
            for(var i = 0; i<elements.length; i++){
                elements[i].innerHTML='';
            }
        }
    };

    var wmCSS3 = function(cfg){
        cfg.originSelector = cfg.selector;
        if(cfg.selector.indexOf(':')<0){
            var segs = cfg.selector.split(',');
            for(var i=0; i < segs.length; i++){
                if(segs[i].indexOf(':')<0){
                    segs[i] = trim(segs[i])+cfg.suffix;
                }
            }

            cfg.selector = segs.join(",");
        }

        this.attach = function(){           
            var style = "@media screen{\
                "+cfg.selector+"{\
                    content:\""+(cfg.content||'')+"\";\
                    opacity:"+cfg.opactiy+";\
                    -webkit-opacity:"+cfg.opactiy+";\
                    -moz-opacity:"+cfg.opactiy+";\
                    position:absolute;\
                    font-size:"+cfg.fontsize+"px;\
                    color:"+cfg.color+";\
                    display:inline;\
                    text-decoration:none;\
                    pointer-events:none;\
                    -webkit-user-select:none;\
                    -moz-user-select:none;\
                    -ms-user-select:none;\
                    user-select:none;\
                    transform:rotate("+cfg.rotate+"deg);\
                }\
            }"

            addStyle(style);
        }

        var isHidden = false;
        this.show = function(){
            if(!isHidden)
                return;

            isHidden=false;

            var style = "@media screen{\
                "+cfg.selector+"{\
                    content:\""+(cfg.content||'')+"\";\
                }\
            }"

            addStyle(style);
        }

        this.hide = function(){
            if(isHidden)
                return;

            isHidden=true;

            var style = "@media screen{\
                "+cfg.selector+"{\
                    content:\"\";\
                }\
            }"

            addStyle(style);
        }
    }

    var wmTile = function(cfg){
        wmHTML.apply(this, arguments);

        var defaultCfg= {
            row: 6,
            rowInterval: 90,
            col: 3,
            colInterval: 180,
            unit: 'px'
        };

        cfg = merge(defaultCfg, cfg);

        this.containerClassName="wm-container";
        this.addContainerStyle = function(){
            var style = "."+this.containerClassName+"{\
                position:relative;\
                top:0;\
                z-index:999;\
                overflow:hidden;\
            }";
            addStyle(style);
        }

        this.createContainer = function(){
            var container = document.createElement('div');
            container.className=this.containerClassName;

            for (var r = 0; r < cfg.row; r++) {
                for (var c = 0; c < cfg.col; c++) {
                    var tile = document.createElement('span');
                    tile.className=this.textClassName;
                    tile.style.marginTop=(r * cfg.rowInterval) + cfg.unit;
                    tile.style.marginLeft=(c * cfg.colInterval) + cfg.unit;
                    tile.innerHTML = cfg.content;
                    container.append(tile);
                }
            }

            return container;
        }

        this.attach = function(){
            // this.addContainerStyle();
            this.addTextStyle();

            var elements = getElements(cfg.selector);
            for(var i=0;i<elements.length;i++){
                elements[i].appendChild(this.createContainer());
            }
        }
    }

    function hackCopy(runtime){
        addListener("copy", function(){
            runtime.hide();
            setTimeout(function() {
                runtime.show();
            }, 10);
        });
    }

    function attach(options){
        var cfg = {
            "selector":"p, td",
            "color":"yellow",
            "opactiy":0.005,
            "fontsize":21,
            "rotate":-30,
            "suffix":"::before",
            "mode":null,//"css", "html"
            "tile":false,
            "content":""
        };

        if(typeof options == 'string'){
            cfg.content = options;
        }
        else{
            merge(cfg, options);
        }

        var runtime = null;
        if(cfg.tile)
            runtime = new wmTile(cfg);
        else{
            if(cfg.mode =='css')
                runtime = new wmCSS3(cfg);
            else if(cfg.mode == 'html')
                runtime = new wmHTML(cfg);
            else
                runtime = ('\v'=='v')?new wmHTML(cfg):new wmCSS3(cfg);//use html for ie8
        }

        if(isIE || !(runtime instanceof wmCSS3)){
            hackCopy(runtime);
        }

        return runtime.attach();
    }


    var wm = {
        create: attach
    }

    window.wm = wm;
})();

