// Assignment Code
var generateBtn = document.querySelector("#generate");

// change the all varialbe names, comments, etc.
var lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
var upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var specialChars = "$#@!%~^&*()_+=-[]{}"; // might need more 
var numberStr = "0123456789";


var lowerCaseArr = "abcdefghijklmnopqrstuvwxyz".split("");
var uppderCaseArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var specialArr = "$#@!%~^&*()_+=-[]{}".split(""); 
var numberArr = "0123456789".split("");

// variables for store user's input
var confirmNumbers = false;
var confirmUpper = false;
var confirmLower = false;
var confirmSpecial = false;
var lengthChosen = 0;

var minLength = 8;
var maxLength = 128;
var basePassword = "";

// log to see the data
console.log(lowerCaseArr);
console.log(uppderCaseArr);
console.log(specialArr);
console.log(numberArr);


function userInput(){
  lengthChosen = prompt("Enter the length of your password");
  while (lengthChosen < minLength || lengthChosen > maxLength) {
    alert("Length of password has to be greater than 7 and less than 129!");
    lengthChosen = prompt("Enter the length of your password");
  } 

  confirmNumbers = confirm("Do you want numbers in your password?");
    if(confirmNumbers){
      addNumber();
    }
  confirmUpper = confirm("Do you want uppercase letters?");
  if(confirmUpper){
    addUpper();
  }
  confirmLower = confirm("Do you want lowercase letters?");
  if(confirmLower){
    addLower();
  }
  confirmSpecial = confirm("Do you want special characters?");
  if(confirmSpecial){
    addSpecial();
  }

  console.log("Want numbers?" + confirmNumbers);
  console.log("Want letters upper?" + confirmUpper);
  console.log("Want letters lower?" + confirmLower);
  console.log("Want special characters?" + confirmSpecial);
}
  
function typeSet(){
  if(!confirmLower && !confirmNumbers && !confirmSpecial && !confirmUpper ){
    alert("You need at least one typeset of character to generate the password from, try again!")
    userInput();
  }
}

function addNumber(){
  if (confirmNumbers) {
    var index = Math.floor(Math.random() * numberArr.length);
    basePassword += numberArr[index];
  }
  console.log(basePassword);
}


function addUpper(){
  if (confirmUpper) {
    var index = Math.floor(Math.random() * uppderCaseArr.length);
    basePassword += uppderCaseArr[index];
  }
  console.log(basePassword);
}

function addLower(){
  if (confirmLower) {
    var index = Math.floor(Math.random() * lowerCaseArr.length);
    basePassword += lowerCaseArr[index];
  }
  console.log(basePassword);
}

function addSpecial(){
  if (confirmSpecial) {
    var index = Math.floor(Math.random() * specialArr.length);
    basePassword += specialArr[index];
  }
  console.log(basePassword);
}

// Function: 
function generatePassword() {
  userInput(); //gets user input for password length and typesets of characters wanted
  typeSet(); //checks that at least one typeset of characters is selected
  
  var remaining = lengthChosen - basePassword.length;
  var allChosenStr = "";
  
  // after implementing the required chars, create a string candidates of strings for random selections
  if (confirmNumbers) {
    allChosenStr += numberStr;
  }
  if (confirmUpper) {
    allChosenStr += upperCaseChars;
  }
  if (confirmLower) {
    allChosenStr += lowerCaseChars;
  }
  if (confirmSpecial) {
    allChosenStr += specialChars;
  }
  console.log(allChosenStr); //string of all possible characters wanted for the password is generated

  for (var i = 0; i < remaining; i++) {
    var index = Math.floor(Math.random() * allChosenStr.length);
    basePassword += allChosenStr[index]; // append to the existing password
    console.log(index);
  }
  console.log('Password before randomized order', basePassword);

  // Randomize the order of chars in the password
  // My own randomization code,
  var rPass = basePassword.split("");
  var randomOrdered = [];
  if(basePassword.length % 2 === 0){
    var rIndex1 = (basePassword.length/2);
    var isEven = true;
  } else{
    var rIndex1 = (basePassword.length-1)/2;
    var isEven = false;
  }
  while(rIndex1<basePassword.length){
    console.log(rIndex1);
    randomOrdered.push(rPass[rIndex1]);
    rIndex1++;
  }
  if(isEven){
    rIndex1= (basePassword.length/2)-1;
  } else {
    rIndex1 = ((basePassword.length-1)/2)-1;
  }
  while(rIndex1>-1){
    console.log(rIndex1);
    randomOrdered.push(rPass[rIndex1]);
    rIndex1--;
  }
  basePassword = randomOrdered.join("");


  console.log("Final password", basePassword);
  return basePassword;
}

// Write password to the #password input
function writePassword() {
  // could call your functions here below


  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  basePassword = ""; // Resets the value of the password
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);