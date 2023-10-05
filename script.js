// class "loader hidden"
window.addEventListener("load", function () { 
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; 
}); 

//progressbar
let progress = document.getElementById('progressbar');
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + "%";
}

//mixitup projecten
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
      target: '.work__card'
  },
  animation: {
      duration: 300
  }
});

//cookie popup

// let popUp = document.getElementById("cookiePopup");
// document.getElementById("acceptCookie");
// addEventListener("click", () => {
//     let d = new Date();
//     d.setMinutes(2 + d.getMinutes());
//     document.cookie = "myCookieName=thisIsMyCookie";
//     expires =  + d + ";";
//     popUp.classList.add("hide");
//     popUp.classList.remove("show");
// });



