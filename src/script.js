
// VARIABLES 
const aboutBtn = document.getElementById('aboutBtn')
const body = document.getElementsByTagName('body')
// console.log(body)
const cartBtn = document.querySelector('#cartBtn')
// console.log(cartBtn)
const aboutForm = document.querySelector('#aboutForm')
const popup = document.getElementById("aboutPopUp");
const btnContainer = document.querySelector('#button-container')
let welcomeSpan = document.querySelector(".welcome")
const experienceSpan = document.querySelector('.gradient-text')
const clueList = document.querySelector('#clue-list')
const ps5Button = document.querySelector('#ps5-button')
// let notButton = document.querySelector('.notButton')

const userUrl = "http://localhost:3000/users"
const clueUrl = "http://localhost:3000/clues"
const cartUrl = "http://localhost:3000/carts"


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

function postCart(clueId, userId){
  fetch(cartUrl, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_id: userId, clue_id: clueId})
  })
  .then(response => response.json())
    .then(cartUserId)
  }

  function getUserCart(userId){
    fetch(`${userUrl}/${userId}`)
    .then(res => res.json())
    .then(parseClues)
  }


  // Make fetch(localhost:300/users/id)
  // .then(res => res.json())
   // .then(parseClues)

   // 3 Functions (fetch, handle, read)


//**********Event Listeners **********//

cartBtn.addEventListener('click', openNav)
aboutBtn.addEventListener('click', handleAboutBtn)
aboutForm.addEventListener('submit', handleUserSubmit)
experienceSpan.addEventListener('click', experiencesClue)
// notButton.addEventListener('click', notClue)




//*********Logic *******//
let userId; 


  

function welcomeUser(user){
    const userName = user.name
    const userSpan = document.createElement('span')
    userSpan.dataset.id = user.id
    userSpan.setAttribute("class", "welcome")
    userSpan.innerText = `Welcome ${userName}`
    btnContainer.prepend(userSpan)
    // console.log(userSpan)
    userId = user.id
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
          // console.log(clue.id)
          experienceSpan.dataset.id = clue.id
          // experiencesClue(clue)
            
        }
        else if (clue.id == 6){
            ps5Button.setAttribute("class","notButton")
            ps5Button.dataset.id = clue.id
            notClue(clue)
        }
        else if (clue.id == 7){
            thingsClue(clue)
        }
    })
}

function cartUserId(cartObj){
  const userId = parseInt(cartObj.user.id)
  // console.log(userId)
  getUserCart(userId)
}

function parseClues(userData){
  const clueArray = userData.user_clues
  // console.log(clueArray)
  clueArray.forEach(clue => {
    addToCart(clue)
  })
}

function addToCart(clue){
  const clueLi = document.createElement('li')
  const clueImgTag = document.createElement('img')
  const cluePTag = document.createElement('p')
  cluePTag.innerText = `${clue.id}. ${clue.word}`
  clueImgTag.src = clue.image
  clueLi.append(cluePTag, clueImgTag)
  clueList.append(clueLi)
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

function experiencesClue(e){
  // console.log(e.target)
  const clueId = parseInt(e.target.dataset.id)
  // console.log(welcomeSpan)
  // const userId = welcomeSpan.dataset.id
  postCart(clueId, userId)
  // console.log(e.target.dataset.id)

  
//     console.log(clue)
//     pText = p.innerText
//     const pAry = pText.split(" ")
//     const experiencesString = pAry[3]
//    console.log(experiencesString)
//    experiencesString.setAttribute("class", "gradient-text")
  // getUserCart(userId)

}

function notClue(clue){
  let notButton = document.querySelector('.notButton')
  notButton.addEventListener('click', handleNotClue)
  // console.log(e) 

}

function handleNotClue(e){
  console.log(e)
  const ps5Desc = document.querySelector('#ps5-desc')
  ps5Desc.innerHTML = `Do <u><strong><span id="notSpan">NOT</span></strong></u> buy this!!!`
  const notSpan = document.querySelector('#notSpan')
  notSpan.dataset.id = parseInt(e.target.dataset.id)
  notSpan.addEventListener('click', handleNotSpan)
  
}

function handleNotSpan(e){ 
  console.log(e)
  const clueId = e.target.dataset.id
  postCart(clueId, userId) 
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
  

  // function handleExperience(e){
  //   console.log(e)
    
  // }

  // POST REQUEST  
  // arguments (user.id, clue.id)











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
