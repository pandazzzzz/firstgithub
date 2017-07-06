window.onload = function() {
	//模态框点击事件及位置设置
	//				var btnshowdailog = document.getElementById("worksubmit")
	var showdailog = document.getElementById("showdailog")
	var showdailogbg = document.getElementById("showdailogbg");
	var container=document.getElementById("container")
	var swidth = document.documentElement.clientWidth;
	var sheight = document.documentElement.clientHeight;
	var btnsubmit = document.getElementById("btnsubmit");
	var btnshowdailog = document.getElementsByClassName("worksubmit");
	var quxiao=document.getElementById("quxiao");
	quxiao.onclick=function(){
		showdailog.style.display="none";
		showdailogbg .style.display="none";
	}
	for (var i = 0; i < btnshowdailog.length; i++) {
		btnshowdailog[i].onclick = function() {
			var scrolltop = document.body.scrollTop;
			showdailogbg.style.display = "block";
			container.style.overflowY="hidden";
			showdailogbg.style.height = sheight + scrolltop + "px";
			showdailogbg.style.top = "0px"
			showdailogbg.style.left = "0px"
			showdailog.style.display = "block";
			showdailog.style.left = (swidth - showdailog.offsetWidth) / 2 + "px"
			showdailog.style.top = (sheight - showdailog.offsetHeight) / 2 + scrolltop + "px"
		}
	}
	btnsubmit.onclick = function() {
		showdailogbg.style.display = "none"
		showdailog.style.display = "none"
	}
	var top = document.getElementById("top");
	var kefu = document.getElementById("kefuall");
	var navbar = document.getElementById("navbar");
	var navlist = document.getElementById("navlist");
	var firstmenu = document.getElementsByClassName("firstmenu");
	var secondmenu = document.getElementsByClassName("xialamenu");
	//顶部导航栏二级菜单设置
	for (var i = 0; i < firstmenu.length; i++) {
		firstmenu[i].index = i;
		firstmenu[i].onclick = function() {
			for (var j = 0; j < secondmenu.length; j++) {
				secondmenu[j].style.display = "none";
//							firstmenu[j].style.color="white"
			}
			secondmenu[this.index].style.display = "block";
//							this.style.color="#988F8F"
		}
	}
	//响应时缩小时点击与隐藏导航栏列表
	function hidden() {
		if (navlist.style.display == "block") {
			navlist.style.display = "none";
		} else {
			navlist.style.display = "block";
		}
	}
	navbar.onclick = hidden;
	//窗口变大到大于768像素及顶部导航栏有scroll时显示顶部导航栏
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
		//顶部导航栏滚动出现回到顶部隐藏
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
	var worktab = document.getElementById("worktab");
	var workli = worktab.getElementsByTagName('li');
	var rtab = document.getElementsByClassName("rtab");
	//var sp1=document.getElementById("sp1");
//	var sp2=document.getElementById("sp2");
	for (var k = 0; k < workli.length; k++) {
		workli[k].index = k;
		workli[k].onclick = function() {
			for (var j = 0; j < rtab.length; j++) {
				workli[j].className = "";
				workli[j].firstChild.style.color="#7676f7";
				workli[j].firstChild.nextSibling.style.color="#7676f7";			
				rtab[j].style.display = "none";
			}
			this.className = "tabshow";
			workli[this.index].firstChild.style.color="white";
			workli[this.index].firstChild.nextSibling.style.color="white";
			rtab[this.index].style.display = 'block';
		}
	}
}