const words = ["Developer", "Designer", "Freelancer"]; // list of words
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delay = 500;

function typeWriter() {
    const target = document.getElementById('typewriter');

    if (!isDeleting && j < words[i].length) {
        currentWord += words[i][j];
        j++;
        target.textContent = currentWord;
        setTimeout(typeWriter, typeSpeed);
    } else if (isDeleting && j > 0) {
        currentWord = words[i].substring(0, j - 1);
        j--;
        target.textContent = currentWord;
        setTimeout(typeWriter, deleteSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            i = (i + 1) % words.length;
        }
        setTimeout(typeWriter, delay);
    }
}

document.addEventListener("DOMContentLoaded", typeWriter);

// Form Validation

const form = document.getElementById('myForm');
const name = document.getElementById('name')
const email = document.getElementById('email')
const comment = document.getElementById('message')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputs()) {     
        popupConfirmation();
    }
});

// Error & Success

const setError = (element, message) => {
    const input = element.parentElement;
    const errorDisplay = input.querySelector('.error');

    errorDisplay.innerText = message;
    input.classList.add('error');
    input.classList.remove('success');
}

const setSuccess = (element) => {
    const input = element.parentElement;
    const errorDisplay = input.querySelector('.error');

    errorDisplay.innerText = '';
    input.classList.add('success');
    input.classList.remove('error');
}

const validateInputs = () => {

    let valid = true;

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const commentValue = message.value.trim();


    //for name
    if(nameValue === '') {
        setError(name, 'Name is Required')
        valid = false;
    } else {
        setSuccess(name);
    }


    //for email
    if (emailValue === '') {
        setError(email, 'Email is required');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
        setError(email, 'Provide a valid email');
        valid = false;
    } else {
        setSuccess(email);
    }

    //for comment
    if (commentValue === '') {
        setError(comment, 'Message is required');
        valid = false;
    } else {
        setSuccess(comment);
    }

    return valid;

}