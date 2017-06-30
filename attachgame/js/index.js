window.onload = function() {
	var canvas = document.getElementById("mycanvas");
	var pen = canvas.getContext("2d");
	var food1 = document.getElementById("food1");
	var food2 = document.getElementById("food2");
	var bg = document.getElementById("bg");
	var heart = document.getElementById("heart");
	var player = document.getElementById("player");
	var scorebg = document.getElementById("scorebg");
	var stop = document.getElementById("stop");
	var playerx = 130 + 35;
	var playery = 400 + 35;
	var a = 395;
	var a;
	var ismousedown = false;
	var mooncakes = [];
	var total = 0; //分数
	var timer1, timer2;
	var timer3;
	var timer4 = null;
	var timer5 = null;
	var b;
	var zidan = [];

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min)) + min + 1;
	}

	timer1 = setInterval(function() {
		mooncakes.push({
			x: getRandom(0, 270),
			y: 0,
			type: Math.floor(Math.random() * 2)
		})
	}, 1000);

	canvas.onmousedown = function() {
		clearInterval(timer4);
		timer4 = setInterval(function() {
			ismousedown = true;
			zidan.push({
				zidanx: playerx,
				zidany: playery - 40,
				r: 7,
				color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"
			})
		}, 200)
	}
	canvas.onmousemove = function(e) {
		if (ismousedown) {
			if (e.offsetX > playerx - 35 && e.offsetX < playerx + 35 && e.offsetY < playery + 35 && e.offsetY > playery - 35) {
				//兔子边界不能移除画布
				if (playerx < 35 || playerx > 285 || playery < 30 || playery > 470) {
					if (playerx < 35) {
						playerx = 35;

					}
					if (playerx > 285) {
						playerx = 285;

					}

					if (playery < 30) {
						playery = 30;

					}
					if (playery > 470) {
						playery = 470;

					}
				} else {
					playerx = e.offsetX;
					playery = e.offsetY;
				}

			}
		}
	}
	canvas.onmouseup = function() {
		ismousedown = false;
		clearInterval(timer4)
	}
	pen.drawImage(bg, 0, 0);
	var time = null;
	var y = -(1126 - 500);
	timer2 = setInterval(gamerefresh, 50);

	function gamerefresh() {

		if (y >= 500) {
			y = -(1126 - 500);
		}
		y = y + 5;
		pen.drawImage(bg, 0, y);
		pen.drawImage(bg, 0, y - 1126);
		pen.drawImage(scorebg, 150, 40);
		pen.beginPath()
		pen.font = "20px Arial";
		pen.lineWidth = 2;
		pen.fillStyle = 'red';
		pen.fillText("得分：", 220, 70);
		pen.fillText(total, 280, 70);
		pen.closePath()
		pen.drawImage(heart, 155, 42);
		pen.drawImage(player, playerx - 35, playery - 35, 70, 70);
		for (var k = 0; k < zidan.length; k++) {
			pen.beginPath();
			pen.arc(zidan[k].zidanx, zidan[k].zidany, zidan[k].r, 0, 2 * Math.PI);
			pen.fillStyle = zidan[k].color;
			pen.fill();
			pen.closePath();
			//子弹与月饼的范围计算在某个范围内月饼即被打中
			for (var m = 0; m < mooncakes.length; m++) {
				if (mooncakes[m].x < zidan[k].zidanx && mooncakes[m].x + 50 > zidan[k].zidanx && mooncakes[m].y < zidan[k].zidany && mooncakes[m].y + 50 > zidan[k].zidany) {
					mooncakes[m].y = 600;
					zidan[k].zidany = -100;
					if (mooncakes[m].type == 0) {
						total++;

					}
				}
			}
			if (zidan[k].zidany <= 0) {
				zidan.splice(k, 1);
			}
		}
		if (mooncakes.length > 0) {
			for (var i = 0; i < mooncakes.length; i++) {
				if (mooncakes[i].type == 0) { //五仁月饼
					pen.drawImage(food1, mooncakes[i].x, mooncakes[i].y);
					mooncakes[i].y = mooncakes[i].y + 12;
				} else { //花月饼
					pen.drawImage(food2, mooncakes[i].x, mooncakes[i].y);
					mooncakes[i].y = mooncakes[i].y + 9;
					if (mooncakes[i].y > 250) {
						mooncakes[i].y = mooncakes[i].y + 11;
					}
				}
			}
			for (var j = 0; j < mooncakes.length; j++) {

				if ((mooncakes[j].x + 100 > playerx) && (playerx + 40 > mooncakes[j].x) && (mooncakes[j].y + 55 > playery) && (playery + 50 > mooncakes[j].y)) {
					if (mooncakes[j].type == 0) {
						mooncakes[j].y = 600;
						//清除定时器
						clearInterval(timer1);
						clearInterval(timer2);
						clearInterval(timer4);
						pen.beginPath()
						pen.font = "40px Arial";
						pen.lineWidth = 3;
						pen.strokeStyle = 'red';
						pen.strokeText("游戏结束!!", 70, 250);
						pen.strokeText("游戏得分:" + total + "分", 60, 310);
						//  stop.innerHTML="返回"
						stop.innerHTML = "重新开始";
						total = 0;
						pen.closePath()
					} else {
						mooncakes[j].y = 600;
						total++;

					}
				} else if ((mooncakes[j].x + 150 > playerx) && (playerx + 150 > mooncakes[j].x) && (mooncakes[j].y + 150 > playery) && (playery + 150 > mooncakes[j].y)) {
					//五仁月饼在某个范围内攻击兔子
					if (mooncakes[j].type == 0) {
						if (mooncakes[j].x + 60 > playerx) {
							mooncakes[j].x = mooncakes[j].x - 5;

						} else if (playerx + 60 > mooncakes[j].x) {
							mooncakes[j].x = mooncakes[j].x + 5;

						}
						if (mooncakes[j].y + 60 > playery) {
							mooncakes[j].y = mooncakes[j].y - 25;

						}
						if (playery + 60 > mooncakes[j].y) {
							mooncakes[j].y = mooncakes[j].y + 10;

						}
					}
				}

				if (mooncakes[j].y > 500) {
					mooncakes.splice(j, 1);
				}
			}
		}

	}
	timer3 = setInterval(function() {
		for (var k = 0; k < zidan.length; k++) {
			zidan[k].zidany = zidan[k].zidany - 7;
		}
	}, 50)

	stop.onclick = function() {
		if (stop.innerHTML == '暂停') {
			stop.innerHTML = "开始";
			clearInterval(timer1);
			clearInterval(timer2);
			clearInterval(timer3);
		} else if (stop.innerHTML == '开始') {
			stop.innerHTML = "暂停";
			clearInterval(timer3);
			timer3 = setInterval(function() {
				for (var k = 0; k < zidan.length; k++) {
					zidan[k].zidany = zidan[k].zidany - 7;
				}
			}, 50)
			timer1 = setInterval(function() {
				mooncakes.push({
					x: getRandom(0, 270),
					y: 0,
					type: Math.floor(Math.random() * 2)
				})
			}, 1000);
			timer2 = setInterval(gamerefresh, 50);
		} else if (stop.innerHTML == '重新开始') {
			window.location.reload();

		}
	}
}