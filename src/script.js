
// VARIABLES 
const aboutBtn = document.getElementById('aboutBtn')
const body = document.getElementsByTagName('body')
// console.log(body)
const cartBtn = document.querySelector('#cartBtn')
// console.log(cartBtn)
const aboutForm = document.querySelector('#aboutForm')
const popup = document.getElementById("aboutPopUp");

const userUrl = "http://localhost:3000/users"


// ************** FETCH FUNCTIONS *****************
function createUser(nameInput){
  fetch(userUrl, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: nameInput})
  })
    .then(response => response.json())
    .then(console.log)
  
  }

//**********Event Listeners **********//

cartBtn.addEventListener('click', openNav)
aboutBtn.addEventListener('click', handleAboutBtn)
aboutForm.addEventListener('submit', handleUserSubmit)




//*********Logic *******//
// function welcomeUser(e){

// }

function handleUserSubmit(e){
  e.preventDefault()
  let nameInput = e.target.name.value
  createUser(nameInput)
  e.target.reset()
  popup.classList.remove("show");
  aboutBtn.classList.add("hide");
}

function handleAboutBtn(e){
  console.log(e)
  popup.classList.add("show");
}



function openNav(e) {
    
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }
  
  function getUser(){
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(console.log)
  }
  // Invoking Function
  getUser()

  

  
  /**** TEST FUNCTION FOR RANDOMIZED COLOR ON BUTTON CLICK */

  // https://stackoverflow.com/questions/29356866/change-color-of-the-text-on-click-to-random-color-button

  // function randomize() {
  //   document.getElementById('aboutBtn').style.color = randomColors();
  // }

  // function randomColors() {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // } 
