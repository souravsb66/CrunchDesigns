// localStorage.setItem("isLoggedIn", true);
let logInStatus = localStorage.getItem("isLoggedIn");

let userData = JSON.parse(localStorage.getItem("user-data")) || [];
// console.log(userData);

let navBtn = document.querySelector("#nav-btn");
let profileDiv = document.querySelector("#profile-div");
let profileHover = document.querySelector("#profile-hover-div");

let tbody = document.querySelector("tbody");

let signoutBtn = document.querySelector("#signout-btn");

let currentUser;
let currentUserIndex;

let loginMsg = document.querySelector("#login-msg-div");

if(logInStatus === "true") {
    navBtn.style.display = "none"
    profileDiv.style.display = "flex";
    document.querySelector("#admin-header").style.display = "block";


    currentUser = userData.filter((ele,i)=> {
        if(ele.loggedIn) {
            currentUserIndex = i;
            return ele;
        }
    })
    // console.log(currentUser);
    
    let profileName = document.querySelector("#profile-name");
    profileName.innerText = currentUser[0].name;
    
    let profileNameHover = document.querySelector("#profile-name-hover");
    profileNameHover.innerText = currentUser[0].name;
}
else {
    loginMsg.style.display = "flex"
    main.style.display = "none";
}


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

let crunchCount = Number(localStorage.getItem("crunch-count")) || 0;
document.querySelector("#crunch-number").innerText = crunchCount;
// localStorage.setItem("crunch-count", (crunchCount+1));



//Sort users by names
document.querySelector("#sortByName").addEventListener("change", (e) => {
    
    let str = e.target.value;
    let newData;
    if(str === "") {
        display(userData);
    }
    else if(str === "atoz") {
        newData = userData.sort(sortByNames);

        function sortByNames(a,b) {
            if(a.name > b.name) {
                return 1;
            }
            else {
                return -1
            }
        }
        display(newData)
    }

    else if(str === "ztoa") {
        newData = userData.sort(sortByNames);

        function sortByNames(a,b) {
            if(a.name > b.name) {
                return -1;
            }
            else {
                return 1
            }
        }
        display(newData)
    }

    // console.log(newData);
})

//Filter by type
document.querySelector("#filterByType").addEventListener("change", (e) => {


    // console.log(e.target.value)

    let str = e.target.value;

    if(str === "") {
        display(userData);
    }
    else {
        let newData = userData.filter((ele) => {
            if(ele.type === str) {
                return ele;
            }
        })

        // console.log(newData);
        display(newData);
    }
})

//Display function
function display(data) {

    // console.log(data);
    tbody.innerHTML = "";

    for(let index = 0; index < data.length; index++) {

        let tr = document.createElement("tr");
        let sl = document.createElement("td");
        let name = document.createElement("td");
        let username = document.createElement("td");
        let email = document.createElement("td");
        let type = document.createElement("td");
        let removeBtn = document.createElement("td");

        sl.innerText = index+1;
        name.innerText = data[index].name;
        username.innerText = data[index].username;
        email.innerText = data[index].email;
        type.innerText = data[index].type;
        removeBtn.innerText = "Remove";

        removeBtn.classList.add("deleteBtn");

        removeBtn.addEventListener("click", () => {

            let newData = data.filter((ele,i) => {
                if(index !== i) {
                    return ele;
                }
            })

            console.log(newData);
            
            localStorage.setItem("user-data", JSON.stringify(newData));
            display(newData);
            window.location.reload();
        })

        tr.append(sl,name,username,email,type,removeBtn);

        tbody.append(tr);
    }
}

display(userData);