function setMode(mode){
    localStorage.setItem('sitemode', mode); 
    document.documentElement.className = mode;
}

function sitemode(){
    var credit_img = document.getElementById("credit");
    if (localStorage.getItem('sitemode') === 'darkmode') {
        setMode('lightmode');
        credit_img.src = "./Images/credits_light.png";
    } else {
        setMode('darkmode');
        credit_img.src = "./Images/credits_dark.png";
    }
}