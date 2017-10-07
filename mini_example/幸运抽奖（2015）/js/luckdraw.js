


/*页面加载*/
window.onload = function(){
	//获取到改变区域
	var changeArea = document.getElementById("changeArea");

	//获取开始和停止按钮
	var start = document.getElementById("start");
	var stop = document.getElementById("stop");

	//声明奖品信息数组
	var prizeList = ['百度网盘1G空间','iphone6 PLUS','精美HelloKitty抱枕','谢谢惠顾','积分500',
		'美的变频空调','华为P8','清风柔顺面纸','360安全公仔'];

	//声明定时器变量 和键盘抬起的判定变量
	var timer = "";
	var keyupflag = 0;

	/*开始抽奖函数*/
	function startDraw(){
		clearInterval(timer);
		//使用声明的定时器变量timer 设定定时器
		timer = setInterval(function(){
			var randomIndex = Math.floor(Math.random()*prizeList.length);
			changeArea.innerHTML = prizeList[randomIndex];
		},100)
		start.style.backgroundColor="#ccc";
		//开始抽奖时，将键盘判断置为1
		keyupflag = 1;
	}
	/*停止抽奖函数*/
	function stopDraw(){
		clearInterval(timer);
		start.style.backgroundColor="#c65";
		//停止抽奖时，将键盘判断置为0
		keyupflag = 0;
	}

	/*键盘抬起控制抽奖的函数*/
	function keyupDraw(keycode){
		document.onkeyup = function(event){
			event = event || window.event;
			//获取键盘按下的时候键盘的键码值
			console.log(event.keyCode);	
			if(event.keyCode == keycode){
				//使用到声明的键盘抬起判定变量keyupflag，判定执行细节
				if(keyupflag == 0){
					startDraw();
				}else{
					stopDraw();
				}
			}
		}
	}

	//相应的事件调用函数
	keyupDraw(32);
	start.onclick = startDraw;
	stop.onclick = stopDraw;
}