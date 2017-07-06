window.onload = function() {
	var top = document.getElementById("top");
	var kefu = document.getElementById("kefuall");
	var navbar = document.getElementById("navbar");
	var navlist = document.getElementById("navlist");
	var firstmenu = document.getElementsByClassName("firstmenu");
	var secondmenu = document.getElementsByClassName("xialamenu");
	for (var i = 0; i < firstmenu.length; i++) {
		firstmenu[i].index = i;
		firstmenu[i].onclick = function() {
			for (var j = 0; j < secondmenu.length; j++) {
				secondmenu[j].style.display = "none";
				//				firstmenu[j].style.backgroundColor="white"
			}
			secondmenu[this.index].style.display = "block";
			//				this.style.backgroundColor="#988F8F"
		}
	}

	function hidden() {
		if (navlist.style.display == "block") {
			navlist.style.display = "none";
		} else {
			navlist.style.display = "block";
		}
	}
	navbar.onclick = hidden;
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
	var tab = document.getElementById("newstab");
	var oli = tab.getElementsByTagName('li');
	var odiv = document.getElementsByClassName("newsdiv");
	for (var i = 0; i < oli.length; i++) {
		oli[i].index = i;
		oli[i].onclick = function() {
			for (var j = 0; j < oli.length; j++) {
				oli[j].className = ' ';
				oli[j].firstChild.style.color="blue"
				odiv[j].style.display = "none";
			}
			this.className = 'newsactive';
			oli[this.index].firstChild.style.color="black";
			odiv[this.index].style.display = 'block';
		}
	}
}