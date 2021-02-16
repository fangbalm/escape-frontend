
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
const lionDiv = document.querySelector('#lionking')
const lionImg = document.querySelector('.fake-life-img')
const crosswordDiv = document.querySelector('#crossword')
const crosswordBtn = document.querySelector('#crossword-btn')
const fillDiv =document.querySelector('#fill')
const formDiv = document.querySelector('#form')
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

// lionImg.addEventListener("mouseout",lifeClueOut)



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
            // const fillImg = document.createElement('img')
            // fillImg.src = clue.image
            // fillImg.setAttribute("class", "fill-img")
            // crosswordDiv.append(fillImg)

            crosswordBtn.setAttribute("class","fillButton")
            crosswordBtn.dataset.id = clue.id
            
            fillClue(clue)
        }
        else if (clue.id == 2){
            yourClue(clue)
        }
        else if (clue.id == 3){
            const lifeImg = document.createElement('img')
            lifeImg.src = clue.image
            lifeImg.setAttribute("class", "life-img")
            lifeImg.dataset.id = clue.id
            lionDiv.append(lifeImg)
            lionImg.addEventListener("mousemove",lifeClue)
            lifeClueClick()
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
  while (clueList.firstChild){
    clueList.lastChild.remove()
}
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
    const fillImg = document.createElement('img')
    fillImg.src = clue.image
    fillImg.setAttribute("class", "fill-img")
    fillDiv.append(fillImg)
    let fillButton = document.querySelector('.fillButton')
    fillButton.addEventListener('click', handleFillClue)
//     let p = new Peel('#constraint');
//     p.addPeelConstraint(Peel.Corners.BOTTOM_LEFT);
//     p.handleDrag(function(evt, x, y) {
//     this.setPeelPosition(x, y);
// });
    
}

function handleFillClue(e){
    alert("_______ in the Blank")
    const mervImg = document.querySelector('.merv')
    mervImg.id = "hidden-merv"
    const clueForm = document.createElement('form')
    clueForm.dataset.id = parseInt(e.target.dataset.id)
    const fillInput = document.createElement('input')
    fillInput.type = "text"
    fillInput.value = ""
    const inTheBlank = document.createElement('label')
    inTheBlank.innertext = " in the Blank"
    const fillsubmit = document.createElement('input')
    fillsubmit.setAttribute("type", "submit")


    clueForm.append(fillInput,inTheBlank,fillsubmit)
    formDiv.append(clueForm)
    
    fillButton.disable = true

    console.log(e)
}

function yourClue(){

}

function lifeClue(e){
    const hiddenlion = e.target
    
    hiddenlion.id= "hidden-lion"
    // e.target.remove()

}
function lifeClueOut(e){
    const hiddenlion = e.target
    console.log(hiddenlion)
    hiddenlion.id= ""
}

function lifeClueClick(){
    const lifeImgClick = document.querySelector(".life-img")
    console.log(lifeImgClick)
    lifeImgClick.addEventListener('click', function(e) {
        const clueId = e.target.dataset.id
        postCart(clueId, userId)
    })
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
