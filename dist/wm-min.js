!function(e){function t(e,t){if(null!=t)for(var n in t)e[n]=t[n];return e}function n(e){var t=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(t),t.innerHTML=e}function o(e){return document.querySelectorAll(e)}var i=function(e){e.tile?r.apply(this,arguments):a.apply(this.arguments)},a=function(e){e=t({opacity:.005,fontSize:21,color:"yellow",rotate:-30},e),this.textClassName="wm-text-placeholder",this.addTextStyle=function(){n("."+this.textClassName+"{                    opacity:"+e.opacity+";                    -webkit-opacity:"+e.opacity+";                    -moz-opacity:"+e.opacity+";                    position:absolute;                    font-size:"+e.fontSize+"px;                    color:"+e.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+e.rotate+"deg);                }            }")},this.attach=function(){this.addTextStyle();for(var t=o(e.selector),n=0;n<t.length;n++){var i=document.createElement("span");i.className=this.textClassName,i.style.filter="alpha(opacity="+100*e.opacity+")",i.innerHTML=e.content,t[n].appendChild(i)}}},r=function(e){let i=t({row:6,rowInterval:90,col:3,colInterval:180,x:0,y:0,unit:"px",containerClassName:"wm-container",containerStyle:!0},e);a.apply(this,arguments),this.containerClassName=i.containerClassName,this.addContainerStyle=function(){let e="";"boolean"==typeof i.containerStyle?!0===i.containerStyle&&(e="."+this.containerClassName+"{                        position:absolute;                        top:0;                        left:0;                        z-index:-1;                    }"):i.containerStyle&&"string"==typeof i.containerStyle&&(e=i.containerStyle),e&&n(e)},this.createContainer=function(){var e=document.createElement("div");e.className=this.containerClassName;for(var t=0;t<i.row;t++)for(var n=0;n<i.col;n++){var o=document.createElement("span");o.className=this.textClassName,o.style.marginTop=t*i.rowInterval+i.y+i.unit,o.style.marginLeft=n*i.colInterval+i.x+i.unit,o.innerHTML=i.content,e.appendChild(o)}return e};var r=null;i.renew&&(r=new MutationObserver(function(e){e.forEach(function(e){"childList"===e.type&&e.removedNodes&&e.removedNodes.forEach(function(t){t.classList.contains(i.containerClassName)&&e.target.appendChild(t)})})})),this.attach=function(){this.addContainerStyle(),this.addTextStyle();for(var t=o(e.selector),n=0;n<t.length;n++)t[n].appendChild(this.createContainer()),i.renew&&r&&1!=t[n].htmlObserved&&(r.observe(t[n],{childList:!0}),t[n].htmlObserved=!0)}},l=function(e){if((e=t({color:"yellow",opacity:.005,fontSize:21,rotate:-30,suffix:"::before"},e)).originSelector=e.selector,e.selector.indexOf(":")<0){for(var o=e.selector.split(","),i=0;i<o.length;i++)o[i].indexOf(":")<0&&(o[i]=o[i].replace(/(\s+$)|(^\s+)/gi,"")+e.suffix);e.selector=o.join(",")}this.attach=function(){n("@media screen{                "+e.selector+'{                    content:"'+(e.content||"")+'";                    opacity:'+e.opacity+";                    -webkit-opacity:"+e.opacity+";                    -moz-opacity:"+e.opacity+";                    position:absolute;                    font-size:"+e.fontSize+"px;                    color:"+e.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+e.rotate+"deg);                }            }")}},s=function(e){let n=t({color:"#eee",rotate:-30,fontSize:21,width:null,height:null},e);var i=null;function a(t){let o=n.content;if("function"==typeof n.content&&!(o=n.content()))return setTimeout(()=>{a(t)},10);setTimeout(()=>{let a=function(e){let t=document.createElement("canvas");t.width=n.width||n.fontSize*e.length*.7,t.height=n.height||n.fontSize*e.length*.4;let o=t.getContext("2d");return o.translate(n.fontSize/3,t.height-n.fontSize/3),o.rotate(n.rotate*Math.PI/180),o.font=n.fontSize+"px Arial",o.fillStyle=n.color,o.fillText(e,0,0),t.toDataURL("png")}(o);e.tile?t.style.background=`repeat url(${a})`:t.style.background=`url(${a})`,t.cssStyleBackground=t.style.background,n.renew&&i&&1!=t.cssObserved&&(i.observe(t,{attributes:!0,attributeFilter:["style"]}),t.cssObserved=!0)},0)}n.renew&&(i=new MutationObserver(function(e){e.forEach(function(e){"attributes"===e.type&&"style"==e.attributeName&&e.target.cssStyleBackground!=e.target.style.background&&(e.target.style.background=e.target.cssStyleBackground)})})),this.attach=function(){var e=o(n.selector);for(let t=0;t<e.length;t++)a(e[t])}},c=function(e){let n=t({targetNodeType:Node.TEXT_NODE,tag:"i",tagWidth:"1px",containerTag:"span",userSelect:"none",headerWidth:2,totalWidth:20,skipChars:["，","。","：","；","“","”","。","《","》","（","）","——","【","】"],fnIsSkipChars:function(e){return!!e&&(n.skipChars&&n.skipChars.indexOf(e)>-1||e.charCodeAt(0)<256)}},e);function i(e,t){var o=e.childNodes;o.length&&o.forEach(function(e){e.nodeType===n.targetNodeType?function(e,t){if(e){let i=null;if(null!==(i=e.nodeType==Node.TEXT_NODE?e.wholeText:e.innerText?e.innerText:e.textContent)&&i.length>t.length){let a="",r=!1;for(let e=0,l=0;e<i.length;e++)if(a+=i[e],!1===n.fnIsSkipChars(i[e])){var o="1"==t[l%t.length];l++,o&&(r=!0,a+=`<${n.tag} style='display:inline-block;width:${n.tagWidth};'></${n.tag}>`)}if(r){let t=document.createElement(n.containerTag);t.innerHTML=a,t.style.userSelect=n.userSelect,e.replaceWith(t)}}}}(e,t):i(e,t)})}function a(e,t,n){if(isNaN(+t))throw"请先转换为字值";let o=t.toString(2);o=o.length<n.totalWidth?o.padStart(n.totalWidth,"0"):o.substring(o.length-n.totalWidth),n.headerWidth>0&&(o=new Array(n.headerWidth+1).join("0")+o),i(e,o)}this.attach=function(){var e=o(n.selector);for(let t=0;t<e.length;t++)e[t].style.userSelect=n.userSelect,a(e[t],n.content,n)}};var d={create:function(e){var n={selector:"p, td",mode:null,tile:!0,content:"",color:"yellow",opacity:.005,fontSize:21,rotate:-30,renew:!0};return"string"==typeof e?n.content=e:t(n,e),("css"==n.mode?new l(n):"bg"==n.mode?new s(n):"txt"==n.mode?new c(n):"html"==n.mode?new i(n):new l(n)).attach()},distroy:function(){}};"function"==typeof define&&define.amd?define(d):"object"==typeof exports&&(module.exports=w),e.wm=d}(window);