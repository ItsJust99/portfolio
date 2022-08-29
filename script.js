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





