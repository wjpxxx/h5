# H5页面制作工具

#### 项目介绍
制作H5的工具，通过简单的拖拖控件就可以实现H5页面的制作，持续开发中.....................
依赖jQuery库
调用方式：
<pre>
	&lt;div style="width: 100%;height: 600px;"&gt;
		&lt;div style="width: 10%; height: 100%; float: left;position: relative;z-index: 110;"&gt;
			&lt;button id="txt"&gt;文本&lt;/button&gt;
			&lt;button id="img"&gt;图片&lt;/button&gt;
			&lt;button id="attr"&gt;设置属性&lt;/button&gt;
		&lt;/div&gt;
		&lt;div id="target" style="width: 80%; overflow: hidden; height: 100%; position: relative; float: left;"&gt;
		&lt;/div&gt;	
	&lt;/div&gt;
	<script type="text/javascript">
		$(function() {
			//创建文本控件
			$('#txt').jp_measurement({"target":"#target","type":"text","selected":function(attr){
				//console.log(attr);
			}});
			//创建图片控件
			$('#img').jp_measurement({"target":"#target","type":"img"});
			//设置属性
			$("#attr").click(function(){
				$('#txt').set_attr({"w":500,'h':100,'text':'bn','x':10,'y':10,'font-size':'64px','line-height':'74px','border':'3px solid red','border-radius':'10px'});
			});
		});

	</script>
</pre>
<pre>
jp_measurement方法:
创建控件

参数说明:

target:要显示的元素内，可以是id或者class

type:类型  text-文本元素； img-图片元素

selected:元素被选中回调函数 参数attr：返回选中时元素的属性
		 attr{
		 	background-color:"rgba(0, 0, 0, 0)"  //背景颜色
		 	border:"0px none rgb(0, 0, 0)" //边框
		 	border-radius:"0px" //边框圆角
		 	font:"normal normal 400 normal 26px / 36px Arial"  //字体
		 	h:116                   //高度
		 	w:116					//宽度
		 	x:110					//x坐标
		 	y:111					//y坐标
		 	opacity:0.1				//透明度
		 	text:"ddd"				//如果类型是text类型，这个属性就是文本内容
		 }


set_attr方法:
设置控件属性
	attr{
		 	background-color:"rgba(0, 0, 0, 0)"  //背景颜色
		 	border:"0px none rgb(0, 0, 0)" //边框
		 	border-radius:"0px" //边框圆角
		 	font:"normal normal 400 normal 26px / 36px Arial"  //字体
		 	h:116                   //高度
		 	w:116					//宽度
		 	x:110					//x坐标
		 	y:111					//y坐标
		 	opacity:0.1				//透明度
		 	text:"ddd"				//如果类型是text类型，这个属性就是文本内容
参数说明:
attr设置元素的属性
</pre>
暂时界面未美化如下图:

<img src="img/demo.png" />
#### 软件架构
软件架构说明


#### 安装教程

jquery方式调用

jp-measurement.js依赖于jp-zoom.js

jp-zoom.js依赖于jquery.js
#### 使用说明

本地可以直接打开


