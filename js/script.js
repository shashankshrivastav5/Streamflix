document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("mouseover", () => {
      const subMenus = dropdown.querySelectorAll(".sub-menu");
      subMenus.forEach(function (subMenu) {
        subMenu.classList.add("show");
      });
    });

    dropdown.addEventListener("mouseout", () => {
      const subMenus = dropdown.querySelectorAll(".sub-menu");
      subMenus.forEach(function (subMenu) {
        subMenu.classList.remove("show");
      });
    });
  });
});

//  * * *   SIGNUP FORM PHONE NUMBER VALIDATION   * * * //
const phoneInput = document.querySelector("#phoneNum"); //Creating "phoneInput" variable of type "const" and assigning it the value of input on id "#phoneNum"

const errEl = document.querySelector(".input-err"); //Creating "errEl" variable of type "const" and assigning it the value class ".input-err"

function validatePhoneNumber() {
  //function created of name validatePhoneNumber
  let phoneNumber = Number(phoneInput.value); //Creating variable of name "phoneNumber" of type "let" and assigining it the value of "phoneInput" variable
  if (!phoneNumber) {
    errEl.removeAttribute("hidden"); //if entered value by user is not number then "hidden" keyword will be removed from the paragraph element having ".input-err" and it will display the message "please enter only numbers"
    phoneInput.focus();
    return false;
  }
  errEl.setAttribute("hidden", true); //else if the entered value by user is a number then the message will stay hidden
  return true;
}

phoneInput.addEventListener("keyup", validatePhoneNumber); //validatePhoneNumber function will be called everytime the key is released after pressing

// Function to validate passwords
function validatePasswords() {
  var password = document.getElementById("enterpassword").value;
  var confirmPassword = document.getElementById("confirmpassword").value;
  var passwordMatchMessage = document.getElementById("passwordMatchMessage");

  if (password === confirmPassword) {
      passwordMatchMessage.textContent = "Passwords match";
      passwordMatchMessage.style.color = "green";
  } else {
      passwordMatchMessage.textContent = "Passwords do not match";
      passwordMatchMessage.style.color = "red";
  }
}

// Attach event listener to the "Confirm Password" input field
document.getElementById("confirmpassword").addEventListener("input", validatePasswords);

//  * * *   FORM DATA LOCAL STORAGE   * * * //
function storeFormData(formData) {
  var storedData = JSON.parse(localStorage.getItem("formData")) || [];
  storedData.push(formData);
  localStorage.setItem("formData", JSON.stringify(storedData));
}

// Function to generate table from stored data
function generateTable() {
  var storedData = JSON.parse(localStorage.getItem("formData"));
  if (storedData) {
    var tableHtml =
      "<h2>Stored Form Data:</h2><table border='1'><tr><th>First Name</th><th>Last Name</th><th>DOB</th><th>Country</th><th>Contact No</th><th>Email</th></tr>"; //Setting headings for table

    storedData.forEach(function (formData) {
      tableHtml +=
        "<tr><td>" +
        formData.firstname +
        "</td><td>" +
        formData.lastname +
        "</td><td>" +
        formData.dob +
        "</td><td>" +
        formData.country +
        "</td><td>" +
        formData.phone +
        "</td><td>" +
        formData.email +
        "</td></tr>";
    });
    tableHtml += "</table>";
    document.getElementById("storedData").innerHTML = tableHtml;
  }
}

// Event listener for form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    var formData = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      dob: document.getElementById("birthdate").value,
      country: document.getElementById("country").value,
      phone: document.getElementById("phoneNum").value,
      email: document.getElementById("email").value,
    };

    // Store form data in local storage
    storeFormData(formData);
  });

// Event listener for button click to display data
document.getElementById("displayDataBtn").addEventListener("click", () => {
  generateTable();
  alert("Table is displayed at the bottom!!!"); //Event Captured and Handled(alert used)
});

// Display stored data when the page loads
generateTable();