// Adding new Tag
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
   materialInput.placeholder = `Current Tags: ${types.toString()}`;
   materialInput.required = true;
   form.appendChild(materialLabel);
   form.appendChild(materialInput);

   let submitButton = document.createElement("input");
   submitButton.type = "submit";
   submitButton.value = "submit";
   form.appendChild(submitButton);

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      types.push(e.target[0].value);
      hideModal();
   });

   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}
// Removing tags
function deleteTagModal() {
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
   materialLabel.innerText = "Input Tag to remove:";
   let materialInput = document.createElement("input");
   materialInput.id = "material-input";
   materialInput.placeholder = `Existing Tags: ${types.toString()}`;
   materialInput.required = true;
   form.appendChild(materialLabel);
   form.appendChild(materialInput);
   let error = document.createElement("span");
   form.appendChild(error);

   let submitButton = document.createElement("input");
   submitButton.type = "submit";
   submitButton.value = "submit";
   form.appendChild(submitButton);

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target[0].value !== "" && types.includes(e.target[0].value)) {
         types.splice(types.indexOf(e.target[0].value), 1);
         hideModal();
      } else {
         error.innerText = "No such type!";
      }
   });

   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}
