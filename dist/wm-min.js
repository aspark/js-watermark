!function(){function e(e,n){if(null!=n)for(var t in n)e[t]=n[t];return e}function n(e){return e.replace(/(\s+$)|(^\s+)/gi,"")}function t(e){var n=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(n),n.innerHTML=e}function o(e,n,t){t=t||document,document.addEventListener(e,function(e){n(e||window.event)})}function i(e){t("@media screen{            "+e.selector+'{                content:"'+(e.content||"")+'";                opacity:'+e.opactiy+";                -webkit-opacity:"+e.opactiy+";                -moz-opacity:"+e.opactiy+";                position:absolute;                font-size:"+e.fontsize+"px;                color:"+e.color+";                display:inline;                text-decoration:none;                pointer-events:none;                -webkit-user-select:none;                -moz-user-select:none;                -ms-user-select:none;                user-select:none;                transform:rotate("+e.rotate+"deg);            }        }")}function c(e){t("@media screen{            "+e.selector+'{                content:"";            }        }')}function r(e){a||(a=!0,c(e))}function u(e){a&&(a=!1,i(e))}function s(e){o("keydown",function(n){n.ctrlKey&&r(e)}),o("keyup",function(n){n.ctrlKey||u(e)}),o("mousedown",function(e){e.button>-1&&(l=!0)}),o("mouseup",function(n){n.button>-1&&(l=!1,u(e))}),o("mousemove",function(){l&&r(e)})}var f="ActiveXObject"in window,a=!1,l=!1,d={create:function(t){var o={selector:"p, td",color:"yellow",opactiy:.005,fontsize:21,rotate:-30,suffix:"::before",content:""};if("string"==typeof t?o.content=t:e(o,t),o.selector.indexOf(":")<0){var c=o.selector.split(",");for(var r in c)c[r].indexOf(":")<0&&(c[r]=n(c[r])+o.suffix);o.selector=c.join(",")}return f&&s(o),i(o)}};window.wm=d}();