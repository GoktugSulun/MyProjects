const wrapper = document.querySelector('.wrapper'),
   inputPart = document.querySelector('.input-part'),
   infoTxt = document.querySelector('.info-txt'),
   inputField = document.querySelector('input'),
   locationBtn = document.querySelector('button'),
   back = document.querySelector('#back');

const apiKey = '5fbdbcc92bef7d9e3fe64158ebe46d86';

let api;

inputField.addEventListener('keyup', e => {
   if(e.key == 'Enter' && inputField.value != ''){
      requestApi(inputField.value);
   }
});

locationBtn.addEventListener('click', () => {
   if(navigator.geolocation){ // if browser support geolocation api
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
   }else {
      alert('Your browser not support geolocation api');
   }
});

function onSuccess(position){
   const {latitude, longitude} = position.coords;
   // console.log(latitude); => direkt yakalamış
   // console.log(longitude); => direkt yakalamış
   api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
   fetchData();
}

function onError(error){
   infoTxt.innerText = error.message;
   infoTxt.classList.add('error');
}

function requestApi(city){
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
   fetchData();
}

function fetchData(){
   infoTxt.innerText = 'Getting weather details...';
   infoTxt.classList.add('pending');
   
   fetch(api)
      .then(response => response.json())
      .then(result => weatherDetails(result));
}

function weatherDetails(info){
   if(info.cod == '404'){
      infoTxt.classList.replace('pending', 'error');
      infoTxt.innerText = `'${inputField.value}' isn't a valid city name`;
      inputField.value = '';
   }else {
      inputField.value = '';
      // let's get required proporties value from the info object
      const city = info.name;
      const country = info.sys.country;
      const {description, id, main} = info.weather[0];
      const {feels_like, humidity, temp} = info.main;

      // let's pass these values to a particular html element
      wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
      wrapper.querySelector('.weather').innerText = description;
      wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
      wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
      wrapper.querySelector('.humidity span').innerText = `${Math.floor(humidity)}%`;

      // 
      console.log(main);
      switch (main) {
         case 'Clouds':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/cloud.svg';
            break;
         
         case 'Clear':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/clear.svg';
            break;

         case 'Rain':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/rain.svg';
            break;

         case 'Snow':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/snow.svg';
            break;
         
         case 'Thunderstorm':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/storm.svg';
            break;

         case 'Haze':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/haze.svg';
            break;
         
         case 'Mist':
            wrapper.querySelector('.weather-part img').src = 'Weather Icons/haze.svg';
            break;
      
         default:
            break;
      }

      infoTxt.classList.remove('pending', 'error');
      wrapper.classList.add('active');

      console.log(info);
   }
  
}

back.addEventListener('click', () => {
   wrapper.classList.remove('active');
});