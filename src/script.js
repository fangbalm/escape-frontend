const body = document.getElementsByTagName('body')
console.log(body)

const cartBtn = document.querySelector('#cartBtn')

console.log(cartBtn)



//**********Event Listeners **********//

cartBtn.addEventListener('click', openNav)



//*********Logic *******//

function openNav(e) {
    
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }
  

  /**** TEST FUNCTION FOR RANDOMIZED COLOR ON BUTTON CLICK */

  // https://stackoverflow.com/questions/29356866/change-color-of-the-text-on-click-to-random-color-button

  function randomize() {
    document.getElementById('aboutBtn').style.color = randomColors();
  }

  function randomColors() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }