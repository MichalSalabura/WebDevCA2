let materialsArr = [];
let order = ["none", 0];

// fetching data asynchronously
async function fetchData() {
   const response = await fetch("./public/recycling.json");
   const json = await response.json();
   return json;
}

// saving data into an array
fetchData().then((json) => {
   json.materials.forEach((material) => {
      // assign bin to each record
      let type = material.type;
      let bin_colour;
      switch (material.type) {
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
            break;
      }
      // put data into an array of objects and assing proper bin colours to plastic materials
      material.categories.forEach((cat) => {
         if (cat.recycling_code == 1 || cat.recycling_code == 2)
            bin_colour = "Blue";
         if (cat.recycling_code == 3) bin_colour = "Brown";
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

// displaying data
function displayData(data) {
   let display = document.getElementById("display");
   display.innerHTML = "";
   let table = document.createElement("table");
   let headRow = document.createElement("tr");
   for (property in materialsArr[0]) {
      let header = document.createElement("th");
      header.className = "table-head";
      if (property != "urls") {
         header.innerText = property;
         header.addEventListener("click", (e) => {
            sortData(e.target.innerText);
         });
      }
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
         if (material != "urls") {
            let tableData = document.createElement("td");
            tableData.innerText = data[i][material];
            row.appendChild(tableData);
         }
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

// todo
function modifyData(i) {}

function addData() {}
