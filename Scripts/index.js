// localStorage.setItem("isLoggedIn", true);
let logInStatus = localStorage.getItem("isLoggedIn");

let userData = JSON.parse(localStorage.getItem("user-data")) || [];
// console.log(userData);

let navBtn = document.querySelector("#nav-btn");
let profileDiv = document.querySelector("#profile-div");
let profileHover = document.querySelector("#profile-hover-div");

let currentUser;
let currentUserIndex;

if(logInStatus === "true") {
    navBtn.style.display = "none"
    profileDiv.style.display = "flex";

    currentUser = userData.filter((ele,i)=> {
        if(ele.loggedIn) {
            currentUserIndex = i;
            return ele;
        }
    })



    if(currentUser[0].type === "admin") {
        document.querySelector("#admin-header").style.display = "block";
        document.querySelector("#links").style.display = "none";
    }
    let profileName = document.querySelector("#profile-name");
    profileName.innerText = currentUser[0].name;
    
    let profileNameHover = document.querySelector("#profile-name-hover");
    profileNameHover.innerText = currentUser[0].name;
    
    let signoutBtn = document.querySelector("#signout-btn");
    
    profileDiv.addEventListener("mouseenter", () => {
        profileHover.style.display= "flex";
    })
    profileHover.addEventListener("mouseleave", () => {
        profileHover.style.display = "none"
    })
    
    signoutBtn.addEventListener("click", () => {
        
        localStorage.setItem("isLoggedIn", false);
        
        let newData = userData[currentUserIndex];
        delete newData.loggedIn;
        
        userData[currentUserIndex] = newData;
        localStorage.setItem("user-data", JSON.stringify(userData));
    
        window.location.reload();
    })
}

let crunchCount = Number(localStorage.getItem("crunch-count")) || 0;
document.querySelector("#crunch-number").innerText = crunchCount;
localStorage.setItem("crunch-count", (crunchCount+1));