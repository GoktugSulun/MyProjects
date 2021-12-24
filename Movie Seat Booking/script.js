const allSeat = document.querySelectorAll('.seat:not(.occupied)');
allSeat.forEach(seat => {
   seat.addEventListener('click', selection);
});

const amount = document.getElementById('amount');
const price = document.getElementById('price');
const film = document.querySelector('select');

let ticket_amount = 0;

function selection(){
   if(this.classList.contains('selected')){
      ticket_amount--;
   }else {
      ticket_amount++;
   }
   this.classList.toggle('selected');
   console.log(ticket_amount);
   amount.innerHTML = ticket_amount;
   calculation(film.options[film.selectedIndex].value);
}

film.addEventListener('change', () => {
   console.log(film.value);
   console.log(film);
   calculation(film.value);
});


function calculation(price){
   let result = ticket_amount * Number(price);
   let money = document.getElementById('price');
   money.innerText = `$${result}`;
}