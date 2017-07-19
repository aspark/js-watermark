# JS watermark
use css add watermark

## usage:
simply create a watermark use: `window.wm.create('content')` 

another way is `window.wm.create(options)`, default options:  

    {
        "content":"",//水印
        "selector":"p, td",//选择器，添加水印的容器
        "color":"yellow",//水印颜色
        "fontsize":21,//水印大小
        "opacity":0.005,//水印透明度
        "rotate":-30//倾斜角度
    }

## see demo

support >=ie9, chrome
