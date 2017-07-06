window.onload = function() {
	var top = document.getElementById("top");
	var kefu = document.getElementById("kefuall");
	var navbar = document.getElementById("navbar");
	var navlist = document.getElementById("navlist");
	var firstmenu = document.getElementsByClassName("firstmenu");
	var secondmenu = document.getElementsByClassName("xialamenu");
	var cancel=document.getElementById("cancel");
	var kefu=document.getElementById("kefuall");
	cancel.onclick=function(){
		kefu.style.display="none";
	}
	//二级下拉菜单
	for (var i = 0; i < firstmenu.length; i++) {
		firstmenu[i].index = i;
		firstmenu[i].onmouseover = function() {
			for (var j = 0; j < secondmenu.length; j++) {
				secondmenu[j].style.display = "none";
			}
			secondmenu[this.index].style.display = "block";
		}
	}
	//移动端列表显示与隐藏
	function hidden() {
		if (navlist.style.display == "block") {
			navlist.style.display = "none";
		} else {
			navlist.style.display = "block";
		}
	}
	navbar.onclick = hidden;
	//窗口改变事件，当可视区宽度大于768导航栏列表显示
	window.onresize = function() {
		var s = document.documentElement.clientWidth || document.body.clientWidth;
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop
		if (s > 768 && scrolltop >= 60) {
			navlist.style.display = "block";
		} else if (s > 768 && scrolltop < 60) {
			navlist.style.display = "block";
			top.style.display = "none";
		} else {
			top.style.display = "block";
			navlist.style.display = "none";
		}
	}

	function getScrolltop() {
		var scrolltop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrolltop = document.documentElement.scrollTop; //兼容火狐与IE
		} else if (document.body) {
			scrolltop = document.body.scrollTop; //兼容谷歌
		}
		return scrolltop;
	}
	window.onscroll = function() {
		var swidth;
		if (document.body.clientWidth) {
			swidth = document.body.clientWidth;
		} else {
			swidth = document.documentElement.clientWidth;
		}
		if (getScrolltop() >= 60) {
			top.style.display = 'block';
			top.style.position = "absolute";
			top.style.top = getScrolltop() + "px";
		} else if (getScrolltop() <= 60 && swidth >= 768) {
			top.style.display = 'none';
			top.style.top = '0px';

		} else if (getScrolltop() <= 60 && swidth < 768) {
			top.style.display = 'block';
			top.style.top = '0px';

		}
	}
}