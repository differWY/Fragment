/*
 * 拖拽思路
 * 1，先确定整体的拖拽区域，这里运动区域是#qq_login_window， 拖拽区域是 #qq_login_window .topBgArea
 * 2, 鼠标按下的时候记录运动区域目前的位置
 * 3，拖动的时候记录鼠标偏移量，然后让运动区域跟随运动
 * 4，鼠标松开时，取消事件监听
 */


class Move {
	constructor() {
		this.dragArea = document.querySelectorAll('#qq_login_window .topBgArea')[0];
		this.moveArea = document.querySelector('#qq_login_window');
		this.init();
	}
	
	init() {
//		console.log(this.dragArea);
//		console.log(this.moveArea);
		this.darg();
	}
	
	darg(){
		var _this = this;
		this.dragArea.addEventListener('mousedown', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			e.cancelBubble = true;
			
			_this.startX = _this.moveArea.offsetLeft;
			_this.startY = _this.moveArea.offsetTop;
			_this.disX = e.clientX - _this.startX;
			_this.disY = e.clientY - _this.startY;
			console.log({startX:_this.startX, startY:_this.startY});
			console.log({disX:_this.disX, disY:_this.disY});
			
			_this.dragArea.addEventListener('mousemove', _this.move.bind(_this));
			_this.dragArea.addEventListener('mouseup', _this.up.bind(_this));
		});
	}
	
//	move(e){
//		_this.moveX = e.clientX - _this.disX;
//		_this.moveY = e.clientY - _this.disY;
//		console.log({moveX: _this.moveX, moveY: _this.moveY});
//		_this.moveArea.style.left = _this.moveX + 'px';
//		_this.moveArea.style.top = _this.moveY + 'px';
//		// move.js:58 Uncaught TypeError: Cannot read property 'style' of undefined
//		// 这里报了一个错误，说moveArea是undefined，基本上可以确定是this的问题。
//		// 这里的this是document， 走了方法属于谁this就是谁
//	}
	
	move(e){
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		var _this = this;
		this.moveX = e.clientX - _this.disX;
		this.moveY = e.clientY - _this.disY;
		console.log({moveX: _this.moveX, moveY: _this.moveY});
		this.moveArea.style.left = _this.moveX + 'px';
		this.moveArea.style.top = _this.moveY + 'px';
	}
	
	up(e){
		alert(1);
		e.preventDefault();
		e.stopPropagation();
		e.cancelBubble = true;
		console.log(e);
		var _this = this;
		_this.dragArea.removeEventListener('mousemove', _this.move.bind(_this));
		_this.dragArea.removeEventListener('mouseup', _this.up.bind(_this));
	}
}

document.addEventListener('DOMContentLoaded', function(){
//	var m = new Move();
});


/*
 * 面向过程拖拽，看一下问题在哪？
 */
var dragArea = document.querySelectorAll('#qq_login_window .topBgArea')[0];
var moveArea = document.querySelector('#qq_login_window');


var startX = 0;
var startY = 0;

//dragArea.addEventListener('mousedown', function(e){
//	startX = e.clientX - moveArea.offsetLeft;
//	startY = e.clientY - moveArea.offsetTop;
//	dragArea.addEventListener('mousemove', fnMove);
//});
//
//function fnMove(e){
//	var endX = e.clientX - startX;
//	var endY = e.clientY - startY;
//	moveArea.style.left = endX + 'px';
//	moveArea.style.top = endY + 'px';
//}
//
//function fnEnd(e){
//	dragArea.removeEventListener('mousemove', fnMove);
//	dragArea.removeEventListener('mousemove', fnEnd);
//}
/*
 * 这种绑定方法移除不掉监听？
 */

//dragArea.onmousedown = function(e){
//	var startX = e.clientX - moveArea.offsetLeft;
//	var startY = e.clientY - moveArea.offsetTop;
//	dragArea.onmousemove = function(e){
//		var endX = e.clientX - startX;
//		var endY = e.clientY - startY;
//		moveArea.style.left = endX + 'px';
//		moveArea.style.top = endY + 'px';
//	};
//	dragArea.onmouseup = function(){
//		dragArea.onmousemove = null;
//		dragArea.onmouseup = null;
//	};
//};

/*这种PC的写法可以移除，没有写兼容*/

dragArea.addEventListener('touchstart', function(e){
	var touches = e.touches[0];
	
	console.log(touches.pageX); // 鼠标点击时的位置
	console.log(touches.pageY);
	startX = touches.pageX;
	startY = touches.pageY;
	
	dragArea.addEventListener('touchmove', fnMove);
	dragArea.addEventListener('touchend', fnEnd);
});

function fnMove(e){
	var touches = e.touches[0];
	var disX = touches.pageX - startX;
	var disY = touches.pageY - startY;
//	moveArea.style.tranform = `translate3d(${disX}px, ${disY}px, 0)`;
	moveArea.style.left = disX + 'px';
	moveArea.style.top = disY + 'px';
}

function fnEnd(e){
	dragArea.removeEventListener('touchmove', fnMove);
	dragArea.removeEventListener('touchend', fnEnd);
}
