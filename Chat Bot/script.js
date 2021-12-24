/* Bot and User MessageBox All Attributes */
const botAttributes = {
   div: {
      class: "botMessage d-flex",
   },
   img: {
      class: "align-self-end botImg",
      width: "50",
      height: "50",
      src: "./Img/robot.png",
      alt: "bot message image"
   },
   innerDiv: {
      class: "botMessageBox",
   },
   h6: {
      class: "sendName fw-bold ms-3",
   },
   p: {
      class: "message px-2 text-light m-0",
   }
};

const userAttributes = {
   div: {
      class: "userMessage d-flex",
   },
   img: {
      class: "align-self-end botImg",
      width: "50",
      height: "50",
      src: "./Img/bussiness-man.png",
      alt: "user message image"
   },
   innerDiv: {
      class: "userMessageBox order-first",
   },
   h6: {
      class: "sendName fw-bold ms-3",
   },
   p: {
      class: "message px-2 text-light m-0",
   }
};

const userMessages = [
   "hello", "how are you ?", "I'm fine", "who are you ?", "I'm Emre", "You are so kind!", "yes", "see you later :)"
];

const botMessages = [
   "Hi!", "I am good, what about you ?", "I am glad to hear that 😃", "I am a robot. My name is Goktug, you ?", "Nice to meet you Emre :)", "Are you serious ?", "Thank youuuu", "see youuu"
];

const main = document.querySelector('.main');
const userInput = document.querySelector('.input');
const sendBtn = document.querySelector('#send');
sendBtn.addEventListener('click', sendUserMessage);

userInput.addEventListener('keyup', (event) => {
   if(event.keyCode === 13){
      sendUserMessage();
   }
});

function sendUserMessage(event){

   let userTxt;
   if(userInput.value != ""){
      userTxt = userInput.value; 

      let index = userMessages.indexOf(userTxt);
      createMessage('GOKTUG SULUN', userAttributes, userTxt);
      
      setTimeout(() => {
         if(index === -1){
            createMessage('BOT', botAttributes , "Sorry, I dont understand :/");
         }else {
            createMessage('BOT', botAttributes , botMessages[index]);
         }
      }, 500);
      userInput.value = "";
   }

}

function createMessage(who, attributes, txt){

   // Create Elements
   let div = document.createElement('div');
   let img = document.createElement('img');
   let innerDiv = document.createElement('div');
   let h6 = document.createElement('h6');
   let p = document.createElement('p');

   // Set Attribute to Elements
   div.setAttribute('class', attributes.div.class);
   img.setAttribute('class', attributes.img.class);
   img.width = attributes.img.width;
   img.height = attributes.img.height;
   img.src = attributes.img.src;
   img.alt = attributes.img.alt;
   innerDiv.setAttribute('class', attributes.innerDiv.class);
   h6.setAttribute('class', attributes.h6.class);
   p.setAttribute('class', attributes.p.class);

   // Set InnerContent 
   h6.innerText = who;
   p.innerText = txt;

   // Append to Body
   innerDiv.appendChild(h6);
   innerDiv.appendChild(p);
   div.appendChild(img);
   div.appendChild(innerDiv);
   main.appendChild(div);
   
}

