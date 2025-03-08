// display modify screen
function displayModify(id) {
   id = parseInt(id);
   // get modal
   let modal = document.getElementById("modal");
   modal.style.display = "block";
   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";

   // create table and display data

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
   // Create form for modifying data
   let error = document.createElement("span");
   error.style.color = "red";
   error.style.display = "none";
   error.id = "error";

   let form = document.createElement("form");

   let materialLabel = document.createElement("label");
   materialLabel.setAttribute("for", "material-input");
   materialLabel.innerText = "Material:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   materialInput.placeholder = `Available types: ${types.join(", ")}`;
   form.appendChild(materialLabel);
   form.appendChild(materialInput);

   let nameLabel = document.createElement("label");
   nameLabel.setAttribute("for", "name-input");
   nameLabel.innerText = "Name:";
   let nameInput = document.createElement("input");
   nameInput.id = "name-input";
   form.appendChild(nameLabel);
   form.appendChild(nameInput);

   let codeLabel = document.createElement("label");
   codeLabel.setAttribute("for", "code-input");
   codeLabel.innerText = "Recycling Code:";
   let codeInput = document.createElement("input");
   codeInput.id = "code-input";
   form.appendChild(codeLabel);
   form.appendChild(codeInput);

   let processLabel = document.createElement("label");
   processLabel.setAttribute("for", "process-input");
   processLabel.innerText = "Recycling Process:";
   let processInput = document.createElement("input");
   processInput.id = "process-input";
   form.appendChild(processLabel);
   form.appendChild(processInput);

   let acceptedLabel = document.createElement("label");
   acceptedLabel.setAttribute("for", "accepted-input");
   acceptedLabel.innerText = "Accepted Items:";
   let acceptedInput = document.createElement("textarea");
   acceptedInput.id = "accepted-input";
   acceptedInput.placeholder = `One or more of: ${accepted.toString()}`;
   form.appendChild(acceptedLabel);
   form.appendChild(acceptedInput);

   let nonAcceptedLabel = document.createElement("label");
   nonAcceptedLabel.setAttribute("for", "non-accepted-input");
   nonAcceptedLabel.innerText = "Non Accepted Items:";
   let nonAcceptedInput = document.createElement("textarea");
   nonAcceptedInput.id = "non-accepted-input";
   nonAcceptedInput.placeholder = `One or more of: ${nonAccepted.toString()}`;
   form.appendChild(nonAcceptedLabel);
   form.appendChild(nonAcceptedInput);

   let recyclabilityLabel = document.createElement("label");
   recyclabilityLabel.setAttribute("for", "recyclability-input");
   recyclabilityLabel.innerText = "Recyclability:";
   let recyclabilityInput = document.createElement("input");
   recyclabilityInput.id = "recyclability-input";
   form.appendChild(recyclabilityLabel);
   form.appendChild(recyclabilityInput);

   let environmentalLabel = document.createElement("label");
   environmentalLabel.setAttribute("for", "environmental-input");
   environmentalLabel.innerText = "Environmental Impact:";
   let environmentalInput = document.createElement("input");
   environmentalInput.id = "environmental-input";
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

   // validate data on submit
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = [...e.target];
      isValid = validateModify(data);
      if (isValid == 0) {
         modifyData(id, data);
      } else {
         invalid(isValid, data);
      }
   });
   //append row
   modTable.appendChild(row);
   // append images
   modalContent.appendChild(modTable);
   if (materialsArr[id].hasOwnProperty("urls")) {
      modalContent.appendChild(createImageModif(materialsArr[id]["urls"], id));
   }
   // append form
   modalContent.appendChild(error);
   modalContent.appendChild(form);
   // display all
   modal.appendChild(modalContent);
}

function modifyData(id, data) {
   let urlArr = [];
   let bin_colour;
   // assign bin colour
   if (data[0].value !== "" && data[2].value !== "") {
      bin_colour = assignBin(data[0].value, data[2].value);
   } else {
      bin_colour = materialsArr[id].bin;
   }

   // get all urls
   for (let i = 8; i <= data.length - 1; i++) {
      if (data[i].type === "url" && data[i].value !== "") {
         urlArr.push(data[i].value);
      }
   }
   // assign new values
   if (data[0].value !== "") {
      materialsArr[id].material = data[0].value;
   }

   if (data[1].value !== "") {
      materialsArr[id].name = data[1].value;
   }

   if (data[2].value !== "") {
      materialsArr[id].code = data[2].value;
   }

   if (data[3].value !== "") {
      materialsArr[id].process = data[3].value;
   }

   if (data[4].value !== "") {
      materialsArr[id].accepted = data[4].value;
   }

   if (data[5].value !== "") {
      materialsArr[id].non_accepted = data[5].value;
   }

   if (data[6].value !== "") {
      materialsArr[id].recyclability = data[6].value;
   }

   if (data[7].value !== "") {
      materialsArr[id].impact = data[7].value;
   }

   if (bin_colour !== "") {
      materialsArr[id].bin = bin_colour;
   }
   if (urlArr !== "") {
      materialsArr[id].urls = urlArr;
   }
   // display changed data
   displayData(materialsArr);
   // hide modal
   hideModal();
}
