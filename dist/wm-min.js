!function(){function t(t,e){if(null!=e)for(var n in e)t[n]=e[n];return t}function e(t){var e=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(e),e.innerHTML=t}function n(t){return document.querySelectorAll(t)}var o=function(t){t.tile?a.apply(this,arguments):i.apply(this.arguments)},i=function(o){o=t({opacity:.005,fontSize:21,color:"yellow",rotate:-30},o),this.textClassName="wm-text-placeholder",this.addTextStyle=function(){e("."+this.textClassName+"{                    opacity:"+o.opacity+";                    -webkit-opacity:"+o.opacity+";                    -moz-opacity:"+o.opacity+";                    position:absolute;                    font-size:"+o.fontSize+"px;                    color:"+o.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+o.rotate+"deg);                }            }")},this.attach=function(){this.addTextStyle();for(var t=n(o.selector),e=0;e<t.length;e++){var i=document.createElement("span");i.className=this.textClassName,i.style.filter="alpha(opacity="+100*o.opacity+")",i.innerHTML=o.content,t[e].appendChild(i)}}},a=function(o){let a=t({row:6,rowInterval:90,col:3,colInterval:180,x:0,y:0,unit:"px",containerClassName:"wm-container",containerStyle:!0},o);i.apply(this,arguments),this.containerClassName=a.containerClassName,this.addContainerStyle=function(){let t="";"boolean"==typeof a.containerStyle?!0===a.containerStyle&&(t="."+this.containerClassName+"{                        position:absolute;                        top:0;                        left:0;                        z-index:-1;                    }"):a.containerStyle&&"string"==typeof a.containerStyle&&(t=a.containerStyle),t&&e(t)},this.createContainer=function(){var t=document.createElement("div");t.className=this.containerClassName;for(var e=0;e<a.row;e++)for(var n=0;n<a.col;n++){var o=document.createElement("span");o.className=this.textClassName,o.style.marginTop=e*a.rowInterval+a.y+a.unit,o.style.marginLeft=n*a.colInterval+a.x+a.unit,o.innerHTML=a.content,t.appendChild(o)}return t};var r=null;a.renew&&(r=new MutationObserver(function(t){t.forEach(function(t){"childList"===t.type&&t.removedNodes&&t.removedNodes.forEach(function(e){e.classList.contains(a.containerClassName)&&t.target.appendChild(e)})})})),this.attach=function(){this.addContainerStyle(),this.addTextStyle();for(var t=n(o.selector),e=0;e<t.length;e++)t[e].appendChild(this.createContainer()),a.renew&&r&&1!=t[e].htmlObserved&&(r.observe(t[e],{childList:!0}),t[e].htmlObserved=!0)}},r=function(n){if((n=t({color:"yellow",opacity:.005,fontSize:21,rotate:-30,suffix:"::before"},n)).originSelector=n.selector,n.selector.indexOf(":")<0){for(var o=n.selector.split(","),i=0;i<o.length;i++)o[i].indexOf(":")<0&&(o[i]=o[i].replace(/(\s+$)|(^\s+)/gi,"")+n.suffix);n.selector=o.join(",")}this.attach=function(){e("@media screen{                "+n.selector+'{                    content:"'+(n.content||"")+'";                    opacity:'+n.opacity+";                    -webkit-opacity:"+n.opacity+";                    -moz-opacity:"+n.opacity+";                    position:absolute;                    font-size:"+n.fontSize+"px;                    color:"+n.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+n.rotate+"deg);                }            }")}},l=function(e){let o=t({color:"#eee",rotate:-30,fontSize:21},e);var i=null;function a(t){let n=o.content;if("function"==typeof o.content&&!(n=o.content()))return setTimeout(()=>{a(t)},10);setTimeout(()=>{let a=function(t){let e=document.createElement("canvas");e.width=o.width||o.fontSize*t.length*.7,e.height=o.height||o.fontSize*t.length*.4;let n=e.getContext("2d");return n.translate(o.fontSize/3,e.height-o.fontSize/3),n.rotate(o.rotate*Math.PI/180),n.font=o.fontSize+"px Arial",n.fillStyle=o.color,n.fillText(t,0,0),e.toDataURL("png")}(n);e.tile?t.style.background=`repeat url(${a})`:t.style.background=`url(${a})`,t.cssStyleBackground=t.style.background,o.renew&&i&&1!=t.cssObserved&&(i.observe(t,{attributes:!0,attributeFilter:["style"]}),t.cssObserved=!0)},0)}o.renew&&(i=new MutationObserver(function(t){t.forEach(function(t){"attributes"===t.type&&"style"==t.attributeName&&t.target.cssStyleBackground!=t.target.style.background&&(t.target.style.background=t.target.cssStyleBackground)})})),this.attach=function(){var t=n(o.selector);for(let e=0;e<t.length;e++)a(t[e])}},s=function(e){let o=t({targetNodeType:Node.TEXT_NODE,tag:"i",tagWidth:"1px",containerTag:"span",userSelect:"none",headerWidth:2,totalWidth:20,skipChars:["，","。","：","；","“","”","。","《","》","（","）","——","【","】"],fnIsSkipChars:function(t){return!!t&&(o.skipChars&&o.skipChars.indexOf(t)>-1||t.charCodeAt(0)<256)}},e);function i(t,e){var n=t.childNodes;n.length&&n.forEach(function(t){t.nodeType===o.targetNodeType?function(t,e){if(t){let i=null;if(null!==(i=t.nodeType==Node.TEXT_NODE?t.wholeText:t.innerText?t.innerText:t.textContent)&&i.length>e.length){let a="",r=!1;for(let t=0,l=0;t<i.length;t++)if(a+=i[t],!1===o.fnIsSkipChars(i[t])){var n="1"==e[l%e.length];l++,n&&(r=!0,a+=`<${o.tag} style='display:inline-block;width:${o.tagWidth};'></${o.tag}>`)}if(r){let e=document.createElement(o.containerTag);e.innerHTML=a,e.style.userSelect=o.userSelect,t.replaceWith(e)}}}}(t,e):i(t,e)})}function a(t,e,n){if(isNaN(+e))throw"请先转换为字值";let o=e.toString(2);o=o.length<n.totalWidth?o.padStart(n.totalWidth,"0"):o.substring(o.length-n.totalWidth),n.headerWidth>0&&(o=new Array(n.headerWidth+1).join("0")+o),i(t,o)}this.attach=function(){var t=n(o.selector);for(let e=0;e<t.length;e++)t[e].style.userSelect=o.userSelect,a(t[e],o.content,o)}};var c={create:function(e){var n={selector:"p, td",mode:null,tile:!0,content:"",color:"yellow",opacity:.005,fontSize:21,rotate:-30,renew:!0};return"string"==typeof e?n.content=e:t(n,e),("css"==n.mode?new r(n):"bg"==n.mode?new l(n):"txt"==n.mode?new s(n):"html"==n.mode?new o(n):new r(n)).attach()},distroy:function(){}};window.wm=c,window.module}();