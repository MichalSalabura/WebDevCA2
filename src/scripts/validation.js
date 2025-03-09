// validate form inputs while adding
function validate(data) {
   let acceptedReg = new RegExp("^([a-zA-Z]+,*s?)+");
   let codeReg = new RegExp("^[A-Z]{1}d*|d");
   let nameReg = new RegExp(".{3,}");
   let lengthReg = new RegExp(".{1,}");
   // check if type exists
   if (!types.includes(data[0].value)) {
      return 1;
   }
   // check if accepted item exists
   let accItemsArr = data[4].value.split(",").map((item) => item.trim());
   for (let element of accItemsArr) {
      if (!accepted.includes(element)) return 4;
   }
   // check if accepted items matches regex
   if (!acceptedReg.test(data[4].value)  && data[4].value !== "") return 5;
   // check if non accepted item exists
   let nonAccItemsArr = data[5].value.split(",").map((item) => item.trim());
   for (let element of nonAccItemsArr) {
      if (!nonAccepted.includes(element)) return 6;
   }
   // check if non accepted items matches regex
   if (!acceptedReg.test(data[5].value) && data[5].value !== "") return 7;

   // check for name
   if (!nameReg.test(data[1].value) && data[1].value !== "") return 8;

   // check for code
   if (!codeReg.test(data[2].value) && data[2].value !== "") return 9;
   // check for length
   if (!lengthReg.test(data[3].value) && data[3].value !== "") return 10;
   if (!lengthReg.test(data[6].value) && data[6].value !== "") return 11;
   if (!lengthReg.test(data[7].value) && data[7].value !== "") return 12;
   // return 0 if no errors
   return 0;
}

// validation for modifying
function validateModify(data) {
   if (!types.includes(data[0].value) && data[0].value !== "") {
      return 1;
   }
   if (data[4].value !== "") {
      let accItemsArr = data[4].value.split(",").map((item) => item.trim());
      for (let element of accItemsArr) {
         if (!accepted.includes(element)) return 4;
      }
   }
   if (!acceptedReg.test(data[4].value)) return 5;

   if (data[5].value !== "") {
      let nonAccItemsArr = data[5].value.split(",").map((item) => item.trim());
      for (let element of nonAccItemsArr) {
         if (!nonAccepted.includes(element)) return 6;
      }
   }
   if (!acceptedReg.test(data[5].value)) return 7;

   // check for name
   if (!nameReg.test(data[1].value)) return 8;

   // check for code
   if (!codeReg.test(data[2].value)) return 9;
   // check for length
   if (!lengthReg.test(data[3].value)) return 10;
   if (!lengthReg.test(data[6].value)) return 11;
   if (!lengthReg.test(data[7].value)) return 12;

   return 0;
}
// Return error message
function invalid(errorCode, data) {
   let errorContainer = document.getElementById("error");
   switch (errorCode) {
      case 1:
         errorContainer.innerText = "Not a valid material type";
         errorContainer.style.display = "block";
         data[0].value = "";
         data[0].focus();
         break;

      case 4:
         errorContainer.innerText = "Not on the list of accepted items!";
         errorContainer.style.display = "block";
         data[4].value = "";
         data[4].focus();
         break;
      case 5:
         errorContainer.innerText =
            'Accepted not in a proper format: "Bottles, Toys"';
         errorContainer.style.display = "block";
         data[4].value = "";
         data[4].focus();
         break;
      case 6:
         errorContainer.innerText = "Not on the list of nonaccepted items!";
         errorContainer.style.display = "block";
         data[5].value = "";
         data[5].focus();
         break;
      case 7:
         errorContainer.innerText =
            'Non-accepted not in a proper format: "Bottles, Toys"';
         errorContainer.style.display = "block";
         data[5].value = "";
         data[5].focus();
         break;
      case 8:
         errorContainer.innerText = "Name needs to be at least 3 letters long";
         errorContainer.style.display = "block";
         data[1].value = "";
         data[1].focus();

         break;
      case 9:
         errorContainer.innerText =
            "Code has to start with a digit or be a lettern followed by digits";
         errorContainer.style.display = "block";
         data[2].value = "";
         data[2].focus();
         break;
      case 10:
         errorContainer.innerText = "Process has to be at least 1 letter";
         errorContainer.style.display = "block";
         data[3].value = "";
         data[3].focus();
         break;
      case 11:
         errorContainer.innerText = "Recyclability has to be at least 1 letter";
         errorContainer.style.display = "block";
         data[6].value = "";
         data[6].focus();
         break;
      case 12:
         errorContainer.innerText = "Impact has to be at least 1 letter";
         errorContainer.style.display = "block";
         data[7].value = "";
         data[7].focus();
         break;
      default:
         break;
   }
}
