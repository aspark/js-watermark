# JS watermark
this js lib will create css style to append watermarks to elements, of course you can only add the style in head for the same effect:

    @media screen{
        div::before, td::before{
            content:"abc";
            opacity:0.005;
            -webkit-opacity:0.03;
            -moz-opacity:0.03;
            position:absolute;
            font-size:21px;
            color:yellow;
            display:inline;
            text-decoration:none;
            pointer-events:none;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            transform:rotate(-30deg);
        }
    }

## usage:
simply create a watermark use: `window.wm.create('content')` 

another way is `window.wm.create(options)`, default options:  

    {
        "content":"",//水印
        "selector":"p, td",//选择器，添加水印的容器
        "color":"yellow",//水印颜色
        "fontsize":21,//水印大小
        "opacity":0.005,//水印透明度, 推荐改为0.03
        "rotate":-30//倾斜角度
    }

## see demo

support >=ie9, chrome
