let arrow = document.getElementById("arrow");
arrow.addEventListener(onclick, calculate)

let input = document.querySelector("input");
input.addEventListener(onclick, removeError)

let inputArr = document.querySelectorAll("input")

let inputP = document.querySelectorAll(".inputP")

let errMessage = document.querySelectorAll(".error")

let yearsOutput = document.querySelector("i#yearsOutput")

let monthsOutput = document.querySelector("i#monthsOutput")

let daysOutput = document.querySelector("i#daysOutput")

let mainError = document.querySelector(".mainError")


inputArr[0].oninput = function () {
    removeError();
    if (this.value.length > 2) {
        this.value = this.value.slice(0,2);
    }
    else if ((this.value.length < 2) && (this.value.length > 0)) {
        clearOutput();
    }
    else if (this.value.length === 2) {
        inputArr[1].focus();
    }
}


inputArr[1].oninput = function () {
    removeError();
    if (this.value.length > 2) {
        this.value = this.value.slice(0,2); 
    }
    else if ((this.value.length < 2) && (this.value.length > 0)) {
        clearOutput();
    }
    else if (this.value.length === 2 ) {
        inputArr[2].focus();
    }
    else if (this.value.length === 0) {
        inputArr[0].focus();
    }
}


inputArr[2].oninput = function () {
    removeError();
    if (this.value.length > 4) {
        this.value = this.value.slice(0,4); 
    }
    else if ((this.value.length < 4) && (this.value.length > 0)) {
        clearOutput();
    }
    else if (this.value.length === 4) {
        calculate();
    }
    else if (this.value.length === 0) {
        inputArr[1].focus()
    }
    else if (mainError.classList.contains("hidden") === false) {
        clearOutput()
        for (let i = 0; i < inputArr.length; i++) {
            inputArr[i].blur();
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate(); 
    }
});


function clearOutput() {
    yearsOutput.innerHTML = '<span id="yearSpan">--</span> years'
    monthsOutput.innerHTML = '<span id="monthSpan">--</span> months'
    daysOutput.innerHTML = '<span id="daySpan">--</span> days'
}

function removeError() {
    for (let i = 0; i < inputArr.length; i++) {
        inputArr[i].classList.remove("notFilled")
        inputP[i].classList.remove("pNotFilled")
        errMessage[i].classList.add("hidden")
        clearOutput();
    }
}

function validateInput() {
  for (let i = 0; i < inputArr.length; i++) {

    function wrongDate() {
        inputArr[i].classList.add("notFilled");
        inputP[i].classList.add("pNotFilled");
        mainError.classList.remove("hidden");
        inputArr[i].blur()
    }

    let currentYear = new Date().getFullYear();
    
    let x  = inputArr[i].value;
    if (x === "") {
      inputArr[i].classList.add("notFilled");
      inputP[i].classList.add("pNotFilled");
      errMessage[i].classList.remove("hidden")
    }
    else if ((inputArr[0].value > 28) && (inputArr[1].value === 2)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
    }
    else if ((inputArr[0].value > 30) && (inputArr[1].value === 4||5||9||11)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
    }
    else if ((inputArr[0].value > 31) && (inputArr[1].value === 1||3||6||7||8||10||12)) {
        wrongDate();
        mainError.innerText = "Must be a real date";
    }
    else if (inputArr[1].value > 12) {
        wrongDate();
        mainError.innerText = "Must be a valid month"
    }
    else if (inputArr[2].value > currentYear) {
        wrongDate()
        mainError.innerText = "Date cannot be in the future";
    }
    else if (inputArr[2].value < (currentYear-1000)) {
        wrongDate()
        mainError.innerText = "That's not right"
    }

    else {
        let monthInput = inputArr[1];
        let dateInput = inputArr[0];
        let yearInput = inputArr[2];

        if (monthInput.value.length === 1) {
                monthInput.value = '0' + monthInput.value
        }

        if (dateInput.value.length === 1) {
                dateInput.value = '0' + dateInput.value
        }
        let dateString = monthInput.value + "-" + dateInput.value + "-" + yearInput.value;
        getAge(dateString);
    }
  }
}


function calculate() {
  validateInput();
}

// Function to find the age from a given date input

function getAge(dateString) {
    var now = new Date();
  
    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
  
    var dob = new Date(dateString.substring(6,10),
                       dateString.substring(0,2)-1,                   
                       dateString.substring(3,5)                  
    );
  
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var yearString = "";
    var monthString = "";
    var dayString = "";
  
  
    let yearAge = yearNow - yearDob;
  
    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      monthAge = 12 + monthNow -monthDob;
    }
  
    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;
  
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
  
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
        };
  
    if ( age.years > 1 ) yearString = " years";
    else yearString = " year";
    if ( age.months> 1 ) monthString = " months";
    else monthString = " month";
    if ( age.days > 1 ) dayString = " days";
    else dayString = " day";

    
    yearsOutput.innerHTML = '<span id="yearSpan">' + age.years + '</span> ' + yearString;
    monthsOutput.innerHTML = '<span id="monthSpan">' + age.months + '</span> ' + monthString;
    daysOutput.innerHTML = '<span id="daySpan">' + age.days + '</span> ' + dayString;
  
}