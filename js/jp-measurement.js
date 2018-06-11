/**
点击后量出尺寸并创建对象在所量区域内
**/
$.fn.jp_measurement=function(options){
	var defualts={'selected':function(attr){}};
	var opts=$.extend({}, defualts, options);
	var $bd=this.click(function(){
		//按钮是否被点击，做个标示
		var tclick=$bd.data("text-click");
		if(tclick){
			//移出画布
			remove_jp_measurement_draw_rect();
			$bd.data("text-click",false);
		}else{
			//创建画布
			var cas=create_jp_measurement_draw_rect();
			$bd.data("text-click",true);
			cas.mousedown(function(e){
				e.preventDefault();
				cas.data("posix",{'x':e.pageX,'y':e.pageY});
				cas.data("opts",opts);
				cas.data("triger",$bd);
				$.extend(document, {'draw_rect_move':true,'draw_rect_move_target':cas});
			});	
		}
	});
	//初始化document对象
	jp_draw_rect_init_document();
	return $bd;
}
//设置元素属性
$.fn.set_attr=function(attr){
	var sd=$(".jp-zoom-selected");
	if(sd.length>0){
		var opts=sd.data("opts");
		if(opts.type=="text"&&attr.text){
			sd.html(attr.text);
		}
		if(attr.w){
			sd.width(attr.w);
		}
		if(attr.h){
			sd.height(attr.h);
		}
		if(attr.x){
			sd.css({'left':attr.x});
		}
		if(attr.y){
			sd.css({'top':attr.y});
		}
		if(attr['font-size']){
			sd.css({'font-size':attr['font-size']});
		}
		if(attr['line-height']){
			sd.css({'line-height':attr['line-height']});
		}
		if(attr['border']){
			sd.css({'border':attr['border']});
		}
		if(attr['opacity']){
			sd.css({'opacity':attr['opacity']});
		}
		if(attr['border-radius']){
			sd.css({'border-radius':attr['border-radius']});
		}
		sd.trigger("mousedown");
	}
	return $(this);
}
/**
初始化document对象
**/
function jp_draw_rect_init_document(){
	$(document).mousemove(function(e) {
		if (!!this.draw_rect_move) {
			//鼠标按下
			var $bd=this.draw_rect_move_target;
			var $cbd=$bd.find(".jp-draw-rect-c");
			if($cbd.length==0){
				$bd.append("<div class='jp-draw-rect-c'></div>");
				$cbd=$bd.find(".jp-draw-rect-c");
			}
			var posix=$bd.data("posix");
			var x=e.pageX-posix.x;
			var y=e.pageY-posix.y;
			var css={
				"position":"absolute",
				'border':'1px solid rgba(0,0,0,.1)',
				"background-color":"rgba(221, 221, 221, 0.28)",
			};
			var ocss={};
			if(x>0){
				css.width=x;
				css.left=posix.x;
			}else{
				css.width=Math.abs(x);
				css.left=e.pageX;
			}
			if(y>0){
				css.height=y;
				css.top=posix.y;
			}else{
				css.height=Math.abs(y);
				css.top=e.pageY;
			}
			ocss.width=css.width;
			ocss.left=css.left;
			ocss.height=css.height;
			ocss.top=css.top;
			$bd.data("ocss",ocss);
			$cbd.css(css);
		}
	}).mouseup(function(e) {
		//鼠标松开
		var $bd=this.draw_rect_move_target;
		if($bd){
			var triger=$bd.data("triger");
			triger.data("text-click",false);
			create_jp_zoom_element($bd);
			remove_jp_measurement_draw_rect();
		}
		$.extend(this, {
			'draw_rect_move':false,
			'draw_rect_move_target': null
		});

		
	});
}
/**
创建可拉伸变形的对象
**/
function create_jp_zoom_element($bd){
	//存放配置项的变量
	var opts=$bd.data("opts");
	//存放鼠标松手前的形状信息
	var ocss=$bd.data("ocss");
	var box=$(opts.target);
	if(box.length>0){
		var div=box.children("div");
		var id="jp-zoom-"+(div.length+1);
		var $b=$("<div id='"+id+"'></div>");
		box.append($b);
		$b=box.find("#"+id);
		$b.jp_zoom({'type':opts.type,'selected':opts.selected});
		var offset = box.offset();
		ocss.left=ocss.left-offset.left;
		ocss.top=ocss.top-offset.top;
		$b.css(ocss);
		$b.trigger("mousedown");
		$b.trigger("jp_zoom_dblclick");
	}
	
}

/**
创建画布
**/
function create_jp_measurement_draw_rect(){
	var cas=$("#jp-draw-rect");
	if(cas.length==0){
		$("body").append("<div id='jp-draw-rect'></div>");
		cas=$("#jp-draw-rect");
	}
	cas.css({
		'position': 'fixed',
		'left': '0px',
		'right': '0px', 
		'bottom': '0px', 
		'top': '0px', 
		'z-index': '109', 
		'cursor': 'crosshair'
	});
	return cas;
}
/**
移除画布
**/
function remove_jp_measurement_draw_rect(){
	$("#jp-draw-rect").remove();
}