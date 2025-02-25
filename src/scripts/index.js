let materialsArr = [];
let order = ["none", 0];
let types = [];
let accepted = [];
let nonAccepted = [];

// fetching data asynchronously
async function fetchData() {
   const response = await fetch("recycling.json");
   const json = await response.json();
   return json;
}

// saving data into an array
fetchData().then((json) => {
   json.materials.forEach((material) => {
      // assign bin to each record
      if(!types.includes(material.type)) {
         types.push(material.type);
      }
      let type = material.type;
   
      
      // put data into an array of objects and assing proper bin colours to plastic materials
      material.categories.forEach((cat) => {
         let bin_colour = assignBin(type, cat.recycling_code);
         // list of all accepted
         // if(!accepted.includes(cat.accepted_items)) {
         //    accepted.push(cat.accepted_items);
         // }
         // list of all non accepted
         // if(!nonAccepted.includes(cat.non_accepted_items)) {
         //    nonAccepted.push(cat.non_accepted_items);
         // }
         // list of all accepted exclusive
         cat.accepted_items.forEach(item => {
            if(!accepted.includes(item)) accepted.push(item);
         })
         // list of all non accepted exclusive
         cat.non_accepted_items.forEach(item => {
            if(!nonAccepted.includes(item)) nonAccepted.push(item);
         })
         materialsArr.push({
            material: type,
            name: cat.name,
            code: cat.recycling_code,
            process: cat.recycling_process,
            accepted: cat.accepted_items,
            non_accepted: cat.non_accepted_items,
            recyclability: cat.recyclability,
            impact: cat.environmental_impact,
            bin: bin_colour,
         });
         if (cat.hasOwnProperty("urls")) {
            materialsArr[materialsArr.length - 1]["urls"] = cat.urls;
         }
      });
   });
   displayData(materialsArr);
});

// assigning bin colour
function assignBin(type, code) {
   let bin_colour;
   switch (type) {
      case "Glass":
         bin_colour = "Blue";
         break;

      case "Metal":
         bin_colour = "Blue";
         break;

      case "Paper":
         bin_colour = "Blue";
         break;

      case "Organic Waste":
         bin_colour = "Green";
         break;

      default:
         bin_colour = "Gray";
         break;
   }
   if (code == 1 || code == 2)
      bin_colour = "Blue";
   if (code == 3) bin_colour = "Brown";
   return bin_colour
}

// displaying data
function displayData(data) {
   let display = document.getElementById("display");
   display.innerHTML = "";
   let table = document.createElement("table");
   let headRow = document.createElement("tr");
   let check = false;
   let inCheck = false;
   materialsArr.forEach(material => {
      if (material.hasOwnProperty("urls")) check = true;
   })
   for (property in materialsArr[0]) {
      let header = document.createElement("th");
      header.className = "table-head";
      if (property != "urls") {
         header.innerText = property;
         header.addEventListener("click", (e) => {
            sortData(e.target.innerText);
         });
      } else {
         header.innerText = property;
         header.addEventListener("click", (e) => {
            sortData(e.target.innerText);
         });
         inCheck = true;
      }
      headRow.appendChild(header);
   }
   if(check  && !inCheck){
      let header = document.createElement("th");
      header.className = "table-head";
      header.innerText = "urls";
      header.addEventListener("click", (e) => {
         sortData(e.target.innerText);
      })
      headRow.appendChild(header);
   }
      
   table.appendChild(headRow);

   for (let i = 0; i < data.length; i++) {
      let row = document.createElement("tr");
      row.id = i;
      row.addEventListener("click", (e) => {
         if (e.target.className != "control-button") specific(i);
      });
      for (material in data[i]) {
         let tableData = document.createElement("td");
         tableData.innerText = data[i][material];
         row.appendChild(tableData);
      }
      if(check && !data[i].hasOwnProperty('urls')) {
         let tableData = document.createElement("td");
         tableData.innerText = '';
         row.appendChild(tableData);
      }

      let delButton = document.createElement("button");
      delButton.className = "control-button";
      delButton.innerText = "Delete";
      delButton.addEventListener("click", (e) => {
         confirmDelete(i);
      });

      let modifButton = document.createElement("button");
      modifButton.className = "control-button";
      modifButton.innerText = "Modify";
      modifButton.addEventListener("click", (e) => {
         modifyData(i);
      });

      let buttonsContainer = document.createElement("td");
      buttonsContainer.className = "buttons-container";
      buttonsContainer.appendChild(delButton);
      buttonsContainer.appendChild(modifButton);
      row.appendChild(buttonsContainer);
      table.appendChild(row);
   }
   display.appendChild(table);
}

// sorting
function sortData(key) {
   if (order[0] == key && order[1] == 1) {
      materialsArr = materialsArr.reverse();
   } else {
      order[0] = key;
      order[1] = 1;
      switch (key) {
         case "material":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.material.toLowerCase();
               let y = b.material.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "name":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.name.toLowerCase();
               let y = b.name.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "code":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.code;
               let y = b.code;
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "process":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.process.toLowerCase();
               let y = b.process.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         // sort by array first value
         case "accepted":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.accepted[0].toLowerCase();
               let y = b.accepted[0].toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         // sort by array first value
         case "non_accepted":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.non_accepted[0].toLowerCase();
               let y = b.non_accepted[0].toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "recyclability":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.recyclability.toLowerCase();
               let y = b.recyclability.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "impact":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.impact.toLowerCase();
               let y = b.impact.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "bin":
            materialsArr = materialsArr.sort((a, b) => {
               let x = a.bin.toLowerCase();
               let y = b.bin.toLowerCase();
               if (x > y) return 1;
               if (x < y) return -1;
               return 0;
            });
            break;
         case "urls":
            materialsArr = materialsArr.sort((a, b) => {
               if (a.hasOwnProperty('urls') && b.hasOwnProperty('urls')) {
                  let x = a.urls.toLowerCase();
                  let y = b.urls.toLowerCase();
                  if(x > y) return 1;
                  if(x < y) return -1;
                  return 0;
               } else if (a.hasOwnProperty('urls') && !b.hasOwnProperty('urls')) {
                  return 1;
               } else if(!a.hasOwnProperty('urls') && b.hasOwnProperty('urls')) {
                  return -1;
               } else {
                  let x = a.name.toLowerCase();
                  let y = b.name.toLowerCase();
                  if (x > y) return 1;
                  if (x < y) return -1;
                  return 0;
               }
            })
      }
   }
   displayData(materialsArr);
}

// Display row data in a modal
function specific(id) {
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

   modTable.appendChild(row);
   modalContent.appendChild(modTable);
   modalContent.className = "modal-content";
   modal.appendChild(modalContent);
}

// Ask if data should be deleted
function confirmDelete(id) {
   let modal = document.getElementById("modal");
   modal.style.display = "block";
   modal.addEventListener("click", (e) => {
      if (e.target.id == "modal") {
         hideModal();
      }
   });

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

// delete data
function deleteData(id) {
   materialsArr.splice(id, 1);
   displayData(materialsArr);
}
// hide and clear modal content
function hideModal() {
   document.getElementById("modal").style.display = "none";
   document.getElementById("modal").innerHTML = "";
}


// display form for adding data in a modal
function addModal() {
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
   materialLabel.innerText = "Material:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   form.appendChild(materialLabel);
   form.appendChild(materialInput);

   let nameLabel = document.createElement("label");
   nameLabel.setAttribute("for", "name-input");
   nameLabel.innerText = "Name:";
   let nameInput = document.createElement("input");
   nameInput.id = "name-input";
   form.appendChild(nameLabel);
   form.appendChild(nameInput);

   let codeLabel= document.createElement("label");
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
   let acceptedInput = document.createElement("input");
   acceptedInput.id = "accepted-input";
   form.appendChild(acceptedLabel);
   form.appendChild(acceptedInput);
   
   let nonAcceptedLabel = document.createElement("label");
   nonAcceptedLabel.setAttribute("for", "non-accepted-input");
   nonAcceptedLabel.innerText = "Non Accepted Items:";
   let nonAcceptedInput = document.createElement("input");
   nonAcceptedInput.id = "non-accepted-input";
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

   let urlLabel = document.createElement("label");
   urlLabel.setAttribute("for", "url-input");
   urlLabel.innerText = "URLs:";
   let urlInput = document.createElement("input");
   urlInput.id = "url-input";
   form.appendChild(urlLabel);
   form.appendChild(urlInput);

   let submitButton = document.createElement("input");
   submitButton.type = "submit";
   submitButton.value = "submit";
   form.appendChild(submitButton);

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = [...e.target];
      addData(data);
   });

   modalContent.appendChild(form);
   modal.appendChild(modalContent);

}

function addData(data) {
   let bin_colour = assignBin(data[0].value, data[0].process);
   materialsArr.push({
      material: data[0].value,
      name: data[1].value,
      code: data[2].value,
      process: data[3].value,
      accepted: data[4].value,
      non_accepted: data[5].value,
      recyclability: data[6].value,
      impact: data[7].value,
      bin: bin_colour,
      urls: data[8].value,
   });
   displayData(materialsArr);
   hideModal()
}

// todo:
// Modifying data
// Form validation

function modifyData(i) {
   
}