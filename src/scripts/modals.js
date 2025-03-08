// hide and clear modal content
function hideModal() {
   document.getElementById("modal").style.display = "none";
   document.getElementById("modal").innerHTML = "";
}

// Display row data in a modal
function specific(id) {
   id = parseInt(id);
   // get modal
   let modal = document.getElementById("modal");
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.classList = "modal-content";
   let modTable = document.createElement("table");
   modTable.id = "modal-table";
   let headRow = document.createElement("tr");
   headRow.classList = "modal-row";
   // create headers
   for (property in materialsArr[id]) {
      let header = document.createElement("th");
      header.classList = "modal-head";
      header.innerText = property;
      headRow.appendChild(header);
   }
   // append header to table in modal
   modTable.appendChild(headRow);
   // Create rows
   let row = document.createElement("tr");
   row.classList = "modal-row"
   for (property in materialsArr[id]) {
      let tableContent = document.createElement("td");
      tableContent.classList = "modal-cell"
      tableContent.innerText = materialsArr[id][property];
      row.appendChild(tableContent);
   }
   // append row
   modTable.appendChild(row);
   modalContent.appendChild(modTable);
   // append urls if exist
   if (materialsArr[id].hasOwnProperty("urls")) {
      modalContent.appendChild(createImage(materialsArr[id]["urls"]));
   }

   // append modal to display
   modal.appendChild(modalContent);
}

// display form for adding data in a modal
function addModal() {
   let isValid;
   // get modal
   let modal = document.getElementById("modal");
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.classList = "modal-content";

   let error = document.createElement("span");
   error.style.color = "red";
   error.style.display = "none";
   error.id = "error";

   // Create form
   let form = createDataForm();

   // check if data is valid on submit
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = [...e.target];
      isValid = validate(data);
      if (isValid == 0) {
         addData(data);
      } else {
         invalid(isValid, data);
      }
   });
   // append elements to display modal
   modalContent.appendChild(error);
   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}

// Ask if data should be deleted
function confirmDelete(id) {
   let modal = document.getElementById("modal");
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.className = "confirm-delete modal-content";

   let question = document.createElement("p");
   question.innerText = "Are you sure you want to delet this data?";

   let yesButton = document.createElement("button");
   yesButton.innerText = "Yes";
   yesButton.addEventListener("click", () => {
      deleteData(id);
      hideModal();
   });

   let noButton = document.createElement("button");
   noButton.innerText = "No";
   noButton.addEventListener("click", () => hideModal());

   modalContent.appendChild(question);
   modalContent.appendChild(yesButton);
   modalContent.appendChild(noButton);
   modal.appendChild(modalContent);
}