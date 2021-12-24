const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

window.addEventListener('load', calculate);

// fetch currency rates and update the dom
function calculate(){
   const currency_one = currencyEl_one.value;
   const currency_two = currencyEl_two.value;

   fetch(`https://v6.exchangerate-api.com/v6/1745a6a6fd7c129d26a3dfca/latest/${currency_one}`)
      .then(response => response.json())
      .then(data => {
         const rate = data.conversion_rates[currency_two];
         console.log(data.conversion_rates);
         let cal = (rate * Number(amountEl_one.value)).toFixed(2);
         rateEl.innerText = `${amountEl_one.value} ${currency_one} = ${cal} ${currency_two}`;
         amountEl_two.value = cal;
      });
}

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
   const temp = currencyEl_one.value;
   currencyEl_one.value = currencyEl_two.value;
   currencyEl_two.value = temp;
   calculate();
});


