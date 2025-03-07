function modifyData(id) { 
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