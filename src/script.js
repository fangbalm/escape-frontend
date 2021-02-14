
// VARIABLES 
const aboutBtn = document.getElementById('aboutBtn')
const body = document.getElementsByTagName('body')
// console.log(body)
const cartBtn = document.querySelector('#cartBtn')
// console.log(cartBtn)
const aboutForm = document.querySelector('#aboutForm')
const popup = document.getElementById("aboutPopUp");
const btnContainer = document.querySelector('#button-container')
const welcomeSpan = document.querySelector(".welcome")
const p = document.querySelector('.clue-five')

const userUrl = "http://localhost:3000/users"
const clueUrl = "http://localhost:3000/clues"


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
    .then(welcomeUser)
  }

//   function clues(clueId){
//     fetch(`${clueUrl}/${clueId}`)
//     .then(response => response.json())
//     .then(console.log)
//   }
  
  function getAllClues(){
    fetch(clueUrl)
    .then(response => response.json())
    .then(displayAllClues)
}

//**********Event Listeners **********//

cartBtn.addEventListener('click', openNav)
aboutBtn.addEventListener('click', handleAboutBtn)
aboutForm.addEventListener('submit', handleUserSubmit)




//*********Logic *******//
function welcomeUser(user){
    const userName = user.name
    const userSpan = document.createElement('span')
    userSpan.dataset.id = user.id
    userSpan.setAttribute("class", "welcome")
    userSpan.innerText = `Welcome ${userName}`
    btnContainer.prepend(userSpan)
    // fillClue()
    getAllClues()
}

function displayAllClues(clues){
    clues.forEach(clue =>{
        if (clue.id == 1){
            fillClue(clue)
        }
        else if (clue.id == 2){
            yourClue(clue)
        }
        else if (clue.id == 3){
            lifeClue(clue)
        }
        else if (clue.id == 4){
            withClue(clue)
        }
        else if (clue.id == 5){
            experiencesClue(clue)
        }
        else if (clue.id == 6){
            notClue(clue)
        }
        else if (clue.id == 7){
            thingsClue(clue)
        }
    })
}


function fillClue(clue){
//     let p = new Peel('#constraint');
//     p.addPeelConstraint(Peel.Corners.BOTTOM_LEFT);
//     p.handleDrag(function(evt, x, y) {
//     this.setPeelPosition(x, y);
// });
    
}

function yourClue(){

}

function lifeClue(){

}

function withClue(){

}

function experiencesClue(clue){
//     console.log(clue)
//     pText = p.innerText
//     const pAry = pText.split(" ")
//     const experiencesString = pAry[3]
//    console.log(experiencesString)
//    experiencesString.setAttribute("class", "gradient-text")


}

function notClue(clue){

}

function thingsClue(clue){

}




function handleUserSubmit(e){
  e.preventDefault()
  let nameInput = e.target.name.value
  createUser(nameInput)
  e.target.reset()
  popup.classList.remove("show");
  aboutBtn.classList.add("hide");
}

function handleAboutBtn(e){
//   console.log(e)
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
  
//   function getUser(){
//     fetch("http://localhost:3000/users")
//     .then(response => response.json())
//     .then(console.log)
//   }
//   // Invoking Function
//   getUser()

  

  
  /**** TEST FUNCTION FOR RANDOMIZED COLOR ON BUTTON CLICK */

  // https://stackoverflow.com/questions/29356866/change-color-of-the-text-on-click-to-random-color-button

  // function randomize() {
  //   document.getElementById('aboutBtn').style.color = randomColors();
  // }

  // function randomColors() {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // } 
