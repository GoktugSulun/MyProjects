const openCloseBtn = document.querySelector('.openAndClose');
const openCloseIcon = document.getElementById('openCloseIcon');
const cardContent = document.querySelector('.card-content');
const header = document.querySelector('.header');
const contents = document.querySelectorAll('.content');
const card = document.querySelector('.card');
const timeServings = document.querySelector('.time-servings');
const info = document.querySelector('.info');
const save = document.getElementById('save');
const time = document.querySelector('.time');
const servings = document.querySelector('.servings');
const openIngredients = document.querySelector('.openIngredients');
const openPreparation = document.querySelector('.openPreparation');

const contentPrep = document.getElementById('content-prep');
const contentIng = document.getElementById('content-ing');

let isContentOpen;
let isSaved;

window.addEventListener('load', () => {
   isContentOpen = false;
});

openCloseBtn.addEventListener('click', () => {
   cardContent.classList.toggle('openClose');
   header.classList.toggle('close');
   contents.forEach(content => {
      content.classList.toggle('close');
   });
   card.classList.toggle('.cardActive');

   if(isContentOpen){
      openCloseIcon.style.transform = "rotate(0deg)";
      openCloseIcon.style.transition = "transform 600ms";
      isContentOpen = false;
   }else {
      openCloseIcon.style.transform = "rotate(-180deg)";
      openCloseIcon.style.transition = "transform 600ms";
      isContentOpen = true;
   }

   info.classList.toggle('open');
   time.classList.toggle('ball');
   servings.classList.toggle('ball');

});


   openCloseBtn.addEventListener('mouseover', () => {
      if(!isContentOpen){
         card.classList.add('shadow');
      }
   });

   openCloseBtn.addEventListener('mouseout', () => {
       if(!isContentOpen){
         card.classList.remove('shadow');
      }
   });


save.addEventListener('click', () => {
   if(isSaved){
      save.setAttribute('class', 'far fa-bookmark'); 
      isSaved = false;
   }else {
      save.setAttribute('class', 'fas fa-bookmark');  
      isSaved = true;
   }
});

openIngredients.addEventListener('click', () => {
   openIngredients.classList.toggle('activeTitle');
   openPreparation.classList.toggle('activeTitle');

   contentPrep.style.display = "none";
   contentIng.style.display = "block";
});

openPreparation.addEventListener('click', () => {
   openIngredients.classList.toggle('activeTitle');
   openPreparation.classList.toggle('activeTitle');

   contentPrep.style.display = "block";
   contentIng.style.display = "none";
});
