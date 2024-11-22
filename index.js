"use strict";
let stage = 0;

window.onload = function() {
	let curtains = document.getElementsByClassName("curtains")[0];
	curtains.onmouseenter = curtainsMouseOver;
	curtains.onmouseleave = curtainsMouseOut;
	curtains.onclick = curtainsMouseClick;
}

function curtainsMouseOver(){
	let curtains = document.getElementsByClassName("curtains")[0];
	curtains.className = "curtains curtains_up";
}

function curtainsMouseOut() {
	let curtains = document.getElementsByClassName("curtains")[0];
		curtains.className = "curtains";
}

function curtainsMouseClick(){
	let curtains = document.getElementsByClassName("curtains")[0];
	curtains.className = "curtains scroll_up";
	curtains.onmouseleave = null;
	curtains.onmouseenter = null;
	let lamp = document.getElementsByClassName("lamp")[0];
	lamp.onclick = lampFirstMouseClick;
}

function lampFirstMouseClick(event) {
	lampMouseClick();
	let lamp = document.getElementsByClassName("lamp")[0];
	lamp.onclick = null;
	event.stopPropagation();//не дает событию лететь выше по иерархии к документу, что-бы снова сразу не вызывалась обработка этого события в документе
	document.addEventListener('click', documentClick);
}

function documentClick(event){
	let lamp = document.getElementsByClassName("lamp")[0];
	let rect = lamp.getBoundingClientRect();
	if ((event.clientX >= rect.left) && (event.clientX <= (rect.left + rect.width)) &&
		(event.clientY >= rect.top) && (event.clientY <= (rect.top + rect.height))
		){
			lampMouseClick();	
		}
		
}

let lampTurnOn = false;
let timerId = undefined;
function lampMouseClick(){
	lampTurnOn = ! lampTurnOn;
	let light = document.getElementsByClassName("light")[0];
	let wizard = document.getElementsByClassName("wizard")[0];
	let hat = document.getElementsByClassName("hat")[0];
	let bird = document.getElementsByClassName("bird")[0];
	let rabbit = document.getElementsByClassName("rabbit")[0];
	if (lampTurnOn){
		light.className = "light light_on";
		wizard.className = "wizard wizard_on";
		hat.className = "hat hat_on";
		timerId = window.setTimeout(figuresMoving, 0);
	}
	else{
		light.className = "light light_off";
		wizard.className = "wizard wizard_off";
		hat.className = "hat hat_off";
		bird.className = "bird bird_off";
		rabbit.className = "rabbit rabbit_off";
		window.clearTimeout(timerId);
	}
}

let rabbitMoving = true;
let figureIsDown = true;
function figuresMoving(){
	let rabbit = document.getElementsByClassName("rabbit")[0];
	let bird = document.getElementsByClassName("bird")[0];
	if (rabbitMoving){
		if (figureIsDown){
			rabbit.className = "rabbit rabbit_up";
			figureIsDown = false;
		} else {
			rabbit.className = "rabbit rabbit_down";
			figureIsDown = true;
			rabbitMoving = false;
		}
		
	} else {
		if (figureIsDown){
			bird.className = "bird_up bird";
			figureIsDown = false;
		} else {
			bird.className = "bird bird_down";
			figureIsDown = true;
			rabbitMoving = true;
		}
	}
		timerId = window.setTimeout(figuresMoving, 1000);
}







