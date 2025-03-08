// Adding new Tag
function addTagModal() {
   let modal = document.getElementById("modal");
   modal.style.display = "block";

   let modalContent = document.createElement("div");
   modalContent.className = "modal-content";
   // create form for adding tags
   let form = document.createElement("form");
   form.id = "modal-form";

   let tagLabel = document.createElement("label");
   tagLabel.classList = "input-label"
   tagLabel.setAttribute("for", "material-input");
   tagLabel.innerText = "Input new Tag:";
   let tagInput = document.createElement("input");
   tagInput.id = "material-input";
   tagInput.classList = "material-field"
   tagInput.placeholder = `Current Tags: ${types.toString()}`;
   tagInput.required = true;
   form.appendChild(tagLabel);
   form.appendChild(tagInput);

   let submitButton = document.createElement("input");
   submitButton.classList = "submit-button"
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
   submit.classList = "submit-button";
   submit.type = "submit";
   submit.value = "Delete";
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
   modifTagLabel.classList = "input-label";
   modifTagLabel.setAttribute("for", "new-tag");
   modifTagLabel.innerText = "New tag:";
   modifTagLabel.appendChild(document.createElement("br"));

   let modifTagInput = document.createElement("input");
   modifTagInput.id = "new-tag";
   modifTagInput.ClassList = "input-field";
   modifTagInput.type = "text";
   modifTagInput.name = "new-tag";
   modifTagInput.placeholder = "Plastic";
   modifTagLabel.appendChild(modifTagInput);
   form.appendChild(modifTagLabel);

   let submit = document.createElement("input");
   submit.classList = "submit-button";
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
   form.id = "modal-form";
   // Display all types
   types.forEach((type, index) => {
      let radioContainer = document.createElement('div');
      radioContainer.classList = "radio-container";

      let typeRadio = document.createElement("input");
      typeRadio.id = `type${index}`;
      typeRadio.classList = "input-radio";
      typeRadio.type = "radio";
      typeRadio.name = `type`;
      typeRadio.value = index;

      let typeLabel = document.createElement("label");
      typeLabel.classList = "type-label input-label";
      typeLabel.innerText = type;
      typeLabel.setAttribute("for", `type${index}`);

      radioContainer.appendChild(typeRadio);
      radioContainer.appendChild(typeLabel);
      form.appendChild(radioContainer);
   })
   return form;
}

function changeTag(oldTagId, newTag) {
   materialsArr.forEach((material) => {
      if (material.material === types[oldTagId]) {
         material.material = newTag;
      }
   });
}
