const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

const checkInputs = () => {
    //get values from inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === ''){
        //show error
        setErrorFor(username, 'Username cannot be blank');
    }else{
        //add success class
        setSuccessFor(username);
    }

    if(emailValue === ''){
        //show error
        setErrorFor(email, 'Email cannot be blank');
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email not valid');
    }else{
        //add success class
        setSuccessFor(email);
    }

    if(passwordValue === ''){
        //show error
        setErrorFor(password, 'Password cannot be blank');
    }else if(!isPassword(passwordValue)){
        setErrorFor(password, 'Your password doesn\'t meet the requirements');
    }else{
        //add success class
        setSuccessFor(password);
    }

    if(password2Value === ''){
        //show error
        setErrorFor(password2, 'Password cannot be blank');
    }else if(passwordValue !== password2Value){
        setErrorFor(password2, 'Passwords dont match');
    }else{
        //add success class
        setSuccessFor(password2);
    }

    //show success message
    if(username.parentElement.classList.contains('success') &&
    email.parentElement.classList.contains('success') &&
    password.parentElement.classList.contains('success') &&
    password2.parentElement.classList.contains('success')){
        const button = document.querySelector('button');
        
        button.innerText = 'Loading';
        button.classList.add('loading')

        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('success');
            button.innerText = 'Submitted with success!';
            setTimeout(() => {
                button.classList.remove('success');

                button.innerText = 'Submit';

                username.parentElement.classList.remove('success');
                email.parentElement.classList.remove('success');
                password.parentElement.classList.remove('success');
                password2.parentElement.classList.remove('success');

                form.reset();
            }, 2000);
        }, 2000);
    }
}

const setErrorFor = (input, msg) => {
   const formControl = input.parentElement;
   const small = formControl.querySelector('small');

   //add error
   small.innerText = msg;

   //add error class
   formControl.classList.add('error')
}

const setSuccessFor = (input) => {
   const formControl = input.parentElement; 

   //add error class
   formControl.classList.remove('error')
   formControl.classList.add('success')
}

const isEmail = (email) => {
     return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

const isPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(password)
}
