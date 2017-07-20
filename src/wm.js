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

    var wmHTML = function(cfg){//only for ie 8
        this.attach = function(){
            //add style for span
            var style = ".wm-span-placeholder{\
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

            //create span for watermark
            var elements = document.querySelectorAll(cfg.selector);
            for(var i=0; i<elements.length; i++){
                var span = document.createElement("span");
                span.className = 'wm-span-placeholder';
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
            var elements = document.querySelectorAll('.wm-span-placeholder');
            for(var i = 0; i<elements.length; i++){
                elements[i].innerHTML=cfg.content;
            }
        }

        this.hide = function(){
            if(isHidden)
                return;

            isHidden = true;
            var elements = document.querySelectorAll('.wm-span-placeholder');
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
            "content":""
        };

        if(typeof options == 'string'){
            cfg.content = options;
        }
        else{
            merge(cfg, options);
        }

        var runtime = ('\v'=='v')?new wmHTML(cfg):new wmCSS3(cfg);//use html for ie8

        if(isIE || runtime instanceof wmHTML){
            hackCopy(runtime);
        }

        return runtime.attach();
    }


    var wm = {
        create: attach
    }

    window.wm = wm;
})();

