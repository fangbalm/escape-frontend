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
  