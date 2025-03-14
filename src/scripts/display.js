// displaying data by getting a display div and creating table in it
function displayData(data) {
   let display = document.getElementById("display");
   display.innerHTML = "";
   let table = document.createElement("table");
   table.id = "display-table"
   // Create headers
   let headRow = document.createElement("tr");
   headRow.classList = "th-row"
   let check = false;
   let inCheck = false;
   materialsArr.forEach((material) => {
      if (material.hasOwnProperty("urls")) check = true;
   });
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
   if (check && !inCheck) {
      let header = document.createElement("th");
      header.className = "table-head";
      header.innerText = "urls";
      header.addEventListener("click", (e) => {
         sortData(e.target.innerText);
      });
      headRow.appendChild(header);
   }

   table.appendChild(headRow);
   // Create rows
   for (let i = 0; i < data.length; i++) {
      let row = document.createElement("tr");
      row.classList = "table-row"
      row.id = i;
      row.addEventListener("click", (e) => {
         if (e.target.className != "control-button") specific(i);
      });
      for (material in data[i]) {
         let tableData = document.createElement("td");
         tableData.classList = "display-cell"
         tableData.innerText = data[i][material];
         row.appendChild(tableData);
      }
      if (check && !data[i].hasOwnProperty("urls")) {
         let tableData = document.createElement("td");
         tableData.classList = "display-cell"
         tableData.innerText = "";
         row.appendChild(tableData);
      }
      // Create buttons for modifying and deleting
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
         displayModify(i);
      });
      // append elements to table
      let buttonsContainer = document.createElement("td");
      buttonsContainer.id = "buttons-container";
      buttonsContainer.appendChild(delButton);
      buttonsContainer.appendChild(modifButton);
      row.appendChild(buttonsContainer);

      table.appendChild(row);
   }
   // append table to display
   display.appendChild(table);
}

// display menu
const menu = document.querySelector(".menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
menu.addEventListener("click", () => {
   menu.classList.toggle("active");
   offScreenMenu.classList.toggle("active");
});
