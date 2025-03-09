let materialsArr = [];
let order = ["none", 0];
let types = [];
let accepted = [];
let nonAccepted = [];

// hide modal on click
modal.addEventListener("click", (e) => {
   if (e.target.id == "modal") {
      hideModal();
   }
});

// fetching data asynchronously
async function fetchData() {
   const response = await fetch("recycling.json");
   const json = await response.json();
   return json;
}

// saving data into an array
fetchData()
   .then((json) => {
      json.materials.forEach((material) => {
         // assign bin to each record
         if (!types.includes(material.type)) {
            types.push(material.type);
         }
         let type = material.type;

         // put data into an array of objects and assing proper bin colours to plastic materials
         material.categories.forEach((cat) => {
            // get bin colour
            let bin_colour = assignBin(type, cat.recycling_code);

            // list of all accepted exclusive
            cat.accepted_items.forEach((item) => {
               if (!accepted.includes(item)) accepted.push(item);
            });
            // list of all non accepted exclusive
            cat.non_accepted_items.forEach((item) => {
               if (!nonAccepted.includes(item)) nonAccepted.push(item);
            });
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
   })
   .then(() => {
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
   if (code == 1 || code == 2) bin_colour = "Blue";
   if (code == 3) bin_colour = "Brown";
   return bin_colour;
}

// Creates and returns container with images
function createImage(urls) {
   let imageContainer = document.createElement("div");
   imageContainer.id = "img-container";
   for (let i = 0; i < urls.length; i++) {
      let image = document.createElement("img");
      image.classList = "displayed-img";
      image.src = urls[i];
      imageContainer.appendChild(image);
   }
   return imageContainer;
}
// creates and returns container with images that can be removed
function createImageModif(urls, id) {
   let imageContainer = document.createElement("div");
   imageContainer.id = "img-container";
   for (let i = 0; i < urls.length; i++) {
      let image = document.createElement("img");
      image.classList = "displayed-img";
      image.src = urls[i];
      image.addEventListener("click", (e) => {
         index = materialsArr[id]["urls"].indexOf(e.target.src);
         materialsArr[id]["urls"].splice(index, 1);
         displayData(materialsArr);
         hideModal();
         displayModify(id);
      });
      imageContainer.appendChild(image);
   }
   return imageContainer;
}

// Add empty url input
function addUrl(parent) {
   let urlInput = document.createElement("input");
   urlInput.classList = "input-field url-input";
   urlInput.type = "url";
   urlInput.pattern = "https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(/.*)?";
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
// todo:
// Proper Form validation
// Styling
