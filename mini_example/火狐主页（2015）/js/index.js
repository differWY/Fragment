
/*加载页面*/
$(function(){
	/* 页面加载隐藏的元素 start */
	/*新闻部分*/
	/* 新闻版块的隐藏和显示函数showAndHideNews */
	function showAndHideNews(modularName,showIndex){
		for(var i=1;i<=10;i++){
			$(modularName+i+"").hide();
			if(showIndex == i){
				showIndex = i;
			}
		}
		$(modularName+showIndex+"").show();
	}	
	showAndHideNews("#news_",1);

	$("#news_rotation > li").each(function(index){
		$(this).mouseover(function(){
			$(this).addClass("navli_current").siblings().removeClass("navli_current");
			showAndHideNews("#news_",index+1);
		})
	})
	/* end 页面加载隐藏的元素 */
})