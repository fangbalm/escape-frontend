
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
const clueList = document.querySelector('#clue-list')
const ps5Button = document.querySelector('#ps5-button')
const lionDiv = document.querySelector('#lionking')
const lionImg = document.querySelector('.fake-life-img')
const crosswordDiv = document.querySelector('#crossword')
const crosswordBtn = document.querySelector('#crossword-btn')
const fillDiv =document.querySelector('#fill')
const formDiv = document.querySelector('#form')
const withDiv = document.querySelector('#with')
const reviewForm = document.querySelector(".review-form")

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

  function postReview(review){
    fetch("http://localhost:3000/reviews", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: review})
      })
      .then(response => response.json())
        .then(makeUserReview)
      }

    function userReviewPost(reviewId, userId){
        fetch("http://localhost:3000/userReviews", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId, review_id: reviewId})
      })
      .then(response => response.json())
        .then(getReviews)
      }

      function fetchAllReviews(){
        fetch("http://localhost:3000/reviews")
        .then(res => res.json())
        .then(parseReviews)
      }
    
  
function getReviews(){
    fetchAllReviews()
}

function updateReview(reviewId, reviewComment){
    fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "PATCH", 
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({comment: reviewComment, review_id: reviewId})
      })
      .then(response => response.json())
        .then(displayUpdatedReview)
      }

function deleteReview(reviewId){
    fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "DELETE", 
    })
    .then(response => response.json())
    .then(DeleteMessage)
    }
  // Make fetch(localhost:300/users/id)
  // .then(res => res.json())
   // .then(parseClues)

   // 3 Functions (fetch, handle, read)


//**********Event Listeners **********//

cartBtn.addEventListener('click', openNav)
aboutBtn.addEventListener('click', handleAboutBtn)
aboutForm.addEventListener('submit', handleUserSubmit)
reviewForm.addEventListener('submit', handleReviewForm)

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
    clues.forEach(clue => {
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
            
            const switchDiv = document.querySelector('#switch')
            const switchImg = switchDiv.querySelector("#switch-img")
            switchImg.remove()
            switchDiv.id += " js-container"
            switchDiv.className += " container"
            const canvasDiv = document.querySelector('.canvas')
            canvasDiv.id = ""
            canvasDiv.id = "js-canvas"
            const yourSpan = document.querySelector('#your-clue') 
            yourSpan.dataset.id = clue.id
            const yourImg = document.createElement('img')
            yourImg.src = clue.image
            yourImg.setAttribute("class", "your-img")
            yourImg.style = "visibility: hidden"
            const clueP = document.createElement('p')
            clueP.innerText ="It belongs to you. click the correct word int the description"
            switchDiv.append(yourImg, clueP)
            yourClue()
            yourSpan.addEventListener('click', handleYourClick)
            

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
            
            const br = document.createElement('br')
            const withImg = document.createElement('img')
            withImg.src = "with.jpg"
            withImg.id="drag1"
            withImg.draggable ="true" 
            
            withDiv.append(br,withImg)
            const danceImg = document.querySelector('.dancing')
            danceImg.src = "Dancing-the-Stars.jpeg"
            danceImg.dataset.id = clue.id
            withImg.addEventListener('dragstart', drag);
            // withDiv.addEventListener('dragover', allowDrop(ev));
            // withDiv.addEventListener('drop', drop(ev));
            
            // withClue(clue)
        }
        else if (clue.id == 5){
          // console.log(clue.id)
          const expSpan = document.querySelector('#experiences-span')
          expSpan.className = "gradient-text"
          expSpan.addEventListener('click', experiencesClue)
          expSpan.dataset.id = clue.id
          // experiencesClue(clue)
            
        }
        else if (clue.id == 6){
            ps5Button.setAttribute("class","notButton")
            ps5Button.dataset.id = clue.id
            notClue(clue)
        }
        else if (clue.id == 7){
            const thingImg = document.querySelector('.things')
            thingImg.src = clue.image
            thingImg.alt = "things"
            const thingform = document.querySelector('.things-form')
            thingform.dataset.id = clue.id
            let thingsInput = document.createElement('input')
            thingsInput.type = "text"
            thingsInput.value = ""
            let thingsSubmit = document.createElement('input')
            thingsSubmit.setAttribute("type", "submit")
            thingform.append(thingsInput,thingsSubmit)
            thingsClue()
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
    checkForWinner()
}

function checkForWinner(){
    if (clueList.getElementsByTagName('li').length == 7){
        cartComplete()
   }
}

function cartComplete(){
    const winnerForm = document.querySelector(".cart-complete")
    winnerForm.id ="myBtn"
    let winnerInput = document.createElement('input')
      winnerInput.type = "text"
      winnerInput.value = ""
      let winnersubmit = document.createElement('input')
      winnersubmit.setAttribute("type", "submit")
      winnerForm.append(winnerInput, winnersubmit)
      winnerForm.addEventListener('submit', winnerFormEvent)
      
}


const modal = document.getElementById("myModal");
function winnerFormEvent(e){
   e.preventDefault()
   const answer = e.target[0].value.toLowerCase()
   if (answer == "fill your life with experiences not things"){
        modal.style.display = "block";
   }
   else {
       alert("Try Again")
   }
}

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
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
    let mervImg = document.querySelector('.merv')
    mervImg.id = "hidden-merv"
    window.scroll(0,0)
    // console.log(clueForm.dataset.id)

    if(formDiv.innerHTML == ""){
      const clueForm = document.createElement('form')
      clueForm.className = "fill-form"
      clueForm.dataset.id = parseInt(e.target.dataset.id)
      let fillInput = document.createElement('input')
      fillInput.type = "text"
      fillInput.value = ""
      fillInput.name = "word"
      let fillsubmit = document.createElement('input')
      fillsubmit.setAttribute("type", "submit")
      clueForm.append(fillInput, fillsubmit)
      formDiv.append(clueForm)
      fillForm()
  }
  
   
}

function fillForm(){
  const clueForm = document.querySelector('#form')
  
  clueForm.addEventListener("submit", handleFillSubmit)
}

function handleFillSubmit(e){
  e.preventDefault()
  const clueId = parseInt(e.target.dataset.id)
  const clueForm = document.querySelector('#form')
  if(e.target[0].value == "fill" || "Fill"){ 
    postCart(clueId, userId)
    clueForm.remove()
  } else {
    alert("Wrong word!")
  }
  
}

function yourClue(){


  
    'use strict';
    
    var isDrawing, lastPoint;
    var container    = document.getElementById('js-container'),
        canvas       = document.getElementById('js-canvas'),
        canvasWidth  = canvas.width,
        canvasHeight = canvas.height,
        ctx          = canvas.getContext('2d'),
        image        = new Image(),
        brush        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image.src = "switch.jpg"
    

  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    // Show the form when Image is loaded.
    document.querySelectorAll('.your-img')[0].style.visibility = 'visible';
  };
  brush.src = 'data:image/png;base64,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';
  
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('touchstart', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('touchmove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
  canvas.addEventListener('touchend', handleMouseUp, false);
  
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  
  function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  
  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }
    
    var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
        pdata    = pixels.data,
        l        = pdata.length,
        total    = (l / stride),
        count    = 0;
    
    // Iterate over all pixels
    for(var i = count = 0; i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }
    
    return Math.round((count / total) * 100);
  }
  
  function getMouse(e, canvas) {
    var offsetX = 0, offsetY = 0, mx, my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      } while ((canvas = canvas.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return {x: mx, y: my};
  }
  
  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + '%');
    if (filledInPixels > 50) {
      canvas.parentNode.removeChild(canvas);
    }
  }
  
  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
  }

  function handleMouseMove(e) {
    if (!isDrawing) { return; }
    
    e.preventDefault();

    var currentPoint = getMouse(e, canvas),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x, y;
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 25;
      y = lastPoint.y + (Math.cos(angle) * i) - 25;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(brush, x, y);
    }
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
  
  };


  function handleYourClick(e){
    const clueId = e.target.dataset.id
    postCart(clueId, userId)
  }





function lifeClue(e){
    const hiddenlion = e.target
    
    hiddenlion.id= "hidden-lion"
    // e.target.remove()

}
function lifeClueOut(e){
    const hiddenlion = e.target
    hiddenlion.id= ""
}

function lifeClueClick(){
    const lifeImgClick = document.querySelector(".life-img")

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
  
  const clueId = e.target.dataset.id
  postCart(clueId, userId) 
}

function thingsClue(){
    const thingform = document.querySelector('.things-form')
    thingform.addEventListener('submit', handleThingSubmit)

}
function handleThingSubmit(e){
    e.preventDefault()
    const clueId = e.target.dataset.id
    if(e.target[0].value == "things" || "Things"){ 
        postCart(clueId, userId)
        e.target.remove()
      } else {
        alert("Wrong word!")
      }
}




function handleUserSubmit(e){
  e.preventDefault()
  let nameInput = e.target.name.value
  createUser(nameInput)
  e.target.reset()
  popup.classList.remove("show");
  aboutBtn.classList.add("hide");
  openNav(e)
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
  

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    const clueId = parseInt(ev.target.dataset.id )
    const danceImg = document.querySelector('.dancing')
    danceImg.src = "https://images-na.ssl-images-amazon.com/images/I/51VXeLW4kxL._SY445_.jpg"

    postCart(clueId, userId)
  }

  function handleReviewForm(e){
    e.preventDefault()
    const review = e.target[0].value
    postReview(review)
    e.target.remove()
  }
  function displayUpdatedReview(review){
    const reviewP = document.querySelector('#user-review')
    reviewP.innerText = review.comment
  }

  function DeleteMessage(){
    const updateForm = document.querySelector('#update-review')
    updateForm.remove()
    const reviewP = document.querySelector('#user-review')
    reviewP.innerText = "Your Review has been Deleted. Have a nice Day!"
  }

  function makeUserReview(review){
    const reviewDiv = document.querySelector('#review-div')
    const reviewP = document.querySelector('#user-review')
    reviewP.innerText = review.comment
    const update = document.createElement('button')
    update.type ="buttom"
    update.class = "update"
    update.dataset.id = review.id
    update.innerText = "Update Review"
    const deleteReview = document.createElement('button')
    deleteReview.type ="buttom"
    deleteReview.class = "delete"
    deleteReview.dataset.id = review.id
    deleteReview.innerText = "Delete Review"
    reviewDiv.append(update, deleteReview)
    updateListener()

    const reviewId = parseInt(review.id)
    userReviewPost(reviewId, userId)
  }

  function updateListener(){
    const reviewDiv = document.querySelector('#review-div')
    reviewDiv.addEventListener('click', reviewClick)
  }

  function reviewClick(e){
      
    const reviewId = parseInt(e.target.dataset.id)
    console.log(reviewId)
    const updateForm = document.querySelector('#update-review')
    if (e.target.class === "update"){
        updateForm.dataset.id = reviewId
        let updateReview = document.createElement('input')
        updateReview.type = "text"
        updateReview.value = ""
        let updateReviewSubmit = document.createElement('input')
        updateReviewSubmit.setAttribute("type", "submit")
        updateForm.append(updateReview, updateReviewSubmit)
        UpdateSubmitListener()
    }
    else if (e.target.class === "delete"){
        deleteReview(reviewId)
    }
  }

  function UpdateSubmitListener(){
    const updateForm = document.querySelector('#update-review')
    updateForm.addEventListener('submit', UpdateSubmit)
  }
  
  function UpdateSubmit(e){
      e.preventDefault()
      console.log(e)
      const reviewId = parseInt(e.target.dataset.id)
      const reviewComment = e.target[0].value
      updateReview(reviewId, reviewComment)

  }

  function parseReviews(reviews){
        reviews.forEach(displayReviews)
  }

function displayReviews(review){
    const reviewUl = document.querySelector('#past-reviews')
    const reviewLi = document.createElement('li')
    reviewLi.innerText = review.comment
    reviewUl.append(reviewLi)
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
