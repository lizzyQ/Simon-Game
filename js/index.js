var countText = document.getElementById("count-text");
var statu = document.getElementById("statu");
var memo = [];
var clickE =[];
var step = 0;
var strict = false;
var restart = false;
document.getElementById("toggleCheck").checked = false;

function initial(){
  memo = [];
  clickE = [];
  step = 0;
  strict = false;
  countText.innerHTML= "--";
  statu.innerHTML = "Welcome!!";
}

function startBtn(){
  if(!restart){
    showMoves();
    restart = true;
  }else{
    initial();
    showMoves();
  }
}

function showMoves(){
       var random = Math.floor(Math.random()*4)+1;
       memo.push(random);
       flash();    
       step += 1;  
       countText.innerHTML= step < 10 ? "0"+ step : step;
       clickE = [];
       //prevent double click
       //this.disabled = true;
}

function flash() { 
  var idx = 0, elem, audio;   
  var flashE = setInterval(frame, 1500);
  function frame() {
    if (idx >= memo.length) {
      clearInterval(flashE);
      userInput();
      timeOut();
    } else {
      idx++; 
      elem = document.getElementById("a" + memo[idx-1]);
      audio = document.getElementById("audio" + memo[idx-1]);
      elem.style.opacity = "1"; 
      setTimeout(function(){  elem.style.opacity = "0.6"; }, 1000);
      audio.play();
    }
  }      
}

function userInput(){
   for(var j=0; j< 4; j++){
     var userBtn = document.getElementById("a"+ (j+1));
     if(document.getElementById("toggleCheck").checked){
         userBtn.style.cursor = "pointer";
         userBtn.addEventListener("click", pushClick, false);
     }else{
        userBtn.style.cursor = "default";
        userBtn.removeEventListener("click", pushClick, false);
     }
    }
}

function pushClick(){
  var elmt = parseInt(this.id[1], 10);
  clickE.push(elmt);
  var brightE = document.getElementById("a" + elmt);
  var audioE = document.getElementById("audio" + elmt);
  audioE.play();
  brightE.style.opacity = "1"; 
  setTimeout(function(){  brightE.style.opacity = "0.6"; }, 200);
  check();
}



function check(){ 
  
  if ( clickE[clickE.length - 1] !== memo[clickE.length - 1] ){
          if(strict){
            statu.innerHTML = 'Try again! ...From scratch!';
            initial();
            showMoves();
          } else {
            statu.innerHTML= 'Wrong move! Try again!';
            flash();
            clickE=[];
          }
   }else if( clickE.length !== 0 ){  
        if(clickE.length === memo.length){
                   if(step == 21){
                    statu.innerHTML='You won! Congrats.';
                    statu.style.color = "lime";
                    initial();
                    showMoves();
                  } else {
                    statu.innerHTML = 'Good Move!';
                    showMoves();
                  }
          }
    }
} 

function strictMode(){
  var stct = document.getElementById("strict"); 
  if( strict == false){
     stct.style.color = "#2F4F4F";
     stct.style.background = "#37FDFC";
     strict = true;
   }else{
     stct.style.color = "#131313";
     stct.style.background = "rgb(192,192,192)";
     strict = false;
   }
}

function toggleReady(elet) {
   if(elet.checked){
     document.getElementById("start").addEventListener("click", startBtn ,false);
     countText.style.color = "red";
     document.getElementById("strict").addEventListener("click", strictMode ,false);
   
   }else{
     
     document.getElementById("start").removeEventListener("click", startBtn ,false);
     document.getElementById("strict").removeEventListener("click", strictMode ,false);
     countText.style.color = "rgb(67,7,16)";
     initial();
     restart = false;
   }
}//toggle function over
