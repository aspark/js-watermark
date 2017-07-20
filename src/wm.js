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

    function trim(str){
        return str.replace(/(\s+$)|(^\s+)/ig, '');
    }

    function attachVML(cfg){
        // document.namespaces.add('vml', 'urn:schemas-microsoft-com:vml', "#default#VML");

        // addStyle("vml\:* { behavior: url(#default#VML) }");


    }

    function attachSVG(cfg){
        
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

    function attachCSS(cfg){
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

    function clearCSS(cfg){
        var style = "@media screen{\
            "+cfg.selector+"{\
                content:\"\";\
            }\
        }"

        addStyle(style);
    }

    var isHidden = false;
    function hide(cfg){
        if(isHidden)
            return;

        isHidden=true;
        console.log('hide');
        clearCSS(cfg);
    }


    function show(cfg){
        if(isHidden){

            isHidden=false;
            console.log('show');
            attachCSS(cfg);
        }
    }

    function hackCopy(cfg){
        addListener("copy", function(){
            hide(cfg);
            setTimeout(function() {
                show(cfg);
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

        if(cfg.selector.indexOf(':')<0){
            var segs = cfg.selector.split(',');
            for(var i in segs){
                if(segs[i].indexOf(':')<0){
                    segs[i] = trim(segs[i])+cfg.suffix;
                }
            }

            cfg.selector = segs.join(",");
        }

        if('\v'=='v'){//ie8  /*@cc_on!@*/false
            return attachVML(cfg);
        }

        if(isIE){
            hackCopy(cfg);
        }

        return attachCSS(cfg)
    }


    var wm = {
        create: attach
    }

    window.wm = wm;
})();

