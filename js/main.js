document.addEventListener('DOMContentLoaded',()=>{


// DOM elements needed
const input_company = document.querySelector('#company')
const input_email = document.querySelector('#email')
const button= document.querySelector('.active_button')
const form =document.querySelector('#form')
const loading_element = document.querySelector("#loading")
const success_element = document.querySelector('#success')
// inputs object
const inputs= {
    company: "",
    email: ""
}

// events

input_company.addEventListener('blur',verified_inputs)
input_email.addEventListener('blur',verified_inputs)
button.addEventListener('click', button_enable)
form.addEventListener('submit',sendEmail )

// Send email


function sendEmail (e) {
    e.preventDefault() 
    loading_element.classList.add('lds-dual-ring')
    success_element.classList.add('success_active')
  setTimeout(() => {
    loading_element.classList.remove('lds-dual-ring')
    success_element.classList.remove('success_active')
    
    inputs.company= ''
    inputs.email=''
    form.reset()
 button_enable ()

  }, 3000);

    


   }

// inputs verifications

function verified_inputs(e){

    const position = e.target.parentElement
    
    if(e.target.value.trim() === ''){
        const message = "Campo Obligatorio"
        error (message, position)
        inputs[e.target.name]=''
        button_enable ()
        return

    }



   if(e.target.id === 'email' && !email_verification(e.target.value)){

    const message_email ="Email Incorrecto"
   
    error (message_email, position)
   
    inputs[e.target.name]=''
    button_enable ()
    return 
   } 
  
   remove_error (position)

   inputs[e.target.name] = e.target.value.trim().toLowerCase()
   button_enable ()

    console.log(inputs)
   
}


// create message error

function error (message, position){

   remove_error (position)
   const error = document.createElement('P')
   error.textContent= message
   error.classList.add("error_active", "alert")
   position.appendChild(error)

}


// remove message error

function remove_error (position){

const alert = position.querySelector('.alert')

if(alert){
    alert.remove()
}


}

// email validation with regular expression

function email_verification(id){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
     const email_test = regex.test(id)
  
     return email_test

}

// Enable or DIsable button

function button_enable (){

if(Object.values(inputs).includes('')){
    button.classList.add('inactive_button')
    button.disabled= true
    return
}    

button.classList.remove('inactive_button')
button.disabled= false


}




})

