/**
 * @Description 分页插件
 * @author zivs.zheng
 * @date 2016年08月31日
 */
var InitiatePage = function(){
    return {
        init : function(pageInfo){
        	pageInfo = $.extend(InitiatePage.getDefaultPageInfo(), pageInfo);
        	var pageNum_int = parseInt(pageInfo.pageNum);
        	var totalPage_int = parseInt(pageInfo.totalPage);
        	// 总也数小于定于1的时候不返回分页控件
        	if (totalPage_int<=1){
        		return '';
        	}
        	var htmp_temp='<li><a href="javascript:;" num="2">2</a></li>'+
				        	'<li><a href="javascript:;" num="3">3</a></li>'+
				        	'<li><a href="javascript:;" num="4">4</a></li>'+
				        	'<li><a href="javascript:;" num="5">5</a></li>'+
				        	'<li><a href="javascript:;" num="6">6</a></li>'+
				        	'<li><a href="javascript:;" num="7">7</a></li>'+
				        	'<li><a tag="off" href="javascript:;">...</a></li>';
        	// 1.当pageInfo.totalPage <= 11 页面直接展示完所有的页码
        	if(totalPage_int <= 11 && totalPage_int > 0 ){
        		htmp_temp = '';
        		for(var i=2;i<totalPage_int;i++){
        			htmp_temp +='<li><a href="javascript:;" num="'+i+'">'+i+'</a></li>';
        		}
        	} else {
        		//2. 当pageInfo.totalPage > 11
        		if (pageNum_int>=7 && (pageNum_int+5)<=totalPage_int){
        			htmp_temp='<li><a tag="off" href="javascript:;">...</a></li>';
        			for(var i=pageNum_int-1;i<(pageNum_int+4);i++){
        				htmp_temp +='<li><a href="javascript:;" num="'+i+'">'+i+'</a></li>';
        			}
        			htmp_temp+='<li><a tag="off" href="javascript:;">...</a></li>';
        		} else if((pageNum_int+5)>totalPage_int && pageNum_int<=totalPage_int){
        			htmp_temp='<li><a tag="off" href="javascript:;">...</a></li>';
        			for(var i=totalPage_int-6;i<totalPage_int;i++){
        				htmp_temp +='<li><a href="javascript:;" num="'+i+'">'+i+'</a></li>';
        			}	
        		}
        	}
        	// 上一页 下一页 页码值（pageNum）处理
        	var uppage = 1,downpage = totalPage_int;

        	if (pageNum_int>1){
        		uppage = pageNum_int-1;
        	}
        	if (pageNum_int>=1 && pageNum_int<totalPage_int){
        		downpage = pageNum_int+1;
        	}
        	//页跳转处理
        	var gotoPage_html = '';
        	if(pageInfo.isGoPage){
        		if(pageInfo.lang=="cn"){
        			gotoPage_html = '<li style="margin-left: 10px;">到第<input id="gotopagenum" data="'+pageNum_int+'" value="'+pageNum_int+'" type="text" class="input-page" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" style="margin: 1px 10px;text-align: center;"/>页</li>'+
        							'<li><button id="gotopagebtn" type="button" class="btn btn-default btn-sm" style="height: 28px;">GO</button></li>';
        		} else if (pageInfo.lang=="en") {
        			gotoPage_html = '<li style="margin-left: 10px;">To<input id="gotopagenum" data="'+pageNum_int+'" value="'+pageNum_int+'" type="text" class="input-page" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" style="margin: 1px 10px;text-align: center;"/>Page</li>'+
        							'<li><button id="gotopagebtn" type="button" class="btn btn-default btn-sm" style="height: 28px;">GO</button></li>';
        		}
        	}        	
        	// 定义一个分页控件的HTML对象
        	var $pageHtml =  $('<nav>'+
				        		'<ul class="pagination">'+
					        		'<li>'+
						        		'<a href="javascript:;" aria-label="Previous" num="'+uppage+'">'+
						        		'<span aria-hidden="true">&laquo;</span>'+
						        		'</a>'+
					        		'</li>'+
					        		'<li><a href="javascript:;" num="1">1</a></li>'+htmp_temp+
					        		'<li id="totalPage_1"><a href="javascript:;" num="'+totalPage_int+'">'+totalPage_int+'</a></li>'+
					        		'<li>'+
						        		'<a href="javascript:;" aria-label="Next" num="'+downpage+'">'+
						        		'<span aria-hidden="true">&raquo;</span>'+
						        		'</a>'+
					        		'</li>'+
					        		'<li><a tag="off" href="javascript:;">'+pageInfo.totalRowText+' : '+pageInfo.totalRow+'</a></li>'+ gotoPage_html +
				        		'</ul>'+
			        		'</nav>');
        	if (pageNum_int ==1 && totalPage_int==1){
        		$pageHtml.find("#totalPage_1").remove();
        	}
        	// 当前页码设置样式高亮
        	$pageHtml.find("a").each(function(){
        		if (pageNum_int == $(this).html()){
        			$(this).parent().addClass("active")
        		}
        	});
        	// 分页按钮点击事件
        	$pageHtml.find("a").click(function(){
        		if (typeof(pageInfo.callbackfun) == 'function' && $(this).attr("tag")!="off"){
        			pageInfo.callbackfun.call(this,$(this).attr("num"));
        		}
        	});
        	$pageHtml.find("#gotopagebtn").click(function(){
        		var positiveInteger = /^[0-9]*$/;
        		var gotopagenum_data = $pageHtml.find("#gotopagenum").attr("data");
        		var gotopagenum = $pageHtml.find("#gotopagenum").val();
        		if(gotopagenum && positiveInteger.test(gotopagenum) && parseInt(gotopagenum) > 0){
        			if(gotopagenum>totalPage_int){
        				gotopagenum = totalPage_int;
        			}
        		} else {
        			gotopagenum = 1;
        		}
        		if(gotopagenum_data != gotopagenum){
        			if (typeof(pageInfo.callbackfun) == 'function'){
        				pageInfo.callbackfun.call(this,gotopagenum);
        			}        		
        		}
        	});        	
        	// 返回一个分页控件的HTML对象
            return $pageHtml;
        },
        // 如果pageInfo未传递参，默认初始化pageInfo对象
        getDefaultPageInfo : function(){
            return {
    			lang:'cn',//cn:中文；en:英文 （默认中文）
    			pageNum:1,//当前页
    			totalPage:1,//总页数
    			totalRow:1,//总记录数
    			isGoPage:false,//false:不展示页码跳转部分；true:展示页码跳转部分 （默认不展示页码跳转部分）			
    			totalRowText:"总记录数",
    			callbackfun:null//分页回调函数
            };
        },
    };
}();
