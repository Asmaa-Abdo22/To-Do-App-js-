// ?----HTML ELEMENTS ----
const statusInput = document.getElementById("status");
const categoryInput = document.getElementById("category");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addBtn = document.getElementById("addBtn");
const nextUpSection = document.getElementById("nextUp");
const inProgressSection = document.getElementById("inProgress");
const doneSection = document.getElementById("done");
const nextUpSpan = document.getElementById("nextUpCounter");
const inProgressSpan = document.getElementById("inProgressCounter");
const searchTaskInput = document.getElementById("searchTaskInput");
const doneSpan = document.getElementById("doneCounter");
const updateButton = document.getElementById("updateBtn");
const barsBtn = document.getElementById("barsBtn");
const gridBtn = document.getElementById("gridBtn");
const modeIcon = document.getElementById("modeIcon");
const moonIcon = document.getElementById("moonIcon");
const rowContainer = document.getElementById("rowContainer");
const logoutIcon = document.querySelector(".logout-icon");
// *----Global Variables ----
let taskIndex;
let allTasks;
allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
} else {
  document.body.classList.remove("light");
}
displayAllTasks();

let nextupcounter = parseInt(localStorage.getItem("nextupcounter")) || 0;
let inprogresscounter =
  parseInt(localStorage.getItem("inprogresscounter")) || 0;
let donecounter = parseInt(localStorage.getItem("donecounter")) || 0;
nextUpSpan.innerHTML = nextupcounter;
inProgressSpan.innerHTML = inprogresscounter;
doneSpan.innerHTML = donecounter;
// ^----Elements Rejex----
const titlePattern = /^[A-Za-z0-9 ]{3,50}$/;
const descriptionPattern = /^[A-Za-z0-9 ,.?!]{5,200}$/;
// &----Functions ----

function addTask() {
  if (
    validate(titleInput, titlePattern) &&
    validate(descriptionInput, descriptionPattern)
  ) {
    let task = {
      status: statusInput.value,
      category: categoryInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
      bgColor: "rgba(15, 23, 42, 0.4)",
    };
    allTasks.push(task);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    clearInputs();
    Swal.fire({
      icon: "success",
      title: "Task Added!",
      text: "Your task has been added successfully.",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    displayTask(allTasks.length - 1);
    updateCounters();
    let modalElement = document.getElementById("exampleModal");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  } else {
    Swal.fire({
      icon: "error",
      title: "Missing Fields",
      text: "Please fill in all fields to add a new task!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
}

function updateCounters() {
  nextupcounter = 0;
  inprogresscounter = 0;
  donecounter = 0;

  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].status === "nextUp") {
      nextupcounter++;
      nextUpSpan.innerHTML = nextupcounter;
    } else if (allTasks[i].status === "inProgress") {
      inprogresscounter++;
      inProgressSpan.innerHTML = inprogresscounter;
    } else if (allTasks[i].status === "done") {
      donecounter++;
      doneSpan.innerHTML = donecounter;
    }
  }
  localStorage.setItem("nextupcounter", nextupcounter);
  localStorage.setItem("inprogresscounter", inprogresscounter);
  localStorage.setItem("donecounter", donecounter);
}
function clearInputs() {
  statusInput.value = "";
  categoryInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
}

function displayTask(index) {
  var taskHTML = `
  <div class="task" style="background:${allTasks[index].bgColor}" 
       data-aos="fade-up" 
       data-aos-duration="800" 
       data-aos-delay="${index * 100}">
       
    <h3 class="text-capitalize" data-aos="zoom-in" data-aos-duration="600">${
      allTasks[index].title
    }</h3>
    
    <p class="description text-capitalize" data-aos="fade-right" data-aos-duration="700">${
      allTasks[index].description
    }</p>
    
    <h4 class="category ${allTasks[index].category} text-capitalize" 
        data-aos="flip-left" 
        data-aos-duration="700">${allTasks[index].category}</h4>
    
    <ul class="task-options list-unstyled d-flex gap-4 fs-5 m-0 mt-2" 
        data-aos="fade-up" 
        data-aos-duration="900">
        
     <li><i class="fas fa-pen text-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showEditTAsk(${index})"></i></li>
     <li><i class="fas fa-trash text-danger" onclick="deleteTask(${index})"></i></li>
     <li><i class="fas fa-palette text-secondary" onclick="changeBgColor(event,${index})"></i></li>
    </ul>
  </div>
  `;

  if (allTasks[index].status === "nextUp") {
    nextUpSection.querySelector(".tasks").innerHTML += taskHTML;
  } else if (allTasks[index].status === "inProgress") {
    inProgressSection.querySelector(".tasks").innerHTML += taskHTML;
  } else if (allTasks[index].status === "done") {
    doneSection.querySelector(".tasks").innerHTML += taskHTML;
  }

  console.log(taskHTML);
}
function displayAllTasks() {
  for (let i = 0; i < allTasks.length; i++) {
    displayTask(i);
  }
}
function deleteTask(index) {
  allTasks.splice(index, 1);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  nextUpSection.querySelector(".tasks").innerHTML = "";
  inProgressSection.querySelector(".tasks").innerHTML = "";
  doneSection.querySelector(".tasks").innerHTML = "";

  updateCounters();
  displayAllTasks();
}
function searchTask() {
  nextUpSection.querySelector(".tasks").innerHTML = "";
  inProgressSection.querySelector(".tasks").innerHTML = "";
  doneSection.querySelector(".tasks").innerHTML = "";

  for (let i = 0; i < allTasks.length; i++) {
    if (
      allTasks[i].title
        .toLowerCase()
        .includes(searchTaskInput.value.toLowerCase()) ||
      allTasks[i].category
        .toLowerCase()
        .includes(searchTaskInput.value.toLowerCase())
    ) {
      displayTask(i);
    }
  }
}
function showEditTAsk(i) {
  statusInput.value = allTasks[i].status;
  categoryInput.value = allTasks[i].category;
  titleInput.value = allTasks[i].title;
  descriptionInput.value = allTasks[i].description;
  addBtn.classList.add("d-none");
  updateButton.classList.remove("d-none");
  taskIndex = i;
}
function updateTAsk() {
  allTasks[taskIndex].status = statusInput.value;
  allTasks[taskIndex].category = categoryInput.value;
  allTasks[taskIndex].title = titleInput.value;
  allTasks[taskIndex].description = descriptionInput.value;
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  nextUpSection.querySelector(".tasks").innerHTML = "";
  inProgressSection.querySelector(".tasks").innerHTML = "";
  doneSection.querySelector(".tasks").innerHTML = "";
  clearInputs();
  displayAllTasks();
  addBtn.classList.remove("d-none");
  updateButton.classList.add("d-none");
  let modalElement = document.getElementById("exampleModal");
  let modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
}
function validate(element, pattern) {
  if (pattern.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
const taskBoxColors = [
  "#7ed321",
  "rgba(15, 23, 42, 0.4)",
  "#4a90e2",
  "#f5a623",
  " rgba(255, 255, 255, 0.7)",
];

function generateRandomColors() {
  let randomcolorIndex;
  randomcolorIndex = Math.floor(Math.random() * taskBoxColors.length);
  return taskBoxColors[randomcolorIndex];
}
function changeBgColor(e, i) {
  allTasks[i].bgColor = generateRandomColors();
  e.target.closest(".task").style.background = allTasks[i].bgColor;
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
}
// 🌙☀️ Dark / Light Mode
function toggleTheme() {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    // Light Mode
    localStorage.setItem("theme", "light");
    moonIcon.classList.remove("d-none");
    modeIcon.classList.add("d-none");
  } else {
    // Dark Mode
    localStorage.setItem("theme", "dark");
    moonIcon.classList.add("d-none");
    modeIcon.classList.remove("d-none");
  }
}
function logOut() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (loggedUser) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    // فلترهم وامسح اللي عامل لوج إن
    allUsers = allUsers.filter((user) => user.email !== loggedUser.email);

    //  القائمة بعد التصفية
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    // امسح الـ loggedUser
    localStorage.removeItem("loggedUser");
  }

  // ودّيه على صفحة التسجيل
  document.location.href = "./signUp.html";
}

// !----Events ----
addBtn.addEventListener("click", () => {
  addTask();
});
searchTaskInput.addEventListener("input", () => {
  searchTask();
});
updateButton.addEventListener("click", () => {
  updateTAsk();
});
titleInput.addEventListener("input", () => {
  validate(titleInput, titlePattern);
});
descriptionInput.addEventListener("input", () => {
  validate(descriptionInput, descriptionPattern);
});
gridBtn.addEventListener("click", () => {
  gridBtn.classList.add("activeIcon");
  barsBtn.classList.remove("activeIcon");
  rowContainer.classList.add("row-cols-md-2", "row-cols-lg-3");
  rowContainer.classList.remove("flex-column");
});
barsBtn.addEventListener("click", () => {
  barsBtn.classList.add("activeIcon");
  gridBtn.classList.remove("activeIcon");
  rowContainer.classList.remove("row-cols-md-2", "row-cols-lg-3");
  rowContainer.classList.add("row-cols-1", "flex-column");
});
modeIcon.addEventListener("click", () => {
  modeIcon.classList.add("activeIcon");
});
modeIcon.addEventListener("click", toggleTheme);
moonIcon.addEventListener("click", toggleTheme);
logoutIcon.addEventListener("click", logOut);
