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
         case "urls":
            materialsArr = materialsArr.sort((a, b) => {
               if (a.hasOwnProperty("urls") && b.hasOwnProperty("urls")) {
                  let x = a.urls.toLowerCase();
                  let y = b.urls.toLowerCase();
                  if (x > y) return 1;
                  if (x < y) return -1;
                  return 0;
               } else if (
                  a.hasOwnProperty("urls") &&
                  !b.hasOwnProperty("urls")
               ) {
                  return -1;
               } else if (
                  !a.hasOwnProperty("urls") &&
                  b.hasOwnProperty("urls")
               ) {
                  return 1;
               } else {
                  let x = a.name.toLowerCase();
                  let y = b.name.toLowerCase();
                  if (x > y) return 1;
                  if (x < y) return -1;
                  return 0;
               }
            });
      }
   }
   displayData(materialsArr);
}
