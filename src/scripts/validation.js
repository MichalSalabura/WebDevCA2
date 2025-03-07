// validate form inputs while adding
function validate(data) {
   // check if type exists
   if (!types.includes(data[0].value)) {
      return 1;
   }
// check if accepted item exists
   let accItemsArr = data[4].value.split(",").map((item) => item.trim());
   for (let element of accItemsArr) {
      if (!accepted.includes(element)) return 4;
   }
// check if non accepted item exists
   let nonAccItemsArr = data[5].value.split(",").map((item) => item.trim());
   for (let element of nonAccItemsArr) {
      if (!nonAccepted.includes(element)) return 5;
   }
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

   if (data[5].value !== "") {
      let nonAccItemsArr = data[5].value.split(",").map((item) => item.trim());
      for (let element of nonAccItemsArr) {
         if (!nonAccepted.includes(element)) return 5;
      }
   }

   return 0;
}
// Return error message
function invalid(errorCode, data) {
   switch (errorCode) {
      case 1:
         data[0].placeholder = "Not a valid material type!";
         data[0].value = "";
         break;

      case 4:
         data[4].placeholder = "Not on the list of accepted items!";
         data[4].value = "";
         break;
      case 5:
         data[5].placeholder = "Not on the list of nonaccepted items!";
         data[5].value = "";
         break;
      default:
         break;
   }
}
