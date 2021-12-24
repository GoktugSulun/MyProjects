window.addEventListener('load', () => {
   getRequestApi();
});

const host = 'api.frankfurter.app';

let getRequestApi = () => {
   let api = `https://${host}/latest?from=USD`;
   fetch(api)
   .then(response => response.json())
   .then((data) => {
      setUI(data);
   });
}

const currencyFrom = document.querySelector('#fromCurrency');
const currencyTo = document.querySelector('#toCurrency');

let getRequestApi2 = (base) => {
   let api = `https://${host}/latest?from=${base}`;
   fetch(api)
   .then(response => response.json())
   .then((data) => {
      setUI(data);
      calculate(data);
   });
}


const setUI = (data) => {

   for(let i=0; i<Object.keys(data.rates).length; i++){
      
      let option = document.createElement('option');
      option.value = Object.keys(data.rates)[i];
      option.text = Object.keys(data.rates)[i];

      let clone = option.cloneNode(true); // klonladık

      
      currencyFrom.appendChild(option);
      currencyTo.appendChild(clone);
   }
}

let resultForm = document.querySelector('.result-from');
let resultTo = document.querySelector('.result-to');
const input = document.querySelector('#amount');

let fromCurrency = document.getElementById('fromCurrency');
fromCurrency.addEventListener('change', () => {
   let cur = fromCurrency.options[fromCurrency.selectedIndex].value;
   getRequestApi2(cur);

   if(input.value == ''){
      resultForm.innerHTML = '1 ' + cur;
   }else {
      resultForm.innerHTML = input.value + ' ' + cur;
   }

   let cur2 = toCurrency.options[toCurrency.selectedIndex].value;
   resultTo.innerHTML = '? ' + cur2;
});

let toCurrency = document.getElementById('toCurrency');
toCurrency.addEventListener('change', () => {
   let cur = toCurrency.options[toCurrency.selectedIndex].value;

   resultTo.innerHTML = '? ' + cur;
});

let valid = false;
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
   let reBase = fromCurrency.options[fromCurrency.selectedIndex].value;
   let outcome = toCurrency.options[toCurrency.selectedIndex].value;

   if(outcome != ''){
      valid = true;
      if(reBase == ''){
         getRequestApi2('USD');
      }else {
         getRequestApi2(reBase);
      }
   }

});

function calculate(data){
   
   if(valid){
      let index1 = Object.keys(data.rates).indexOf(fromCurrency.options[fromCurrency.selectedIndex].value);
      let index2 = Object.keys(data.rates).indexOf(toCurrency.options[toCurrency.selectedIndex].value);
      let amount = input.value;
      let result = 0;

      console.log('index1 ' + index1);
      console.log('index2 ' + index2);
      console.log(Object.keys(data.rates)[toCurrency.selectedIndex]);

      if(index2 == -1){
         if(amount == ''){
            result = 1;
         }else {
            result = amount;
         }
      }else {
         if(amount == ''){
            result = Object.values(data.rates)[index2] * 1;
         }else {
            result = Object.values(data.rates)[index2] * Number(amount);
         }
      }

      draw(result);
   }
   
   console.log(data);
   console.log(Object.values(data.rates));
   console.log(Object.keys(data.rates));
}

function draw(result){
   let cur = toCurrency.options[toCurrency.selectedIndex].value;
   resultTo.innerHTML = result + ' ' + cur;

   let cur2 = fromCurrency.options[fromCurrency.selectedIndex].value;
   if(input.value == '' && cur2 != ''){
      resultForm.innerHTML = '1 ' + cur2;
   }else {
      if(fromCurrency.selectedIndex == 0){
         resultForm.innerHTML = input.value + ' USD ';
      }else {
         resultForm.innerHTML = input.value + ' ' + cur2;
      }
      
   }
}

// const icon = document.querySelector('.icon i');
// icon.addEventListener('click', () => {

//    let reBase = fromCurrency.options[fromCurrency.selectedIndex].value;
//    console.log("rebase  => " + reBase);
//    let outcome = toCurrency.options[toCurrency.selectedIndex].value;
//    console.log("outcome  => " + outcome);

//    if(reBase == '' && outcome != ''){
//       console.log('111');
//       temp = 'USD';
//       fromCurrency.value = toCurrency.value;
//       toCurrency.value = temp;
//    }else if(fromCurrency != ''){
//       if(toCurrency.value != ''){
//          console.log('222');
//          let temp = fromCurrency.value;
//          fromCurrency.value = toCurrency.value;
//          toCurrency.value = temp;
//       }
//    }

//    if(outcome != '' && reBase != ''){
//       valid = true;
//       getRequestApi2(reBase);
//    }else if(outcome != '' && reBase == ''){
//       valid = true;
//       getRequestApi2(outcome);
//    }

   
// });