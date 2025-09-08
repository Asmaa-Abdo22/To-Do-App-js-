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
// *----Global Variables ----
let taskIndex;
let allTasks;
allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
displayAllTasks();

let nextupcounter = parseInt(localStorage.getItem("nextupcounter")) || 0;
let inprogresscounter =
  parseInt(localStorage.getItem("inprogresscounter")) || 0;
let donecounter = parseInt(localStorage.getItem("donecounter")) || 0;
nextUpSpan.innerHTML = nextupcounter;
inProgressSpan.innerHTML = inprogresscounter;
doneSpan.innerHTML = donecounter;
// &----Functions ----
function addTask() {
  let task = {
    status: statusInput.value,
    category: categoryInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
  };
  allTasks.push(task);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  clearInputs();
  displayTask(allTasks.length - 1);
  updateCounters();
  let modalElement = document.getElementById("exampleModal");
  let modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
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
  <div class="task">
    <h3 class="text-capitalize">${allTasks[index].title}</h3>
    <p class="description text-capitalize">${allTasks[index].description}</p>
    <h4 class="category ${allTasks[index].category} text-capitalize">${allTasks[index].category}</h4>
    <ul class="task-options list-unstyled d-flex gap-4 fs-5 m-0 mt-2">
     <li><i class="fas fa-pen  text-warning" ></i></li>
     <li><i class="fas fa-trash text-danger" onclick="deleteTask(${index})"></i></li>
     <li><i class="fas fa-palette text-secondary"></i></li>
    </ul>
  </div>
  `;
  taskIndex = index;
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
// !----Events ----
addBtn.addEventListener("click", () => {
  addTask();
});
searchTaskInput.addEventListener("input", () => {
  searchTask();
});
