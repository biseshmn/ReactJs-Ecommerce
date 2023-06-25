 //password show hide
 export const showPassword=()=>{
    const passwordInput = document.querySelector('#password')
    const showPasswordBtn = document.querySelector('#showPasswordBtn')
    const passwordIcon = document.querySelector('#passwordIcon')

     if(passwordInput.type === 'password'){
         passwordInput.type = 'text'
         showPasswordBtn.title = 'Hide Password'
         passwordIcon.classList.remove('fa-eye')
         passwordIcon.classList.add('fa-eye-slash')
     }
 
     else{
         passwordInput.type = 'password'
         showPasswordBtn.title = 'Show Password'
         passwordIcon.classList.remove('fa-eye-slash')
         passwordIcon.classList.add('fa-eye')
     }
 }