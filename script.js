const formNode = document.getElementById("customerSurveyForm");

const userNameNode = formNode.elements["userName"];
const birthDateInputNode = formNode.elements["userBirthDate"];
const emailInputNode = formNode.elements["userEmail"];
const phoneNumberNode = formNode.elements["phoneNumber"];
const liveCityNode = formNode.elements["liveCity"];
const fovariteItemNode = formNode.elements["fovariteItem"];
const improvementimputNode = formNode.elements["improvement"];

const inputGroupNameNode = document.querySelector(".input-group-name");
const inputGroupbirthNode = document.querySelector(".input-group-birth");
const inputGroupEmailNode = document.querySelector(".input-group-email");
const inputGroupPhoneNode = document.querySelector(".input-group-phone");
const inputGroupcityNode = document.querySelector(".input-group-livecity");
const inputGroupitemNode = document.querySelector(".input-group-item");
const inputGroupimprovementNode = document.querySelector(".input-group-improvement");
const endNode = document.querySelector(".end");



let nameErrorMessage = "";
let emailErrorMessage = "";
let birthErrorMessage = "";
let phoneErrorMessage = "";
let cityErrorMessage = "";
let fovariteItemErrorMessage = "";
let improvementErrorMessage = "";

formNode.addEventListener("submit",(event) => {

    event.preventDefault();
    // remove all the exsiting error message
    document.querySelectorAll(".error-message").forEach((errorM) => errorM.remove());

    // validate all the inputs
    if(!validateUserName()){
        showInputError(inputGroupNameNode, nameErrorMessage);
    }

    if(!validateBirthDate()){
        showInputError(inputGroupbirthNode, birthErrorMessage);
    }

    if(!validateUserEmail()){
        showInputError(inputGroupEmailNode, emailErrorMessage);
    }

    if(!validatePhoneNumber()){
        showInputError(inputGroupPhoneNode, phoneErrorMessage);
    }

    if(!validateCity()){
        showInputError(inputGroupcityNode, cityErrorMessage);
    }

    if(!validateFovariteItem()){
        showInputError(inputGroupitemNode, fovariteItemErrorMessage);
    }

    if(!validateImprovement()){
        showInputError(inputGroupimprovementNode, improvementErrorMessage);
    }

    // when all the infuts are valid, hide the form
    if(validateUserName() && validateBirthDate() && validateUserEmail() 
        && validatePhoneNumber() && validateCity() && validateFovariteItem() 
        && validateImprovement()){
        endNode.style.display = "flex";
        formNode.style.display = "none";
    }
});



// show error message function
function showInputError(inputElement, message){
    // create new element 'p'
    const newErrorMessageNode = document.createElement("p");
    newErrorMessageNode.className = "error-message";

    // set element role to "alert" for reader
    newErrorMessageNode.setAttribute("role", "alert");

    // add new error message
    newErrorMessageNode.innerText = message;
    inputElement.appendChild(newErrorMessageNode);
}

// validate user name
function validateUserName(){
    const userName = escapeHTML(userNameNode.value);
    // user name pattern
    const userNamePattern = /^[a-zA-Z ]+$/;

    if(userName.length == 0){
        nameErrorMessage = "User Name is required" ;
        return false;
    }else if(!userNamePattern.test(userName)){
        nameErrorMessage = "User Name is invalide";
        return false;
    }else if(userName.length >40){
        nameErrorMessage = "Username should be less than 40 char"
        return false;
    }
    return true; 
}

// validate user email
function validateUserEmail(){
    
    // email pattern
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // check email
    if(emailInputNode.value.length === 0){
        emailErrorMessage = "Email is required";
        return false;
    }else if(!emailPattern.test(emailInputNode.value)){
        emailErrorMessage = "Email is invalid";
        return false;
    }
    return true;
}

// calculate age from the birth date
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// validate age
function validateBirthDate(){
    const userBirthDate = birthDateInputNode.value;
    if(getAge(userBirthDate) < 18){
        birthErrorMessage ="User must be older than 18";
        return false;
    }else if(userBirthDate.length === 0){
        birthErrorMessage ="Birth Date is required";
        return false;
    }
    return true;
}

// validate phone number
function validatePhoneNumber(){
    const phoneNumberPattern = /^\([0-9]{3}\)([0-9]{3})[-]([0-9]{4})$/;
    if(!phoneNumberPattern.test(phoneNumberNode.value)){
        phoneErrorMessage = "Phone Number is invalid";
        return false;
    }else if(phoneNumberNode.value.length === 0){
        phoneErrorMessage = "Phone Number is required";
        return false;
    }
    return true;
}

// validate city
function validateCity(){
    const cityRadioes = document.querySelectorAll('input[name = "city"]');
    for(let i=0; i<cityRadioes.length; i++){
        if(cityRadioes[i].checked){  
            return true;
        }
    }
    cityErrorMessage = "The city is required";
    return false;     
}

// validate fovarite item
function validateFovariteItem(){
    if(fovariteItemNode.value === ""){
        fovariteItemErrorMessage = "Fovarite item is required";
        return false;
    }
    return true;

}

// validate improvement
function validateImprovement() {
    // Get all checkboxes with name 'improvement'
    const improvementCheckboxes = document.querySelectorAll('input[name="improvement"]');
    for(let i =0; i<improvementCheckboxes.length; i++){
        if(improvementCheckboxes[i].checked){
            return true;
        }
    }
    improvementErrorMessage = "At least one improvement must be selected";
    return false;
}




function escapeHTML(input) {
    // g flag tests against all possible matches 

    // "<div>" will be read as &lt;div&gt; 
    // html interpreter will not interpret these strings as markup-- it will just display them on the page using the corresponding code
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// click home button then back to the form
document.querySelector("#homeButton").onclick = (() => {
    location.href = "index.html";
});
