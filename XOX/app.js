// Get the boxes
const boxes = document.querySelectorAll('tr td');
const result1 = document.querySelector('#Result-1');
const result2 = document.querySelector('#Result-2');
const resetBtn = document.querySelector('#reset');

var coordinates = [
   ['','',''],
   ['','',''],
   ['','','']
];

var orderX;
var winner;
var countX = 0;
var countO = 0;

window.addEventListener('load', () => {
   orderX = true;
   tie = false;
});

function draw(coords, box){
   let coord = coords.split(',');
   let x = Number(coord[0]);
   let y = Number(coord[1]);
   
   if(box.innerHTML == ''){
      if(orderX){
         box.innerHTML = 'X';
         coordinates[x][y] = 'X';
         orderX = false;
      }else {
         box.innerHTML = 'O';
         coordinates[x][y] = 'O';
         orderX = true;
      }
   }
    
   var isFinish = check();
   
   // is the game over ?
   if(isFinish){
      setTimeout(function(){
         alert('WİNNER: ' + winner);
         if(winner == 'X'){
            countX++;
            result1.innerHTML = countX;
         }else if(winner == 'O'){
            countO++;
            result2.innerHTML = countO;
         }
         resetTable();
      }, 2000);
   }else {
      var tie = isTie(coordinates);
      // is the game tie ?
      if(tie){
         setTimeout(function(){
            alert('DRAW!, No one win.');
            resetTable();
         }, 200);
      }
   }

   
  

}

// Check if there is winner, who is winner and there is tie
function check(){
   
   // check row 
   for(let i=0; i<3; i++){
      if((coordinates[i][0] != '') && (coordinates[i][0] == coordinates[i][1]) && ( coordinates[i][1] == coordinates[i][2])){
         winner = coordinates[i][0]; // one of the above
         boxes[3*i].setAttribute('id', 'win');
         boxes[3*i+1].setAttribute('id', 'win');
         boxes[3*i+2].setAttribute('id', 'win');
         return true;
      }
   }  

   // check column
   for(let i=0; i<3; i++){
      if((coordinates[0][i] != '') && (coordinates[0][i] == coordinates[1][i]) && ( coordinates[1][i] == coordinates[2][i])){
         winner = coordinates[0][i]; // one of the above
         boxes[i].setAttribute('id', 'win');
         boxes[i+3].setAttribute('id', 'win');
         boxes[i+6].setAttribute('id', 'win');
         return true;
      }
   }

   // check cross
   if((coordinates[0][0] != '') && (coordinates[0][0] == coordinates[1][1]) && (coordinates[1][1] == coordinates[2][2])){
      winner = coordinates[0][0]; // one of the above
      boxes[0].setAttribute('id', 'win');
      boxes[4].setAttribute('id', 'win');
      boxes[8].setAttribute('id', 'win');
      return true;
   }else if((coordinates[0][2] != '') && (coordinates[0][2] == coordinates[1][1]) && (coordinates[1][1] == coordinates[2][0])){
      winner = coordinates[0][2]; // one of the above
      boxes[2].setAttribute('id', 'win');
      boxes[4].setAttribute('id', 'win');
      boxes[6].setAttribute('id', 'win');
      return true;
   }   

}

function isTie(coordinates){
   let b = 0;
   for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
         if((coordinates[i][j] != '')){
            b++;
         }
      }
   }

   return (b==9 ? true:false);
}


// Reset game
function resetTable(){
   // Reset coordinates
   for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
         coordinates[i][j] = '';
      }
   }

   // Reset inner of the boxes
   boxes.forEach(box => {
      box.innerHTML = '';
      box.removeAttribute('id', 'win');
   });



}

// Click 'reset' button
resetBtn.addEventListener('click', resetGame);

// Reset the score and start the game again.
function resetGame(){
   window.location.reload();
}