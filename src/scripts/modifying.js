function displayModify(id) {
   id = parseInt(id);
   let modal = document.getElementById("modal");
   modal.style.display = "block";
   modal.addEventListener("click", (e) => {
      if (e.target.id == "modal") {
         hideModal();
      }
   });
   let modalContent = document.createElement("div");
   let modTable = document.createElement("table");
   let headRow = document.createElement("tr");
   for (property in materialsArr[id]) {
      let header = document.createElement("th");
      header.innerText = property;
      headRow.appendChild(header);
   }
   modTable.appendChild(headRow);

   let row = document.createElement("tr");
   for (property in materialsArr[id]) {
      let tableContent = document.createElement("td");
      tableContent.innerText = materialsArr[id][property];
      row.appendChild(tableContent);
   }
   let form = document.createElement("form");

   let materialLabel = document.createElement("label");
   materialLabel.setAttribute("for", "material-input");
   materialLabel.innerText = "Material:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   materialInput.placeholder =
      "Ex. Plastic, Glass, Metal, Paper, Organic Waste";
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
   acceptedInput.placeholder = `One or more of: ${accepted.toString()}`;
   acceptedInput.required = true;
   form.appendChild(acceptedLabel);
   form.appendChild(acceptedInput);

   let nonAcceptedLabel = document.createElement("label");
   nonAcceptedLabel.setAttribute("for", "non-accepted-input");
   nonAcceptedLabel.innerText = "Non Accepted Items:";
   let nonAcceptedInput = document.createElement("textarea");
   nonAcceptedInput.id = "non-accepted-input";
   nonAcceptedInput.placeholder = `One or more of: ${nonAccepted.toString()}`;
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

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = [...e.target];
      isValid = validate(data);
      if (isValid == 0) {
         modifyData(id, data);
      } else {
         invalid(isValid, data);
      }
   });

   modTable.appendChild(row);
   modalContent.appendChild(modTable);
   modalContent.appendChild(form);
   modalContent.className = "modal-content";
   modal.appendChild(modalContent);
}

function modifyData(id, data) {
   let urlArr = [];
   for (let i = 8; i <= data.length - 1; i++) {
      if (data[i].type === "url" && data[i].value !== "") {
         urlArr.push(data[i].value);
      }
   }
   let bin_colour = assignBin(data[0].value, data[0].process);
   materialsArr[id].material = data[0].value;
   materialsArr[id].name = data[1].value;
   materialsArr[id].code = data[2].value;
   materialsArr[id].process = data[3].value;
   materialsArr[id].accepted = data[4].value;
   materialsArr[id].non_accepted = data[5].value;
   materialsArr[id].recyclability = data[6].value;
   materialsArr[id].impact = data[7].value;
   materialsArr[id].bin = bin_colour;
   materialsArr[id].urls = urlArr;
   displayData(materialsArr);
   hideModal();
}