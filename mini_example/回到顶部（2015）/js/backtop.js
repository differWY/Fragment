
//回到顶部效果 绑定id为back_top_btn的a链接上

window.onload = function(){
	
	//回到顶部的方法
	function backToTop(){
		var backTop = document.getElementById("back_top_btn");
		var timer = null;
		var ifStopInterval = false;
		var clientHeight = document.documentElement.clientHeight;

		//判断，当滚动条滚动的时候停止定时器
		window.onscroll = function(){
			//判断，当滚动条滚动超过了屏幕高度时 显示回到顶部的按钮
			var topToScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if(topToScroll >= clientHeight){
				backTop.style.display='block';
			}else{
				backTop.style.display='none';
			}

			//判断，当滚动条滚动的时候停止定时器
			if(ifStopInterval){
				clearInterval(timer);
			}
			ifStopInterval = true;
		}

		//绑定onclick事件
		backTop.onclick = function(){
			//定义定时器
			timer = setInterval(function(){
				var topToScroll = document.documentElement.scrollTop || document.body.scrollTop;
				var backSpeed = Math.floor( -topToScroll / 6 );
				document.documentElement.scrollTop = document.body.scrollTop = topToScroll + backSpeed;
				ifStopInterval = false; 
			},30)
		}
	}

	backToTop();
	
}