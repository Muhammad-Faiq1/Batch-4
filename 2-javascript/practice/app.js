// DOM Variable Start
const budgetButton = document.getElementById("budget-submit");
const budgetAmount = document.getElementById("budget-amount");
const balanceAmount = document.getElementById("balance-amount");
const expenseSubmit = document.getElementById("expense-submit");
const addExpense = document.querySelector(".add-expense");
const editHiddenInput = document.querySelector("#addOrEdit")
const expenseList = document.querySelector(".expense-list");



// DOM Variable End

// Calculate Start
budgetButton.addEventListener("click", budgetButtonHandler);
function budgetButtonHandler(event) {
  event.preventDefault();
  const currentElement = event.target;
  const getElement = currentElement.parentElement;
  const budgetInput = getElement.querySelector("#budget-input");
  const budgetInputValue = budgetInput.value;

  if (budgetInput.value <= 0) {
    confirm("Balance should not be Empty or Negative");
    budgetInput.value = 0;
    return;
  } else {
    budgetAmount.innerText = budgetInputValue;
    balanceAmount.innerText = budgetInputValue;
    budgetInput.value = "";
  }
}
// Calculate End

//Expense Start
expenseSubmit.addEventListener("click", expenseSubmitHandler);


function expenseSubmitHandler(event) {
  event.preventDefault();
  const currentElement = event.target;
  const getElement = currentElement.parentElement.parentElement;
  const expenseInput = getElement.querySelector("#expense-input");
  const amountInput = getElement.querySelector("#amount-input");
  const expenseInputText = expenseInput.value;
  const amountIputValue = amountInput.value;

  if (expenseInputText == "" || amountInput.value == "" || amountIputValue < 0) {
    confirm("Expense can't be Empty or Negative");
    return;
  }

  //  Item is alreafy is Exist
  const expenseTitle = document.querySelectorAll(".expense-title");
  if (expenseTitle.length > 0) {
    for (let index = 0; index < expenseTitle.length; index++) {
      const expenseTitleInnerHtml = expenseTitle[index].innerHTML;
      // console.log(expenseTitleInnerHtml)
      if (expenseTitleInnerHtml == expenseInput.value) {
        confirm("This Item is already exit");
        return;
      }
    }
  }
  // end
  let row = document.createElement("div");
  row.classList.add("expense");
  row.classList.add("expense-row");
  row.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline" id ="edit ">
  
  <h6 class="expense-title mb-0 text-uppercase list-item">${expenseInputText}</h6>
  <h5 class="expense-amount mb-0 list-item list-item-value">${amountIputValue}</h5>
  
  <div class="expense-icons list-item">
  
  <button class="btn btn-primary btn-edit" type="button" id ="edit-button">EDIT</button>
  
  <button class="btn btn-danger btn-remove" type="button">REMOVE</button>
  </div>
  </div>`;
  expenseList.appendChild(row);

  expenseInput.value = "";
  amountInput.value = "";

  bindDeleteButton();
  bindEditButton();
  updateBudgetTotal();

}
//Expense End

// Delete Button
function bindDeleteButton() {
  const deleteButton = document.querySelectorAll(".btn-remove");

  if (deleteButton.length > 0) {
    deleteButton.forEach(function (singleButton) {
      singleButton.addEventListener("click", deleteButtonHandler);
      singleButton;
    });
  }
}
function deleteButtonHandler(event) {
  event.preventDefault();
  const currentElement = event.target;
  const row = currentElement.parentElement.parentElement;
  if (confirm("YOU WANT TO DELET It")) {
    row.remove();
    updateBudgetTotal();

  }
}
// Delete end

// Edit Work
function bindEditButton() {
  const editButton = document.querySelectorAll("#edit-button");

  if (editButton.length > 0) {
    editButton.forEach(function (singleEditButton) {
      singleEditButton.addEventListener("click", editButtonHandler);

    });
  }
}
function editButtonHandler(event) {
  event.preventDefault();
  const currentElement = event.target;
  // const getElement = currentElement.parentElement.parentElement;
  // const listItem = getElement.querySelector(".list-item");
  // const listItemValue = getElement.querySelector(".list-item-value");
  // let  expenseInput = document.querySelector("#expense-input");
  // let amountInput = document.querySelector("#amount-input");
  // // console.log(expenseInput.value, amountInput.value,  "work")
  // expenseInput.value = listItem.innerText;
  // amountInput.value = listItemValue.innerText;

}

// Edit End

// Update Expense Start
function updateBudgetTotal() {
  const expenseRow = document.querySelectorAll(".expense-row");
  let total = 0;
  if (expenseRow.length > 0) {
    expenseRow.forEach(function (singleRow) {
      const getValue = singleRow.querySelector(".list-item-value");
      const expenseAmount = document.querySelector("#expense-amount");
      total = total + (parseInt(expenseAmount.innerText), parseInt(getValue.innerText));
      let value = expenseAmount.innerText = total;
      let budgetAmountValue = budgetAmount.innerText - value;
      console.log(balanceAmount.innerText = budgetAmountValue);
    });

  }

}
// Update Expense End