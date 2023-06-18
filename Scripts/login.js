let submit = document.querySelector("#signin-btn");
let input = document.querySelector("#user-inp");
let password = document.querySelector("#user-pwd");
let form = document.querySelector("#login-form");

let errorDiv = document.querySelector("#google-auth");
let errorMsg = document.querySelector("#message");

let userData = JSON.parse(localStorage.getItem("user-data")) || [];

submit.addEventListener("click", (e) => {
    
    e.preventDefault();
    let enteredInput = input.value;
    let enteredPwd = password.value;
    let res = userData.filter((ele) => {
        if(enteredInput === ele.username || enteredInput === ele.email) {
            
            // console.log(enteredInput)
            if(enteredPwd === ele.password) {
                // console.log(enteredPwd);
                errorDiv.innerHTML = "";
    
                let success = document.createElement("h2");
                success.innerText = "Logged In Succesfully.";
                success.style.color = "green"
    
                errorDiv.append(success);
    
                localStorage.setItem("isLoggedIn", true);
                setTimeout(()=> {
                    window.location.replace("./index.html")
                },500)
            }
            else {
                errorMsg.style.display = "block";
                setTimeout(() => {
                    errorMsg.style.display = "none";
                },4000)
            }
        }
        else {
            errorMsg.style.display = "block";
            setTimeout(() => {
                errorMsg.style.display = "none";
            },4000)
        }
    })
    form.reset()
})