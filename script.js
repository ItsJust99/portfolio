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
//link active work
const linkWork = document.querySelectorAll('.work__item')
function activeWork(){
  linkWork.forEach(l=> l.classList.remove('active-work'))
  this.classList.add('active-work')
}
linkWork.forEach(l=>addEventListener("click", activeWork))
//popup projecten
document.addEventListener("click", (e) =>{
  if(e.target.classList.contains("work__button")){
    togglePortfolioPopup();
  }
})

function togglePortfolioPopup(){
  document.querySelector(".portfolio__popup").classList.toggle("open");
}
