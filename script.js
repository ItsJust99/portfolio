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
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

document.getElementById("accept-cookies").addEventListener("click", function () {
    // Set a cookie to remember user's choice for 365 days (adjust as needed)
    setCookie("cookiesAccepted", "true", 365);

    // Remove the cookie banner
    document.getElementById("cookie-banner").style.display = "none";
});

// Check if the user has already accepted cookies
if (getCookie("cookiesAccepted") === "true") {
    document.getElementById("cookie-banner").style.display = "none";
}


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



