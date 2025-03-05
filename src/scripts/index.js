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
}).then( () => {
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

// delete data
function deleteData(id) {
   materialsArr.splice(id, 1);
   displayData(materialsArr);
}

// add data
function addData(data) {
   // add more than 1 url
   let urlArr = [];
   for(let i = 8; i <= data.length-1; i++) {
      if(data[i].type === "url" && data[i].value !== "") {
         urlArr.push(data[i].value);
      }
   }
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
      urls: urlArr,
   });
   displayData(materialsArr);
   hideModal()
}

// todo:
// Modifying data
// Form validation

function modifyData(i) { 
}