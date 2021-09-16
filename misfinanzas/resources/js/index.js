const form = document.getElementById("transactionForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let transactionFormData = new FormData(form);
  let transactionObject = convertForDataToTransactionObj(transactionFormData);
  saveTransactionObject(transactionObject);
  insertRowInTransactionTable(transactionObject);
  form.reset();
});

document.addEventListener("DOMContentLoaded", function (event) {
  let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
  transactionObjArray.forEach(function (arrayElement) {
    insertRowInTransactionTable(arrayElement);
  });
});

function insertRowInTransactionTable(transactionObject) {
  let transactionTableRef = document.getElementById("transactionTable");

  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute(
    "data-transaction-id",
    transactionObject["transactionId"]
  );

  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = transactionObject["transactionType"];

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = transactionObject["transactionDescription"];

  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = transactionObject["transactionCategory"];

  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = transactionObject["transactionAmount"];

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event) => {
    //ok
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    console.log(transactionId);
    deleteTransactionObject(transactionId);
    transactionRow.remove();
  });
}

function deleteTransactionObject(transactionId) {
  console.log(transactionId);
  let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
  console.log(transactionObjArray);
  let transactionIndexInArray = transactionObjArray.findIndex(
    (e) => e.transactionId === transactionId
  );
  console.log(transactionIndexInArray);
  transactionObjArray.splice(transactionIndexInArray, 1);
  let transactionArrayJSON = JSON.stringify(transactionObjArray);
  console.log(transactionArrayJSON);
  localStorage.setItem("transactionData", transactionArrayJSON);
}

function saveTransactionObject(transactionObject) {
  let myTransactionArray =
    JSON.parse(localStorage.getItem("transactionData")) || [];
  myTransactionArray.push(transactionObject);
  // convierto mi array de transacciones a JSON
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  // guardo mi array de transacciones en formato JSON en el local storage
  localStorage.setItem("transactionData", transactionArrayJSON);
}

function getNewTransactionId() {
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
  return newTransactionId;
}

function convertForDataToTransactionObj(transactionFormData) {
  let transactionType = transactionFormData.get("transactionType");
  let transactionDescription = transactionFormData.get(
    "transactionDescription"
  );
  let transactionCategory = transactionFormData.get("transactionCategory");
  let transactionAmount = transactionFormData.get("transactionAmount");
  let transactionId = getNewTransactionId();
  return {
    transactionType: transactionType,
    transactionDescription: transactionDescription,
    transactionCategory: transactionCategory,
    transactionAmount: transactionAmount,
    transactionId: transactionId,
  };
}
