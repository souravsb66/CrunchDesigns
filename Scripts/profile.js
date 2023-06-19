// localStorage.setItem("isLoggedIn", true);
let logInStatus = localStorage.getItem("isLoggedIn");

let userData = JSON.parse(localStorage.getItem("user-data")) || [];
// console.log(userData);

let navBtn = document.querySelector("#nav-btn");
let profileDiv = document.querySelector("#profile-div");
let profileHover = document.querySelector("#profile-hover-div");

let signoutBtn = document.querySelector("#signout-btn");

let currentUser;
let currentUserIndex;

let main = document.querySelector("main");
let loginMsg = document.querySelector("#login-msg-div");

if(logInStatus === "true") {
    navBtn.style.display = "none"
    profileDiv.style.display = "flex";
    main.style.display = "grid";

    currentUser = userData.filter((ele,i)=> {
        if(ele.loggedIn) {
            currentUserIndex = i;
            return ele;
        }
    })
    // console.log(currentUser);

    if(currentUser[0].type === "admin") {
        document.querySelector("#admin-header").style.display = "block";
        document.querySelector("#links").style.display = "none";
    }
    
    let profileName = document.querySelector("#profile-name");
    profileName.innerText = currentUser[0].name;
    
    let profileNameHover = document.querySelector("#profile-name-hover");
    profileNameHover.innerText = currentUser[0].name;
}
else {
    loginMsg.style.display = "flex"
    main.style.display = "none";
}

let crunchCount = Number(localStorage.getItem("crunch-count")) || 0;
document.querySelector("#crunch-number").innerText = crunchCount;
// localStorage.setItem("crunch-count", (crunchCount+1));

profileDiv.addEventListener("mouseenter", () => {
    profileHover.style.visibility = "visible";
})
profileHover.addEventListener("mouseleave", () => {
    profileHover.style.visibility = "hidden"
})

signoutBtn.addEventListener("click", () => {
    
    localStorage.setItem("isLoggedIn", false);

    let newData = userData[currentUserIndex];
    delete newData.loggedIn;

    userData[currentUserIndex] = newData;
    localStorage.setItem("user-data", JSON.stringify(userData));

    window.location.reload();
})

document.querySelector("#profile-header-name").innerText = currentUser[0].name;
let option = document.querySelector("#profile-header-option");
let optionMsg = document.querySelector("#option-msg");

let general = document.querySelector("#profile-link")
let generalData = document.querySelector("#general-data");

let usernameInp = document.querySelector("#username-inp");
usernameInp.value = currentUser[0].username;
let emailInp = document.querySelector("#email-inp");
emailInp.value = currentUser[0].email;

let generalSave = document.querySelector("#general-data > button");

general.addEventListener("click", (e) => {

    e.preventDefault();

    generalData.style.display = "block";
    general.style.fontWeight = "Bold";
    general.style.color = "black";
    editData.style.display = "none";
    edit.style.fontWeight = "lighter";
    edit.style.color = "#868686"
    pwdData.style.display = "none";
    pwd.style.fontWeight = "lighter";
    pwd.style.color = "#868686";

    option.innerText = "General";
    optionMsg.innerText = "Update your username and manage your account"
})

generalSave.addEventListener("click", () => {
    
    let newData = userData;
    let res = newData[currentUserIndex];
    // console.log(newData)

    let username = usernameInp.value;
    res.username = username;

    
    let email = emailInp.value;
    res.email = email;
    
    newData[currentUserIndex] = res;
    // console.log(newData);

    localStorage.setItem("user-data", JSON.stringify(newData));
})


let edit = document.querySelector("#edit-link");
let editData = document.querySelector("#edit-data");

let nameInp = document.querySelector("#name-inp");
nameInp.value = currentUser[0].name;
let locationInp = document.querySelector("#location-inp");
locationInp.value = "India";

edit.addEventListener("click", (e) => {
    e.preventDefault();

    editData.style.display = "block";
    edit.style.fontWeight = "Bold";
    edit.style.color = "black";
    generalData.style.display = "none";
    general.style.fontWeight = "lighter";
    general.style.color = "#868686"
    pwdData.style.display = "none";
    pwd.style.fontWeight = "lighter";
    pwd.style.color = "#868686";

    option.innerText = "Edit Profile";
    optionMsg.innerText = "Set up your Dribbble presence and hiring needs"
})

let pwd = document.querySelector("#pwd-link");
let pwdData = document.querySelector("#pwd-data");

pwd.addEventListener("click", (e) => {

    e.preventDefault();

    pwdData.style.display = "block";
    pwd.style.fontWeight = "Bold";
    pwd.style.color = "black";
    generalData.style.display = "none";
    general.style.fontWeight = "lighter";
    general.style.color = "#868686"
    editData.style.display = "none";
    edit.style.fontWeight = "lighter";
    edit.style.color = "#868686"
    

    option.innerText = "Password";
    optionMsg.innerText = "Manage your password"
})