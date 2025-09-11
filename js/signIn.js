// ?----HTML ELEMENTS ----
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");
const nothaveAccount = document.getElementById("nothaveAccount");
// *----Global Variables ----
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
// ^----Elements Rejex----
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
// &----Functions ----
function signIn() {
  if (
    validate(emailInput, emailRegex) &&
    validate(passwordInput, passwordRegex)
  ) {
    const isExist = allUsers.find(
      (item) =>
        item.email === emailInput.value && item.password === passwordInput.value
    );
    if (isExist) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Welcome To The to do list .",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ email: isExist.email })
        );

        document.location.href = "./index.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " Failed!",
        text: "Email or Password is incorrect, Try Again",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Log In Failed!",
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
signInBtn.addEventListener("click", () => {
  signIn();
});

emailInput.addEventListener("input", () => {
  validate(emailInput, emailRegex);
});
passwordInput.addEventListener("input", () => {
  validate(passwordInput, passwordRegex);
});
