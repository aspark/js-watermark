# JS watermark

提供 4 种模式的方式添加水印：  
| 模式/mode | 说明/desc |
| --- | --- |
| html | 使用 span 生成多个水印并插入到页面上 |
| css | 使用 css3 : before 样式添加水印 |
| bg | 使用图片背景添加水印 |
| txt | 使用字符间距添加暗水印，中文效果更好 |

> 以上模式都可通过设置 color 或 opacity 的值来达到暗水印的效果  
> change color ir opacity to hide/invisible watermark

> 暗水印下 opacity 推荐值为 0.03，系统下在默认 0.005（有些系统下还原效果不佳）

## usage:

simply create a watermark use:

```javascript
//add <script src="./wm.js"></script>

window.wm.create("content");
```

```javascript
import wm from "./wm.js"; //没测试过
wm.create("content");
```

## options

`create(options)`, default options:

```javascript
    {
        "selector":"p, td", //选择器，添加水印的容器
        "mode":"auto" //使用的模式, html：添加label标签的方式  css：使用css的方式  auto：自动：ie8使用html模式，其它使用css
        "tile":true //是否平铺，默认true
        "content":"", //水印内容

        "color":"yellow", //水印颜色
        "fontsize":21, //水印大小
        "opacity":0.005, //水印透明度, 推荐改为0.03
        "rotate":-30 //倾斜角度
        "renew": true //从dom删除后，是否自动重建

        //special for mode:css
        "suffix": "::before", // 使用指定的伪类名

        //special for mode:html
        "row": 6, // tile为tue时，重复的行数
        "rowInterval": 90, // 行间距
        "col": 3, //重复的列数
        "colInterval": 180, // 列间距
        "x": 0, // 起始水平偏移量
        "y": 0, //超始垂直偏移量
        "unit": 'px', // 偏移量的单位
        "containerClassName": 'wm-container', //将容器附加到html上时使用的类名，用于自定义样式
        "containerStyle": true, //容器的样式，为true时使用内置样式， 为false时不添加样式，为字符串时，将字符串做为样式添加到页面

        //special for mode:bg
        "width": null, //生成的水印图片的宽度，该值影响水印的间隔
        "height": null //高度

        //special for mode:txt
        //content暂只支持数据，会将其转换为二进制插入到txt中
        "targetNodeType": Node.TEXT_NODE, //添加到Text字符之间
        "tag": "i",//插值使用的tag
        "tagWidth": "1px",//插值的tag宽度
        "containerTag": "span",//处理后的字符内容，使用的容器
        "userSelect": "none", //'none' 'inherit' 是否可以选择
        "headerWidth": 2,//插入的值添加两个00前缀
        "totalWidth": 20,//插入的值统一到固定宽度，如长度不足20的，添加0前缀，超过20的将截断前面的
        "skipChars": [//跳过的字符，这些字符有空白，不利用分析
            "，",
            "。",
            "：",
            "；",
            "“",
            "”",
            "。",
            "《",
            "》",
            "（",
            "）",
            "——",
            "【",
            "】",
        ],
        "fnIsSkipChars": fn(char),//用于判断字符是否需要跳过插值的逻辑，现在默认不在ascii以及skipChars中指定的字符后插值

    }
```

## see demo

[demo src](./demo/index.html)
