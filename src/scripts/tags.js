// Adding new Tag
function addTagModal() {
   let modal = document.getElementById("modal");
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";
   // create form for adding tags
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

   // add tag and hide modal on submit
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
   // display modal
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";
   let error = document.createElement("span");
   error.style.color = "red";
   error.style.display = "none";
   error.id = "error";
   // create form for deleting tags
   let form = tagForm();
   let submit = document.createElement("input");
   submit.type = "submit";
   submit.value = "Apply";
   form.appendChild(submit);
   // remove selected tag
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = new FormData(e.target);
      if (data.get("type")) {
         changeTag(data.get("type"), "");
         types.splice(data.get("type"), 1);
         displayData(materialsArr);
         hideModal();
      } else {
         error.style.display = "block";
         error.innerText = "no type selected!";
      }
   });

   // append content to modal
   modalContent.appendChild(error);
   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}

function modifyTagModal() {
   let modal = document.getElementById("modal");
   modal.style.display = "block";
   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";

   let error = document.createElement("span");
   error.style.color = "red";
   error.style.display = "none";
   error.id = "error"

   let form = tagForm();

   let modifTagLabel = document.createElement("label");
   modifTagLabel.setAttribute("for", "new-tag");
   modifTagLabel.innerText = "New tag:";
   modifTagLabel.appendChild(document.createElement("br"));

   let modifTagInput = document.createElement("input");
   modifTagInput.type = "text";
   modifTagInput.id = "new-tag";
   modifTagInput.name = "new-tag";
   modifTagInput.placeholder = "Plastic";
   modifTagLabel.appendChild(modifTagInput);
   form.appendChild(modifTagLabel);

   let submit = document.createElement("input");
   submit.type = "submit";
   submit.value = "Apply";
   form.appendChild(submit);

   form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = new FormData(e.target);

      // Change tag on submit
      if (data.get("type") !== null && data.get("new-tag") !== "") {
         changeTag(data.get("type"), data.get("new-tag"));
         types[data.get("type")] = data.get("new-tag");
         displayData(materialsArr);
         hideModal();
      } else if (data.get("new-tag") === "") {
         error.innerText = "No new tag set";
         error.style.display = "block";
      } else {
         error.innerText = "No tag selected to modify";
         error.style.display = "block";
      }
   });
   modalContent.appendChild(error);
   modalContent.appendChild(form);
   modal.appendChild(modalContent);
}

function tagForm() {
   let form = document.createElement("form");
   // Display all types
   types.forEach((type, index) => {
      let typeRadio = document.createElement("input");
      typeRadio.type = "radio";
      typeRadio.id = `type${index}`;
      typeRadio.name = `type`;
      typeRadio.value = index;

      let typeLabel = document.createElement("label");
      typeLabel.className = "type-label";
      typeLabel.innerText = type;
      typeLabel.setAttribute("for", `type${index}`);

      form.appendChild(typeRadio);
      form.appendChild(typeLabel);
      form.appendChild(document.createElement("br"));
   });
   return form;
}

function changeTag(oldTagId, newTag) {
   materialsArr.forEach((material) => {
      if (material.material === types[oldTagId]) {
         material.material = newTag;
      }
   });
}
