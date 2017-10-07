/*凤凰网轮换版效果js*/

//jquery代码
//页面加载函数
$(function(){
	
	/* 凤凰网轮换版效果 函数fhIndexLHB start */
	function fhIndexLHB(){
		//获取轮换版导航部分
		var $lhbNav = $("#lhb_nav");
		//获取轮换版主体部分
		var $lhbBody = $("#lhb_body");
		//分别获取左右翻页的标记 b标签
		var $toLeftC = $("#to_left_c");
		var $toRightC = $("#to_right_c");
		//b标签 左右标签默认隐藏
		$("#to_left_or_right").hide();
		/*默认加载时只显示class为p1的内容 同级其他的内容隐藏*/
		$lhbBody.find("#p1").show().siblings().hide();
		//声明临时变量timer 用来设置定时器
		var timer = "";
		//声明变量 currentIndex 存放当前下标
		var currentIndex = 1;

		/*鼠标移入 导航部分出现主体部分效果*/
		$lhbNav.find("a").each(function(index){
			$(this).mouseover(function(){
				currentIndex = index + 1;
				//用到了css样式表中设置好的备用焦点类 current
				$lhbNav.find("a").eq(index).addClass("current").siblings().removeClass("current");
				$lhbBody.find("#p"+(index+1)+"").show().siblings().hide();
			})
		})


		/*鼠标点击左右箭头 主体部分内容切换*/
		//首先先清掉定时器，进行操作之后 再重置定时器
		$toLeftC.click(function(){
			clearInterval(timer);
			currentIndex--;

			//向左的时候 判定要写在变化的前边
			if(currentIndex <= 0){
				currentIndex = $lhbBody.find("li").length;
			}

			$lhbNav.find("a").eq(currentIndex-1).addClass("current").siblings().removeClass("current");
			$lhbBody.find("#p"+(currentIndex)+"").show().siblings().hide();

			change();
		})
		$toRightC.click(function(){
			clearInterval(timer);
			currentIndex++;

			$lhbNav.find("a").eq(currentIndex-1).addClass("current").siblings().removeClass("current");
			$lhbBody.find("#p"+currentIndex+"").show().siblings().hide();


			if(currentIndex >= $lhbBody.find("li").length){
				currentIndex = 0;
			}
			change();
		})



		/*页面加载自动轮换效果-设定定时器*/
		function change(){
			timer = setInterval(function(){
				currentIndex++;

				$lhbNav.find("a").eq(currentIndex-1).addClass("current").siblings().removeClass("current");
				$lhbBody.find("#p"+currentIndex+"").show().siblings().hide();


				if(currentIndex >= $lhbBody.find("li").length){
					currentIndex = 0;
				}
			},3000);
		}

		
		/*鼠标移动到主体的时候清除定时器*/
		//声明一个局部变量tempIndex 记录当前鼠标移动到主体部分时  定时器所执行到的currentIndex
		var tempIndex = "";
		$lhbBody.mouseover(function(){

			tempIndex = currentIndex;
			clearInterval(timer);

			$("#to_left_or_right").show();

		})
		//鼠标移开主体的时候继续定时器
		$lhbBody.mouseout(function(){

			//将currentIndex 赋值上 之前记录的缓存值 用来继续执行定时器
			currentIndex = tempIndex;
			//定时器需要重新制定 这点比较坑爹
			change();

			//这里因为使用了绝对定位 导致了鼠标移到左右图标时候会判定为移开了$lhbBody
			/*$("#to_left_or_right").hide();*/

		})
	}/*function fhIndexLHB()结束*/
	/* end 凤凰网轮换版效果 函数fhIndexLHB */

	/*调用轮换版函数 fhIndexLHB()*/
	fhIndexLHB();

})