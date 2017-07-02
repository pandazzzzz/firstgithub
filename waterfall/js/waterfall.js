window.onload = function() {
	waterfall("main", "box");
	var dataImg = {
		"data": [{
			"src": "1.jpg"
		}, {
			"src": "2.jpg"
		}, {
			"src": "3.jpg"
		}, {
			"src": "4.jpg"
		}, {
			"src": "5.jpg"
		}, {
			"src": "6.jpg"
		}, {
			"src": "7.jpg"
		}, {
			"src": "8.jpg"
		}, {
			"src": "9.jpg"
		}, {
			"src": "10.jpg"
		}]
	}
	window.onscroll = function() { //鼠标滚动加载
		if (checkScrollSlide()) {

			for (var i = 0; i < dataImg.data.length; i++) {
				var parent = document.getElementById("main");
				var obox = document.createElement("div")
				obox.className = "box";
				parent.appendChild(obox);
				var opic = document.createElement("div")
				opic.className = "pic";
				obox.appendChild(opic);
				var oimg = document.createElement("img")
				oimg.src = "img/waterfall/" + dataImg.data[i].src;
				opic.appendChild(oimg);
			}
		}
		waterfall("main", "box");
	}
}

function waterfall(parent, box) {
	var main = document.getElementById(parent);
	var imgNum = getImgNum(box);
	var browerWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var imgWidth = imgNum[0].offsetWidth;
	var rowsNum = Math.floor(browerWidth / imgWidth);
	var harr = [];
	for (var i = 0; i < imgNum.length; i++) {
		if (i < rowsNum) {
			harr.push(imgNum[i].offsetHeight);
		} else {
			var minh = Math.min.apply(null, harr);
			var index = getMinhIndex(harr, minh);
			imgNum[i].style.position = "absolute";
			imgNum[i].style.left = imgNum[index].offsetLeft + "px";
			//imgNum[i].style.left=imgWidth*index+"px";
			imgNum[i].style.top = minh + "px";
			harr[index] += imgNum[i].offsetHeight;
		}
	}
}

function getMinhIndex(harr, minh) { //获取最小高度的索引
	for (i in harr) {
		if (harr[i] == minh) {
			return i;
		}
	}
}

function getImgNum(classname) { //获取所有类名为box的将其放入数组
	var imgarr = new Array();
	var all = document.getElementsByTagName("*");
	for (var i = 0; i < all.length; i++) {
		if (all[i].className == classname) {
			imgarr.push(all[i]);
		}
	}
	return imgarr;
}

function checkScrollSlide() { //是否加载
	var imgNums = getImgNum('box');
	var lasth = imgNums[imgNums.length - 1].offsetTop + Math.floor(imgNums[imgNums.length - 1].offsetHeight / 2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	var scrollh = scrollTop + height;
	if (lasth < scrollh) {
		return true;
	} else {
		return false;
	}
}