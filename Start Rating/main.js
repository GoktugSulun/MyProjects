// capture HTML elements
const emojis = ['&#x1F601', '&#x1F642', '&#x1F975'],
      levels = ["best", "good", "bad"],
      stars = document.querySelectorAll('.stars i'),
      levelEl = document.querySelector('.level'),
      emojiEl = document.querySelector('.emoji');

// DOM Manipulation
stars.forEach(star => {
   star.addEventListener('click', (event) => {
      let id = event.target.dataset.number, 
         emojiAndLevel = getEmojiAndLevel(id),
         emoji = emojiAndLevel.split('-')[0],
         level = emojiAndLevel.split('-')[1];
      
      console.log(id);

      emojiEl.classList.remove('animate');
      levelEl.classList.remove('slide');

      for(let i=0; i<stars.length; i++){
         stars[i].removeAttribute('class');
      }

      setTimeout(() => {
         emojiEl.classList.add('animate');
         levelEl.classList.add('slide');  
         emojiEl.innerHTML = emoji;
         levelEl.innerHTML = level;

         for(let i=0; i<id; i++){
            stars[i].setAttribute('class', 'fas fa-star grow');
         }

         for(let i=id; id<stars.length; i++){
            stars[i].setAttribute('class', 'far fa-star');
         }
      }, 30);


   });
});

// decide which emoji and level should be displayed
function getEmojiAndLevel(id){
   let emoji = null;
   let level = null;

   if(id == 1 || id == 2){
      emoji = emojis[2];
      level = levels[2];
   }else if(id == 3 || id == 4){
      emoji = emojis[1];
      level = levels[1];
   }else {
      emoji = emojis[0];
      level = levels[0];
   }

   return emoji + "-" + level;
}