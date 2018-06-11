/**
实现元素的移动拖拽、放大缩小
**/
$.fn.jp_zoom=function(options){
	var opts = jp_zoom_init_css(options);
	this.css(opts.css);
	$(this).data("opts",opts);
	//创建边框所需元素
	var $bd=jp_zoom_create_border(this);
	//创建文件上传的控件
	var $f=jp_zoom_create_upload_file(this);
	//初始化document的鼠标移动事件
	jp_zoom_init_document();
	//元素鼠标按下事件处理
	var $box=jp_zoom_mousedown(this,$bd);
	//键盘按下事件
	jp_zoom_keypress($bd);
	//元素是否可以输入文本信息
	jp_zoom_dblclick($bd,this);
	//元素单机事件处理
	jp_zoom_click($bd,this);
	var $this=$(this);
	//绑定双击事件
	$(this).unbind("jp_zoom_dblclick").bind("jp_zoom_dblclick",function(){
		switch(opts.type){
			case "text":
				$bd.trigger("dblclick");
				break;
			case "img":
				$f.trigger("click");
				break;
		}
		
	});
	return $this;
}
/**
创建用于上传的文件输入文本框
**/
function jp_zoom_create_upload_file($this){
	var p=$($this).parent();
	var i=p.find("input[type='file']");
	if(i.length==0){
		p.append("<input type='file' style='display:none;' />");
		i=p.find("input[type='file']");
	}
	i.data("target",$($this));
	//图片上传
	i.unbind('change').bind('change',function(e){
		if(this.files.length>0){
			var $$this=$(this);
			var $this=$(this).data("target");
			var reader = new FileReader();
			reader.readAsDataURL(this.files[0]);
			reader.onload=function(e){
				var img=$this.find("img");
				if(img.length==0){
					$this.append("<img />");
					img=$this.find("img");
				}
				img.attr("src",this.result);
				img.css({
					"width":"100%",
					"height":"100%"
				});
				$$this.val("");
			};
			
		}
	});
	return i;
}
/**
键盘按下事件
**/
function jp_zoom_keypress($bd){
	$(document).keyup(function(e){
		var key = e.which;
		var tg=this.del_target;
		if(key==46&&tg){
			hide_all(tg);
			tg.remove();

		}
	});
}
/**
设置表框的大小位置信息
**/
function jp_zoom_set_border($this){
	var el=$this.data("zoom_point");
	var p=$this.parent();
	//创建一个输入文本框
	var c=p.find("textarea");
	//点1
	el[1].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"nwse-resize",
		"padding":"0",
		"top":"-8px",
		"left":"-8px",
	});
	//点2
	el[2].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"ns-resize",
		"padding":"0",
		"top":"-8px",
		"left":$this.width()/2-10
	});
	//点3
	el[3].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"nesw-resize",
		"padding":"0",
		"top":"-8px",
		"right":"-8px"
	});
	//点4
	el[4].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"ew-resize",
		"padding":"0",
		"top":$this.height()/2-10,
		"right":"-8px"
	});
	//点5
	el[5].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"nwse-resize",
		"padding":"0",
		"bottom":"-8px",
		"right":"-8px"
	});
	//点6
	el[6].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"ns-resize",
		"padding":"0",
		"bottom":"-8px",
		"left":$this.width()/2-10
	});
	//点7
	el[7].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"nesw-resize",
		"padding":"0",
		"bottom":"-8px",
		"left":"-8px"
	});
	//点8
	el[8].css({
		"position":"absolute",
		"width":"16px",
		"height":"16px",
		"margin":"0",
		"cursor":"ew-resize",
		"padding":"0",
		"top":$this.height()/2-10,
		"left":"-8px"
	});
}
/**
创建边框所需元素
**/
function jp_zoom_create_border($this){
	var p=$($this).parent();
	//创建边框元素
	var $box=p.find(".jp-zoom-border");
	if($box.length==0){
		p.append("<div class='jp-zoom-border'></div>");
		$box=p.find(".jp-zoom-border");
	}
	$($this).data("border-target",$box);
	$box.css({
		"position":"absolute",
		"width":$($this).width(),
		"height":$($this).height(),
		'border-width':'1px',
		'border-color':'rgba(0,0,0,.1)',
		'border-style':'solid',
		"display":"none",
		"margin":"0",
		"z-index":"999",
		"padding":"0",
		'left':'100px'
	});
	//创建拉伸点
	var el=new Array();
	for(var i=1;i<=8;i++){
		var c=$box.find(".coor"+i);
		if(c.length==0){
			$box.append("<div class='coor"+i+"'></div>");
			el[i]=$box.find(".coor"+i);
			el[i].append("<div class='coor-c-"+i+"'></div>");
			var nc=el[i].find(".coor-c-"+i);
			nc.css({
				"width":"4px",
				"height":"4px",
				"left":"5px",
				"top":"5px",
				"position":"absolute",
				"border-width":"1px",
				"border-style":"solid",
				"border-color":"rgba(0,0,0,.1)",
				"background-color":"#fff"
			});
		}else{
			el[i]=c;
		}
	}
	$box.data("zoom_point",el);
	jp_zoom_set_border($box);
	return $box;
}
/**
元素单击事件
**/
function jp_zoom_click($box,obj){
	//隐藏掉输入文本框
	$box.on("click",function(e){
		//输入文本框失去光标
		var p=$(this).parent();
		var c=p.find("textarea");
		c.hide();
		return false;
	});
	$box.parent().unbind('mousedown').bind("mousedown",function(e){
		hide_all($box);
	});
}

/**
元素双击事件
**/
function jp_zoom_dblclick($box,obj){
	$box.unbind('dblclick').bind("dblclick",function(){
		var tg=$(this).data("move_target");
		var self=$(tg);
		var opts=self.data("opts");
		//是文字框才显示
		if(opts.type=='text'){
			var p=self.parent();
			//创建一个输入文本框
			var c=p.find("textarea");
			//绝对位置
			//var offset = $(this).offset();
			//相对位置
			var offset=$(this).position();
			if(c.length==0){
				var textarea=document.createElement('textarea');
				p.append(textarea);
				c=$(textarea);
			}
			c.val(self.html());
			self.html("");
			var ccss=$.extend({}, {
				'display':'block',
				'z-index':'999',
				'top':offset.top,
				'overflow-y':'hidden',
				'left':offset.left,
				'width':$(this).width()+2,
				'height':$(this).height()+2,
				'background-color':'transparent',
				'border':'none',
				'outline':'none',
				'resize':'none',
				'margin':'0',
				'padding':'0'
			}, jp_zoom_init_default_css().css);
			//位置移动对应元素下
			c.css(ccss);
			//输入文本框获得光标
			c.focus();
			c.unbind('blur').bind('blur',function(){
				self.html(c.val());
				$(this).hide();
				$(this).css({'z-index':'0'});
			});
			c.unbind('mousedown').bind('mousedown',function(){
				return false;
			});
		}
		return false;
	});
}
/**
显示自身的边框
**/
function show_this($this){
	//绝对位置
	//var offset = $this.offset();
	//相对位置
	var offset = $this.position();
	var bdw=parseInt($this.css("border-width"));
	var bd=$this.parent().find(".jp-zoom-border");
	var css={
		"display":"block",
		'top':offset.top,
		'left':offset.left,
		'width':$this.width()-2+bdw*2,
		'height':$this.height()-2+bdw*2
	};
	bd.css(css);
	jp_zoom_set_border(bd);
	$.extend(document, {'del_target':$this});
	$(".jp-zoom-selected").removeClass("jp-zoom-selected");
	$this.addClass("jp-zoom-selected");
}
/**
隐藏其他所有边框
**/
function hide_all($this){
	var p=$this.parent();
	var bd=p.find(".jp-zoom-border");
	bd.hide();
	var c=p.find("textarea");
	c.hide();
	$.extend(document, {'del_target':null});
	$(".jp-zoom-selected").removeClass("jp-zoom-selected");
}
/**
选中元素回调
**/
function jp_zoom_bind_selected(targ){
	var opts=targ.data("opts");
	var offset = targ.position();
	var attr={'x': offset.left, 'y': offset.top,'w':targ.width(),'h':targ.height()};
	if(opts.type=="text"){
		attr.text=targ.html();
		if(targ.css("background-color")){
			attr['background-color']=targ.css("background-color");
		}
		if(targ.css("opacity")){
			attr['opacity']=targ.css("opacity");
		}
		if(targ.css("border")){
			attr['border']=targ.css("border");
		}

		if(targ.css("border-radius")){
			attr['border-radius']=targ.css("border-radius");
		}

		if(targ.css("font")){
			attr['font']=targ.css("font");
		}
	}
	opts.selected(attr);
}

/**
鼠标按下事件
**/
function jp_zoom_mousedown(obj,$bd){
	var $box = obj.mousedown(function(e) {
		show_this($(this));
		$bd.data("move_target",this);
		jp_zoom_bind_selected($(this));
		var p=$(this).parent();
		var c=p.find("textarea");
		c.hide();
		return false;
	});
	$bd.mousedown(function(e) {
		e.preventDefault();
		//绝对位置
	    //var offset = $(this.move_target).offset();
	    //相对位置
	    var tg=$bd.data("move_target");
	    var offset = $(tg).position();
	    tg.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
	   jp_zoom_bind_selected($(tg));
	    $.extend(document, {'move':true,'move_target':tg});
	    return false;
	}).on('mousedown', '.coor1', function(e) {
		var posix = jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,1);
	    }});
	    return false;
	}).on('mousedown', '.coor2', function(e) {
	    var posix =jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,2);
	    }});
	    return false;
	}).on('mousedown', '.coor3', function(e) {
	    var posix =jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,3);
	    }});
	    return false;
	}).on('mousedown', '.coor4', function(e) {
	    var posix = jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,4);
	    }});
	    return false;
	}).on('mousedown', '.coor5', function(e) {
	    var posix = jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,5);
	    }});
	    return false;
	}).on('mousedown', '.coor6', function(e) {
	    var posix = jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,6);
	    }});
	    return false;
	}).on('mousedown', '.coor7', function(e) {
	    var posix =jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,7);
	    }});
	    return false;
	}).on('mousedown', '.coor8', function(e) {
	    var posix =jp_zoom_get_mouse_down_posix(e,$bd);
	    $.extend(document, {'move':true, 'call_down': function(e) {
	    	jp_zoom_get_direction_css($bd,posix,e,8);
	    }});
	    return false;
	});
	return $box;
}
/**
变形前鼠标按下获得形状信息
**/
function jp_zoom_get_mouse_down_posix(e,$bd){
	var p=$bd.parent();
	var c=p.find("textarea");
	c.hide();
	var posix = {
	        'w': $bd.width(), 
	        'h': $bd.height(), 
	        'x': e.pageX, 
	        'y': e.pageY
	    };
	return posix;
}

/**
获得方向的css样式
e：事件对象
direction:方向 1~8
**/
function jp_zoom_get_direction_css($bd,posix,e,direction){
	var css={};
	var p=$bd.parent();
	var x=parseInt(e.pageX);
	var y=parseInt(e.pageY);
	if(p.length>0){
		var offset=p.offset();
		x=parseInt(x-offset.left);
		y=parseInt(y-offset.top);
	}
	
	if(direction==1){
		var w=parseInt(posix.x-e.pageX  + posix.w);
		var h=parseInt(posix.y-e.pageY + posix.h);
		if(w>0){
			css.width=w;
			css.left=x;
		}
		if(h>0){
			css.height=h;
			css.top=y;
		}
	}else if(direction==2){
		var h=posix.y-e.pageY  + posix.h;
		if(h>0){
			css={
		    	'height': h,
		        'top':y
		    };
		}
	}else if(direction==3){
		var w=e.pageX - posix.x + posix.w;
		var h=posix.y-e.pageY  + posix.h;
		if(w>0){
			css.width=w;
		}
		if(h>0){
			css.height=h;
			css.top=y;
		}
	}else if(direction==4){
		var w=e.pageX - posix.x + posix.w;
		if(w>0){
			css.width=w;
		}
	}else if(direction==5){
		var w=e.pageX - posix.x + posix.w;
		var h=e.pageY - posix.y + posix.h;
		if(w>0){
			css.width=w;
		}
		if(h>0){
			css.height=h;
		}
	}else if(direction==6){
		var h=e.pageY - posix.y + posix.h;
		if(h>0){
			css.height=h;
		}
	}else if(direction==7){
		var w=posix.x-e.pageX + posix.w;
		var h=e.pageY - posix.y + posix.h;
		if(w>0){
			css.width=w;
			css.left=x;
		}
		if(h>0){
			css.height=h;
			css.bottom=y;
		}
	}else if(direction==8){
		var w=posix.x-e.pageX + posix.w;
		if(w>0){
			css.width=w;
			css.left=x;
		}
	}
	var css2 = $.extend({}, css);
	var tg=$bd.data("move_target");
	var bdw=parseInt($(tg).css("border-width"));
	if(css2.width){
		css2.width=css2.width+bdw*2-2;
	}
	if(css2.height){
		css2.height=css2.height+bdw*2-2;
	}
	//console.log(css2);
	$(tg).css(css);
	$bd.css(css2);
	jp_zoom_set_border($bd);
}


/**
获得默认样式
**/
function jp_zoom_init_default_css(){
	var sd=$(".jp-zoom-selected");
	var dcss= {'type':'text',
	'css':{
		"position":"absolute",
		'font-size':'26px',
		'color':'#000',
		'text-align':'left',
		'line-height':'36px',
		'word-break':'normal',
		'font-family':'Arial',
		'cursor':'default'
	}};
	if(sd.length>0){
		if(sd.css("font")){
			delete dcss.css['font-size'];
			delete dcss.css['font-family'];
			dcss.css.font=sd.css("font");		
		}
		if(sd.css("line-height")){
			dcss.css["line-height"]=sd.css("line-height");
		}
	}
	return dcss;
}
/**
初始化元素默认样式
**/
function jp_zoom_init_css(options){
	var defualts =jp_zoom_init_default_css();
	if(options&&options.css){
		options.css=$.extend({}, defualts.css, options.css);
	}
	return $.extend({}, defualts, options);
}
/**
初始化document的移动事件，配合拖拽放大缩小
**/

function jp_zoom_init_document(){
	$(document).mousemove(function(e) {
		if (!!this.move) {
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function() {
					var bd=$(this.move_target).parent().find(".jp-zoom-border");
					$(this.move_target).css({
						'top': e.pageY - posix.y,
						'left': e.pageX - posix.x
					});
					bd.css({
						'top': e.pageY - posix.y,
						'left': e.pageX - posix.x
					});
				};
			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if (!!this.move) {
			//console.log("松手"+Date.parse(new Date()));
			var callback = document.call_up || function(){};
			callback.call(this, e);
			$.extend(this, {
				'move':false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});
	
}
