//кнопочки и начало таймера

var checkone = document.getElementById('checkone');
var checktwo = document.getElementById('checktwo');
var checkthree = document.getElementById('checkthree');
var checkfour = document.getElementById('checkfour');
var boolBLYAT = 0;

var progressBarR = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBarR.style.strokeDasharray = length;     

function playSound() {
  var audio = new Audio('./sound/tic.mp3');
  audio.play();
  audio.volume = id_range.value;
}
function EndSound() {
  var audio = new Audio('./sound/sound_end/end.mp3');
  audio.play();
}
function EndSound1() {
  var audio = new Audio('./sound/sound_end/end1.mp3');
  audio.play();

}
function EndSound2() {
  var audio = new Audio('./sound/sound_end/end2.mp3');
  audio.play();

}
function EndSound3() {
  var audio = new Audio('./sound/sound_end/end3.mp3');
  audio.play();

}
function EndSoundd() {
  var audio = new Audio('./sound/sound_endd/endd.mp3');
  audio.play();
}
function EndSoundd1() {
  var audio = new Audio('./sound/sound_endd/endd1.mp3');
  audio.play();
}
function EndSoundd2() {
  var audio = new Audio('./sound/sound_endd/endd2.mp3');
  audio.play();
}
function EndSoundd3() {
  var audio = new Audio('./sound/sound_endd/endd3.mp3');
  audio.play();
}

function update(value, timePercent) {

  playSound();
	var offset = - length - length * value / (timePercent);
	progressBarR.style.strokeDashoffset = offset; 
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
  if(isStarted === true){
        setterBtnsOne.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.9;
    });
  }
  
};



//конец таймера
const displayOutput = document.querySelector('.display-remain-time');
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');
const setterBtnsOne = document.querySelectorAll('button[data-setter-one]');
const setterBtnsthree = document.querySelectorAll('button[data-setter-three]');

let intervalTimer;
let timeLeft ;
let wholeTime = 0.5 * 60; // начальное время таймера
let isPaused = false;
let isStarted = false;


update(wholeTime,wholeTime); //обновление
displayTimeLeft(wholeTime);

function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds ;
    update(wholeTime,wholeTime);
  }
  if ((wholeTime + seconds) >= 3600){ //ограничение на таймер - максимум 3600(1час)
    wholeTime = 3600; //условное ,после 3600 таймер обновляется до 3600
  }
}

for (var i = 0; i < setterBtns.length; i++) {
    setterBtns[i].addEventListener("click", function(event) {
        var param = this.dataset.setter;
        switch (param) {
            case 'minutes-plus':
                changeWholeTime(1 * 60);
                break;
            case 'minutes-minus':
                changeWholeTime(-1 * 60);
                break;
            case 'seconds-plus':
                changeWholeTime(1);
                break;
            case 'seconds-minus':
                changeWholeTime(-1);
                break;
        }
      displayTimeLeft(wholeTime);
    });
}
for (var i = 0; i < setterBtnsthree.length; i++) {
  setterBtnsthree[i].addEventListener("click", function(event) {
      var param = this.dataset.setter;
      switch (param) {
          case 'minutes-plus':
              changeWholeTime(1 * 60);
              break;
          case 'minutes-minus':
              changeWholeTime(-1 * 60);
              break;
          case 'seconds-plus':
              changeWholeTime(1);
              break;
          case 'seconds-minus':
              changeWholeTime(-1);
              break;
      }
    displayTimeLeft(wholeTime);
  });
}
for (var i = 0; i < setterBtnsOne.length; i++) {
  setterBtnsOne[i].addEventListener("click", function(event) {
      var param = this.dataset.setter;
      switch (param) {
          case 'minutes-plus':
              changeWholeTime(1 * 60);
              break;
          case 'minutes-minus':
              changeWholeTime(-1 * 60);
              break;
          case 'seconds-plus':
              changeWholeTime(1);
              break;
          case 'seconds-minus':
              changeWholeTime(-1);
              break;
      }
    displayTimeLeft(wholeTime);
  });
}
checkone.onclick = function(){
  boolBLYAT = 1;
  EndSoundd();
}
checktwo.onclick = function(){
  boolBLYAT = 2;
  EndSoundd1();
}
checkthree.onclick = function(){
  boolBLYAT = 3;
  EndSoundd2();
}
checkfour.onclick = function(){
  boolBLYAT = 3;
  EndSoundd3();
}
function timer (seconds){ //логика
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){

      if(boolBLYAT == 1){EndSound();}if(boolBLYAT == 2){EndSound1();}
      if(boolBLYAT == 3){EndSound2();}if(boolBLYAT == 4){EndSound3();}
      if(boolBLYAT == 0){EndSound();}
      clearInterval(intervalTimer);
      isStarted = false;
      setterBtns.forEach(function(btn){
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      setterBtnsOne.forEach(function(btn){
        btn.disabled = false;

      });
      setterBtnsthree.forEach(function(btn){
        btn.disabled = false;

      });
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
    
    setterBtns.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.9;
    });
    setterBtnsOne.forEach(function(btn){
      btn.disabled = true;

    });
    setterBtnsthree.forEach(function(btn){
      btn.disabled = true;

    });
  }else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}

function displayTimeLeft (timeLeft){ //вывод времени
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}

pauseBtn.addEventListener('click',pauseTimer);