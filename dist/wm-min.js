!function(){function t(t,e){if(null!=e)for(var n in e)t[n]=e[n];return t}function e(t){var e=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(e),e.innerHTML=t}function n(t){return document.querySelectorAll(t)}var o=function(t){t.tile?a.apply(this,arguments):i.apply(this.arguments)},i=function(o){o=t({opacity:.005,fontSize:21,color:"yellow",rotate:-30},o),this.textClassName="wm-text-placeholder",this.addTextStyle=function(){e("."+this.textClassName+"{                    opacity:"+o.opacity+";                    -webkit-opacity:"+o.opacity+";                    -moz-opacity:"+o.opacity+";                    position:absolute;                    font-size:"+o.fontSize+"px;                    color:"+o.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+o.rotate+"deg);                }            }")},this.attach=function(){this.addTextStyle();for(var t=n(o.selector),e=0;e<t.length;e++){var i=document.createElement("span");i.className=this.textClassName,i.style.filter="alpha(opacity="+100*o.opacity+")",i.innerHTML=o.content,t[e].appendChild(i)}}},a=function(o){o=t({row:6,rowInterval:90,col:3,colInterval:180,x:0,y:0,unit:"px"},o),i.apply(this,arguments),this.containerClassName="wm-container",this.addContainerStyle=function(){e("."+this.containerClassName+"{                position:relative;                top:0;                z-index:999;                overflow:hidden;            }")},this.createContainer=function(){var t=document.createElement("div");t.className=this.containerClassName;for(var e=0;e<o.row;e++)for(var n=0;n<o.col;n++){var i=document.createElement("span");i.className=this.textClassName,i.style.marginTop=e*o.rowInterval+o.y+o.unit,i.style.marginLeft=n*o.colInterval+o.x+o.unit,i.innerHTML=o.content,t.appendChild(i)}return t},this.attach=function(){this.addTextStyle();for(var t=n(o.selector),e=0;e<t.length;e++)t[e].appendChild(this.createContainer())}},r=function(n){if((n=t({color:"yellow",opacity:.005,fontSize:21,rotate:-30,suffix:"::before"},n)).originSelector=n.selector,n.selector.indexOf(":")<0){for(var o=n.selector.split(","),i=0;i<o.length;i++)o[i].indexOf(":")<0&&(o[i]=o[i].replace(/(\s+$)|(^\s+)/gi,"")+n.suffix);n.selector=o.join(",")}this.attach=function(){e("@media screen{                "+n.selector+'{                    content:"'+(n.content||"")+'";                    opacity:'+n.opacity+";                    -webkit-opacity:"+n.opacity+";                    -moz-opacity:"+n.opacity+";                    position:absolute;                    font-size:"+n.fontSize+"px;                    color:"+n.color+";                    display:inline;                    text-decoration:none;                    pointer-events:none;                    -webkit-user-select:none;                    -moz-user-select:none;                    -ms-user-select:none;                    user-select:none;                    transform:rotate("+n.rotate+"deg);                }            }")}},l=function(e){let o=t({color:"#eee",rotate:-30,fontSize:21},e);function i(t){let n=o.content;if("function"==typeof o.content&&!(n=o.content()))return setTimeout(()=>{i(t)},10);setTimeout(()=>{let i=function(t){let e=document.createElement("canvas");e.width=o.width||o.fontSize*t.length*.7,e.height=o.height||o.fontSize*t.length*.4;let n=e.getContext("2d");return n.translate(o.fontSize/3,e.height-o.fontSize/3),n.rotate(o.rotate*Math.PI/180),n.font=o.fontSize+"px Arial",n.fillStyle=o.color,n.fillText(t,0,0),e.toDataURL("png")}(n);e.tile?t.style.background=`repeat url(${i})`:t.style.background=`url(${i})`},0)}this.attach=function(){var t=n(o.selector);for(let e=0;e<t.length;e++)i(t[e])}},c=function(e){let o=t({targetNodeType:Node.TEXT_NODE,tag:"i",tagWidth:"1px",containerTag:"span",userSelect:"none",headerWidth:2,totalWidth:20,skipChars:["，","。","：","；","“","”","。","《","》","（","）","——","【","】"],fnIsSkipChars:function(t){return!!t&&(o.skipChars&&o.skipChars.indexOf(t)>-1||t.charCodeAt(0)<256)}},e);function i(t,e){var n=t.childNodes;n.length&&n.forEach(function(t){t.nodeType===o.targetNodeType?function(t,e){if(t){let i=null;if(null!==(i=t.nodeType==Node.TEXT_NODE?t.wholeText:t.innerText?t.innerText:t.textContent)&&i.length>e.length){let a="",r=!1;for(let t=0,l=0;t<i.length;t++)if(a+=i[t],!1===o.fnIsSkipChars(i[t])){var n="1"==e[l%e.length];l++,n&&(r=!0,a+=`<${o.tag} style='display:inline-block;width:${o.tagWidth};'></${o.tag}>`)}if(r){let e=document.createElement(o.containerTag);e.innerHTML=a,e.style.userSelect=o.userSelect,t.replaceWith(e)}}}}(t,e):i(t,e)})}function a(t,e,n){if(isNaN(+e))throw"请先转换为字值";let o=e.toString(2);o=o.length<n.totalWidth?o.padStart(n.totalWidth,"0"):o.substring(o.length-n.totalWidth),n.headerWidth>0&&(o=new Array(n.headerWidth+1).join("0")+o),i(t,o)}this.attach=function(){var t=n(o.selector);for(let e=0;e<t.length;e++)a(t[e],o.content,o)}};var s={create:function(e){var n={selector:"p, td",mode:null,tile:!0,content:"",color:"yellow",opacity:.005,fontSize:21,rotate:-30,suffix:"::before"};return"string"==typeof e?n.content=e:t(n,e),("css"==n.mode?new r(n):"bg"==n.mode?new l(n):"txt"==n.mode?new c(n):"html"==n.mode?new o(n):new r(n)).attach()},distroy:function(){}};window.wm=s,window.module}();