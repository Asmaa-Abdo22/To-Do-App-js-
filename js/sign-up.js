// ?----HTML ELEMENTS ----
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const registerBtn = document.getElementById("registerBtn");
const haveAccount = document.getElementById("haveAccount");
// *----Global Variables ----
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
// ^----Elements Rejex----
const nameRegex = /^[A-Za-z]{2,20}( [A-Za-z]{2,20})?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
// &----Functions ----
function signUp() {
  if (
    validate(firstNameInput, nameRegex) &&
    validate(lastNameInput, nameRegex) &&
    validate(emailInput, emailRegex) &&
    validate(passwordInput, passwordRegex)
  ) {
    const isExist = allUsers.find((item) => item.email === emailInput.value);
    if (isExist) {
      Swal.fire({
        icon: "error",
        title: "Can't Add User!",
        text: "This Email Already Exists.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }
    let user = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    allUsers.push(user);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    Swal.fire({
      icon: "success",
      title: "User Added!",
      text: "Your Account has been added successfully.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      document.location.href = "./signIn.html";
    });
    console.log(allUsers);
  } else {
    Swal.fire({
      icon: "error",
      title: "Can't Add User!",
      text: "please fill in all fields.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
}
function validate(element, pattern) {
  if (pattern.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
// !----Events ----
registerBtn.addEventListener("click", () => {
  signUp();
});
firstNameInput.addEventListener("input", () => {
  validate(firstNameInput, nameRegex);
});
lastNameInput.addEventListener("input", () => {
  validate(lastNameInput, nameRegex);
});
emailInput.addEventListener("input", () => {
  validate(emailInput, emailRegex);
});
passwordInput.addEventListener("input", () => {
  validate(passwordInput, passwordRegex);
});
