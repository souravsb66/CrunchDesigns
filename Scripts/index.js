// localStorage.setItem("isLoggedIn", true);
let logInStatus = localStorage.getItem("isLoggedIn");

let userData = JSON.parse(localStorage.getItem("user-data")) || [];
// console.log(userData);

let navBtn = document.querySelector("#nav-btn");
let profileDiv = document.querySelector("#profile-div");
let profileHover = document.querySelector("#profile-hover-div");

let profileName = document.querySelector("#profile-name");
profileName.innerText = userData[0].name;

let profileNameHover = document.querySelector("#profile-name-hover");
profileNameHover.innerText = userData[0].name;

let signoutBtn = document.querySelector("#signout-btn");

if(logInStatus === "true") {
    navBtn.style.display = "none"
    profileDiv.style.display = "flex";
}

let crunchCount = Number(localStorage.getItem("crunch-count")) || 0;
document.querySelector("#crunch-number").innerText = crunchCount;
localStorage.setItem("crunch-count", (crunchCount+1));



profileDiv.addEventListener("mouseenter", () => {
    profileHover.style.visibility = "visible";
})
profileHover.addEventListener("mouseleave", () => {
    profileHover.style.visibility = "hidden"
})

signoutBtn.addEventListener("click", () => {
    
    localStorage.setItem("isLoggedIn", false);
    window.location.reload();
})