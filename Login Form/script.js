const lblName = document.querySelector('.lblName');
const lblPassword = document.querySelector('.lblPassword');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const form = document.querySelector('.container');

const information = ['goktug', '123456'];

class Person {
    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }
}

userName.addEventListener('focus', function(){
    lblName.setAttribute('class', 'lblName2');
});

userName.addEventListener('focusout', function(){
    if(userName.value == ''){
        lblName.setAttribute('class', 'lblName');
    }
});

password.addEventListener('focus', function(){
    lblPassword.setAttribute('class', 'lblPassword2');
});

password.addEventListener('focusout', function(){
    if(password.value == ''){
        lblPassword.setAttribute('class', 'lblPassword');
    }
});

form.addEventListener('submit', function(){
    const person = new Person(userName.value, password.value);
    if(person.userName == information[0] 
        && person.password == information[1]){
        alert('succesfful');
    }else {
        alert('do not match! try again');
    }
});
