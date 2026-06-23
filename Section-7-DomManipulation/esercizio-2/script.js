'use strict';

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordHelp = document.getElementById("passwordHelp");
const errorMsg = document.getElementById("errorMsg");
const registerForm = document.getElementById("registerForm");

let pasOk = false

function corectPass(elem) {
    elem.classList.add("success")
    elem.classList.remove("error")
}

function wrongPass(elem) {
    elem.classList.remove("success")
    elem.classList.add("error")
}

password.addEventListener("input", () => {
    if (password.value.length < 8) {
        wrongPass(password)
        console.log(password.value);
    } else {
        corectPass(password)
    }
})

confirmPassword.addEventListener("input", () => {
    if (password.value.length >= 8 && password.value === confirmPassword.value) {
        corectPass(confirmPassword)
        errorMsg.classList.add("hidden")
        pasOk = true
        console.log(password.value);
    } else {
        wrongPass(confirmPassword)
        errorMsg.classList.remove("hidden")
        console.log(password.value);
    }
})
