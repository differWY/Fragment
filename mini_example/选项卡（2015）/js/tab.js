
//页面加载
window.onload = function(){

	//通过class获取节点的函数 getByClass(className)
	function getByClass(className){
		var objs = document.getElementsByTagName('*');
		var arr = [];
		var reg =new RegExp("\\b" + className + "\\b","g");
		for(var i=0;i<objs.length;i++){
			if(objs[i].className.search(reg) != -1){//search方法第一次接触
				arr.push(objs[i]);
			}
		}
		return arr;
	}

	//获取指定类名classEle下第(classIndex+1)个div里边ul里边的li数组
	function getLis(classEle,classIndex){
		var childs = classEle[classIndex].childNodes;
		var cChilds = "";
		var lis = [];
		for(var i=0;i<childs.length;i++){
			if(childs[i].tagName == 'UL'){
				cChilds = childs[i].childNodes;
			}
		}
		for(var i=0;i<cChilds.length;i++){
			if(cChilds[i].tagName == 'LI'){
				lis.push(cChilds[i]);
			}
		}
		return lis;
	}//这个函数写的没有任何复用性，而且可以用getElementsByTagName('li');代替
	//实际上可以直接用getElementsByTagName('li');代替

	//获取某个类指定下标节点元素内的指定标签名的子节点数组
	function getChlidsByTagName(classLable,classIndex,tag){
		var aResult = [];
		var childs = classLable[classIndex].childNodes;
		for (var i = 0; i < childs.length; i++) {
			if(childs[i].tagName == tag){
				aResult.push(childs[i]);
			}
		};
		return aResult;
	}//实际上可以直接用getElementsByTagName('ul');代替

	//获取兄弟元素(父节点的字节点，同时不是它本身),指定标签名的，
	//传参数需大写 例：'LI'
	function getBrothers(eleName,tag){
		var borders = [];
		var allChilds = eleName.parentNode.childNodes;
		for(var i=0;i<allChilds.length;i++){
			if(allChilds[i].tagName == tag && allChilds[i] != eleName){
				borders.push(allChilds[i]);
			}
		}
		return borders;
	}

	//给数组内的dom元素换class
	function changeClass(arr,classLable){
		for (var i = 0; i < arr.length; i++) {
			arr[i].className = classLable;
		};
	}

	//获取到节点
	var nav = getByClass('nav');
	var lis = getLis(nav,0);
	var content = getByClass('content');
	var cons = getChlidsByTagName(content,0,'UL');
	
	/*
	for(var i=0;i<lis.length;i++){
		lis[i].onclick = function(){
			this.className = 'nav_li nav_li_on';
			var b = getBrothers(this,'LI');
			changeClass(b,'nav_li');
		}
		lis[i].onmouseover = function(){
			this.className = 'nav_li nav_li_on';
			var b = getBrothers(this,'LI');
			changeClass(b,'nav_li');
		}	
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;//index换成id的话ie9以下就可以识别了
		lis[i].onclick = function(){
			for(var j=0;j<lis.length;j++){
				lis[this.index].className = 'nav_li nav_li_on';
				cons[this.index].className = 'con show';
				if(this.index != j){
					lis[j].className = 'nav_li';
					cons[j].className = 'con hide';
				}
			}
		}
		lis[i].onmouseover = function(){
			for(var j=0;j<lis.length;j++){
				lis[this.index].className = 'nav_li nav_li_on';
				cons[this.index].className = 'con show';
				if(this.index != j){
					lis[j].className = 'nav_li';
					cons[j].className = 'con hide';
				}
			}
		}		
	}
	*/

	//dom2级绑定，为多个事件绑定一个函数
	function addEvent(dom,eveName,handle,boo){
		var arr = eveName.split(',');
		//这里刚开始用的正则没起作用 后来发现用split就可以了，
		//不过不能兼容空格 ，可以再优化一下
		//思考：怎样绑定多个函数呢？
		for(var i=0;i<arr.length;i++){
			dom.addEventListener
			?dom.addEventListener(arr[i],handle,boo)
			:dom.attachEvent('on'+arr[i],handle);
			//这里的兼容同样是针对于IE 6、7、8
		}
	}
	for(var i=0;i<lis.length;i++){
		lis[i].id = i;
		addEvent(lis[i],'click,mouseout',function(){
			for(var j=0;j<lis.length;j++){
				lis[this.id].className = 'nav_li nav_li_on';
				cons[this.id].className = 'con show';
				if(this.id != j){
					lis[j].className = 'nav_li';
					cons[j].className = 'con hide';
				}
			}
		},false);
		//这样每次dom元素都需要用参数的形式 仅仅是自定义函数，
		//需要了解js扩展，达到对象可以调用函数。
	}


}