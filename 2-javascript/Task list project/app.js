// Dom Variable
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const clearTask = document.querySelector(".clear-tasks");
const addCollection = document.querySelector(".collection");
const filter = document.querySelector("#filter");
// Dom Variable End
// Add and Delete Task Start
taskForm.addEventListener("submit", taskFormHandler);
function taskFormHandler(event) {
  event.preventDefault();
  // console.log()
  const taskInputValue = taskInput.value;
  if (!taskInputValue) {
    confirm("Value can not be Empty");
    return;
  }
  const li = document.createElement("li");
  li.classList.add("collection-item");
  li.innerHTML = `${taskInputValue}
    <a class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
  addCollection.append(li);
  taskInput.value = "";

  bindDeletButton();
}
const bindDeletButton = () => {
  const deleteIcons = document.querySelectorAll(".delete-item");
  if (deleteIcons.length > 0) {
    deleteIcons.forEach(function (singledeleteIcon) {
      singledeleteIcon.addEventListener("click", deleteIconHandler);
    });
  }
};

const deleteIconHandler = (event) => {
  event.preventDefault();
  const currentElement = event.target;
  const deleteElement = currentElement.parentElement.parentElement;
  if (confirm("Are you Sure")) {
    deleteElement.remove();
  }
};
// Add and Delete Task End

clearTask.addEventListener("click", clearTaskHandler);
function clearTaskHandler(event) {
  event.preventDefault();
  if (confirm("Clear Task Lists")) {
    addCollection.innerHTML = "";
  }
}

// Filter Start
filter.addEventListener("input", filterHandler)
function filterHandler(event) {
    event.preventDefault();
    const currentElement = event.target;
    const filterInputValue = currentElement.value.toLowerCase();
  
    const collectionItems = document.querySelectorAll(".collection-item");
  
    collectionItems.forEach(function (singleCollectionItem) {
      const taskInnerText = singleCollectionItem.innerText.toLowerCase();
      if (taskInnerText.indexOf(filterInputValue) == -1) {
        singleCollectionItem.style.display = "none";
      } else {
        singleCollectionItem.style.display = "block";
      }
    });
  }
  
