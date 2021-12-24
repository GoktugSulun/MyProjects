const getRandomLower = () => {
    // a=97 & z=122
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getRandomUpper = () => {
    // A=65 && Z=90
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

const getRandomSymbol = () => {
    const symbols = '!@#$%&*';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunctions = {getRandomLower, getRandomUpper, getRandomNumber, getRandomSymbol};

const createRandomPassord = () => {
    let len = 16;
    let password = '';
    for(let i=0; i<len; i++){
        password += Object.values(randomFunctions)[Math.floor(Math.random() * 4)]();
    }
    return password;
}

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    input.value = createRandomPassord();
});

const icon = document.querySelector('#icon');
icon.addEventListener('click', () => {
    const password = input.value;
    if(!password){
        return
    }

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    console.log('Parola kopyalandı.');
});