!function(){function e(e,t){if(null!=t)for(var n in t)e[n]=t[n];return e}function t(e){var t=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(t),t.innerHTML=e}function n(e,t,n){n=n||document,document.addEventListener(e,function(e){t(e||window.event)})}function o(e){return e.replace(/(\s+$)|(^\s+)/gi,"")}function i(e){n("copy",function(){e.hide(),setTimeout(function(){e.show()},10)})}var c="ActiveXObject"in window,r=function(e){this.attach=function(){t(".wm-span-placeholder{                    opacity:"+e.opactiy+";                    -webkit-opacity:"+e.opactiy+";                    -moz-opacity:"+e.opactiy+";                    position:absolute;                    font-size:"+e.fontsize+"px;                    color:"+e.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+e.rotate+"deg);                }            }");for(var n=document.querySelectorAll(e.selector),o=0;o<n.length;o++){var i=document.createElement("span");i.className="wm-span-placeholder",i.style.filter="alpha(opacity="+100*e.opactiy+")",i.innerHTML=e.content,n[o].appendChild(i)}};var n=!1;this.show=function(){if(n){n=!1;for(var t=document.querySelectorAll(".wm-span-placeholder"),o=0;o<t.length;o++)t[o].innerHTML=e.content}},this.hide=function(){if(!n){n=!0;for(var e=document.querySelectorAll(".wm-span-placeholder"),t=0;t<e.length;t++)e[t].innerHTML=""}}},a=function(e){if(e.originSelector=e.selector,e.selector.indexOf(":")<0){for(var n=e.selector.split(","),i=0;i<n.length;i++)n[i].indexOf(":")<0&&(n[i]=o(n[i])+e.suffix);e.selector=n.join(",")}this.attach=function(){t("@media screen{                "+e.selector+'{                    content:"'+(e.content||"")+'";                    opacity:'+e.opactiy+";                    -webkit-opacity:"+e.opactiy+";                    -moz-opacity:"+e.opactiy+";                    position:absolute;                    font-size:"+e.fontsize+"px;                    color:"+e.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+e.rotate+"deg);                }            }")};var c=!1;this.show=function(){c&&(c=!1,t("@media screen{                "+e.selector+'{                    content:"'+(e.content||"")+'";                }            }'))},this.hide=function(){c||(c=!0,t("@media screen{                "+e.selector+'{                    content:"";                }            }'))}},s={create:function(t){var n={selector:"p, td",color:"yellow",opactiy:.005,fontsize:21,rotate:-30,suffix:"::before",content:""};"string"==typeof t?n.content=t:e(n,t);var o=new a(n);return(c||o instanceof r)&&i(o),o.attach()}};window.wm=s}();