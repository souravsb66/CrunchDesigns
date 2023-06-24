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

let todoBtn = document.querySelector("#todo-btn");
let userDataBtn = document.querySelector("#userData-btn");

let todoDiv = document.querySelector("#todo-div");
let userDataDiv = document.querySelector("#userData-div");


userDataBtn.addEventListener("click", () => {
    
    userDataDiv.style.display = "block";
    todoDiv.style.display = "none";
})

todoBtn.addEventListener("click", () => {
    
    todoDiv.style.display = "block";
    userDataDiv.style.display = "none";

})

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

// Todo tab

let container = document.querySelector("#container");
let allBtn = document.querySelector("#all-btn");
let pendingBtn = document.querySelector("#pending-btn");
let completedBtn = document.querySelector("#completed-btn");
let deletedBtn = document.querySelector("#deleted-btn");
let pendingCount = document.querySelector("#pending-count");
let completedCount = document.querySelector("#completed-count");
let deletedCount = document.querySelector("#deleted-count");

let todoData = JSON.parse(localStorage.getItem("todo-data")) || [];

let deletedTodoData = JSON.parse(localStorage.getItem("deleted-todo")) || [];

const API = fetch("https://jsonplaceholder.typicode.com/todos");
API.then((res) => {
    return res.json();
})
.then((fetchedData) => {
    display2(fetchedData);
    localStorage.setItem("todo-data", JSON.stringify(fetchedData));
})
.catch((err) => {
    console.log(err);
})

allBtn.addEventListener("click", () => {

    let todoData = JSON.parse(localStorage.getItem("todo-data")) || [];
    container.innerHTML = "";
    display2(todoData);
})

document.querySelector("#all-count").innerText = todoData.length;

pendingCount.innerText = todoData.filter((ele) => {
    if(ele.completed === false) {
        return ele;
    }
}).length;

completedCount.innerText = todoData.filter((ele) => {
    if(ele.completed === true) {
        return ele;
    }
}).length;

deletedCount.innerText = deletedTodoData.length;

pendingBtn.addEventListener("click", () => {

    let todoData = JSON.parse(localStorage.getItem("todo-data")) || [];

    let filteredData = todoData.filter((ele) => {
        if(ele.completed === false) {
            return ele;
        }
    })
    container.innerHTML = "";
    display2(filteredData);
})

completedBtn.addEventListener("click", () => {

    let todoData = JSON.parse(localStorage.getItem("todo-data")) || [];

    let filteredData = todoData.filter((ele) => {
        if(ele.completed === true) {
            return ele;
        }
    })
    container.innerHTML = "";
    display2(filteredData);
})

deletedBtn.addEventListener("click", () => {
    container.innerHTML = "";
    display2(deletedTodoData);
})

//Display function
function display2(data) {
    
    container.innerHTML = "";

    for(let index = 0; index < data.length; index++) {

        let user = document.createElement("p")
        let id = document.createElement("p");
        let title = document.createElement("p");
        let status = document.createElement("div");
        let complete = document.createElement("button");
        let deleteDiv = document.createElement("div");
        
        let div = document.createElement("div");

        user.innerText = data[index].userId;
        id.innerText = data[index].id;
        title.innerText = data[index].title;
        complete.innerText = "Completed";
        deleteDiv.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
        deleteDiv.setAttribute("class", "recycle");
        
        // console.log(deleteBtn)

        complete.addEventListener("click", (e) => {
            
            data[index].completed = true;
            
            localStorage.setItem("todo-data", JSON.stringify(data));
            display2(data);

            pendingCount.innerText =  data.filter((ele) => {
                if(ele.completed === false) {
                    return ele;
                }
            }).length;

            completedCount.innerText = data.filter((ele) => {
                if(ele.completed === true) {
                    return ele;
                }
            }).length;

        })

        deleteDiv.addEventListener("click", (e) => {

            if(data[index].completed === true) {
                
                let allData = data.filter((ele, i) => {
                    if(index != i) {
                        // console.log(ele);
                        return ele;
                    }
                })
                
                data[index].deleted = true;
                delete data[index].completed;
                
                deletedTodoData.push(data[index]);
                localStorage.setItem("deleted-todo", JSON.stringify(deletedTodoData));
    
                localStorage.setItem("todo-data", JSON.stringify(allData));
    
                display2(allData);
    
                document.querySelector("#all-count").innerText = allData.length;
    
                pendingCount.innerText =  allData.filter((ele) => {
                    if(ele.completed === false) {
                        return ele;
                    }
                }).length;
    
                completedCount.innerText = allData.filter((ele) => {
                    if(ele.completed === true) {
                        return ele;
                    }
                }).length;
                
                deletedCount.innerText = deletedTodoData.length;

            }
            else {
                let error = document.querySelector("#todo-error-msg");
                error.innerText = "Complete task before deleting";
                error.style.color = "red";

                setTimeout(() => {
                    error.innerHTML = "";
                },2000)
            }


        })

        if(data[index].completed === true) {
            div.setAttribute("class", "done card")
            status.innerHTML = `<i class="fa fa-check-square-o status" aria-hidden="true"></i>`;
            div.append(title, status, deleteDiv)
        } 
        else if(data[index].completed === false) {
            div.setAttribute("class", "pending card")
            status.innerHTML = `<i class="fa fa-exclamation-triangle status" aria-hidden="true"></i>`;
            div.append(title, status, complete, deleteDiv);
        }

        if(data[index].deleted === true) {
            div.classList.add("deleted");
            div.removeChild(deleteDiv);
        }

        container.append(div)
    }
}

display(userData);
display2(todoData);