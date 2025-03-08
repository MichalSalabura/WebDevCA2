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
   let modTable = document.createElement("table");
   let headRow = document.createElement("tr");
   // create headers
   for (property in materialsArr[id]) {
      let header = document.createElement("th");
      header.innerText = property;
      headRow.appendChild(header);
   }
   // append header to table in modal
   modTable.appendChild(headRow);
   // Create rows
   let row = document.createElement("tr");
   for (property in materialsArr[id]) {
      let tableContent = document.createElement("td");
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

   modalContent.className = "modal-content";
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
   modalContent.className = "modal-content";

   let error = document.createElement("span");
   error.style.color = "red";
   error.style.display = "none";
   error.id = "error";

   // Create form
   let form = document.createElement("form");

   let materialLabel = document.createElement("label");
   materialLabel.setAttribute("for", "material-input");
   materialLabel.innerText = "Material:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   materialInput.placeholder =
      `Available types: ${types.join(", ")}`;
   materialInput.required = true;
   form.appendChild(materialLabel);
   form.appendChild(materialInput);

   let nameLabel = document.createElement("label");
   nameLabel.setAttribute("for", "name-input");
   nameLabel.innerText = "Name:";
   let nameInput = document.createElement("input");
   nameInput.id = "name-input";
   nameInput.required = true;
   form.appendChild(nameLabel);
   form.appendChild(nameInput);

   let codeLabel = document.createElement("label");
   codeLabel.setAttribute("for", "code-input");
   codeLabel.innerText = "Recycling Code:";
   let codeInput = document.createElement("input");
   codeInput.id = "code-input";
   codeInput.required = true;
   form.appendChild(codeLabel);
   form.appendChild(codeInput);

   let processLabel = document.createElement("label");
   processLabel.setAttribute("for", "process-input");
   processLabel.innerText = "Recycling Process:";
   let processInput = document.createElement("input");
   processInput.id = "process-input";
   processInput.required = true;
   form.appendChild(processLabel);
   form.appendChild(processInput);

   let acceptedLabel = document.createElement("label");
   acceptedLabel.setAttribute("for", "accepted-input");
   acceptedLabel.innerText = "Accepted Items:";
   let acceptedInput = document.createElement("textarea");
   acceptedInput.id = "accepted-input";
   acceptedInput.placeholder = `One or more of: ${accepted.join(", ")}`;
   acceptedInput.required = true;
   form.appendChild(acceptedLabel);
   form.appendChild(acceptedInput);

   let nonAcceptedLabel = document.createElement("label");
   nonAcceptedLabel.setAttribute("for", "non-accepted-input");
   nonAcceptedLabel.innerText = "Non Accepted Items:";
   let nonAcceptedInput = document.createElement("textarea");
   nonAcceptedInput.id = "non-accepted-input";
   nonAcceptedInput.placeholder = `One or more of: ${nonAccepted.join(", ")}`;
   nonAcceptedInput.required = true;
   form.appendChild(nonAcceptedLabel);
   form.appendChild(nonAcceptedInput);

   let recyclabilityLabel = document.createElement("label");
   recyclabilityLabel.setAttribute("for", "recyclability-input");
   recyclabilityLabel.innerText = "Recyclability:";
   let recyclabilityInput = document.createElement("input");
   recyclabilityInput.id = "recyclability-input";
   recyclabilityInput.required = true;
   form.appendChild(recyclabilityLabel);
   form.appendChild(recyclabilityInput);

   let environmentalLabel = document.createElement("label");
   environmentalLabel.setAttribute("for", "environmental-input");
   environmentalLabel.innerText = "Environmental Impact:";
   let environmentalInput = document.createElement("input");
   environmentalInput.id = "environmental-input";
   environmentalInput.required = true;
   form.appendChild(environmentalLabel);
   form.appendChild(environmentalInput);

   let urlContainer = document.createElement("div");
   urlContainer.id = "url-container";
   let urlLabel = document.createElement("label");
   urlLabel.setAttribute("for", "url-input");
   urlLabel.innerText = "URLs:";
   urlContainer.appendChild(urlLabel);
   addUrl(urlContainer);
   form.appendChild(urlContainer);

   let submitButton = document.createElement("input");
   submitButton.type = "submit";
   submitButton.value = "submit";
   form.appendChild(submitButton);

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
// Add empty url input
function addUrl(parent) {
   let urlInput = document.createElement("input");
   urlInput.id = "url-input";
   urlInput.type = "url";
   urlInput.pattern = "^https://.*";
   urlInput.placeholder = "https://JohnDoe.com";
   urlInput.addEventListener("change", (e) => {
      if (e.target.value == "") {
         removeUrl(parent);
      } else {
         addUrl(parent);
      }
   });
   parent.appendChild(urlInput);
}
// remove empty url input
function removeUrl(parent) {
   if (parent.children.length != 2) {
      parent.removeChild(parent.children[parent.children.length - 1]);
   }
}
// dispaly add tag modal
function addTagModal() {
   let modal = document.getElementById("modal");
   modal.style.display = "block";
   modal.addEventListener("click", (e) => {
      if (e.target.id == "modal") {
         hideModal();
      }
   });

   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";

   let form = document.createElement("form");

   let materialLabel = document.createElement("label");
   materialLabel.setAttribute("for", "material-input");
   materialLabel.innerText = "Input new Tag:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   materialInput.placeholder = `Current Tags: ta`;
   materialInput.required = true;
   form.appendChild(materialLabel);
   form.appendChild(materialInput);

   let submitButton = document.createElement("input");
   submitButton.type = "submit";
   submitButton.value = "submit";
   form.appendChild(submitButton);

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = [...e.target];
      types.push(e.target[0]);
   });

   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}
