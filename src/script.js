const form = document.getElementById("form");
const results = document.getElementById("results");
  hljs.initHighlightingOnLoad();

const jsonURL = "profile.json";
// const url = "link to server"
  // function sendRequest(method, url, body = null) {
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   return fetch(url, {
  //     method: method,
  //     body: JSON.stringify(body),
  //     headers: headers,
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }

  //     return response.json().then((error) => {
  //       const e = new Error("Somethink went wrong");
  //       e.data = error;
  //       throw e;
  //     });
  //   });
  // }


function saveData() {
  const name = document.getElementById("name").value;
  const user = document.getElementById("user").value;
  const data = { name, user };
  const file = new File([JSON.stringify(data)], "profile.json", {
    type: "application/json",
  });

  const fileReader = new FileReader();
  fileReader.onload = () => {
    const jsonData = JSON.parse(fileReader.result);
    jsonData.name = name;
    jsonData.user = user;
    const updatedJsonData = JSON.stringify(jsonData);

    const blob = new Blob([updatedJsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  fileReader.readAsText(file);
}

  function getData(url) {
    return fetch(url)
       .then((response) =>{
         if (response.ok) {
           return response.json().then((data) => {
             const dataJson = JSON.stringify(data);
             results.innerHTML = dataJson;
             hljs.initHighlightingOnLoad();
           });
         }

         return response.json().then((error) => {
           const e = new Error("Something went wrong");
           e.data = error;
           throw e;
         });
       })  
  };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveData();
      //  const name = document.getElementById("name").value;
      //  const user = document.getElementById("user").value;
      //  const body = { name : `"${name}"`, user:`"${user}"` };
      // sendRequest(POST, url, body);
      getData(jsonURL);
      form.reset();
    });


// const isValidElement = (element) => {
//   return element.name && element.value;
// };
// const formToJSON = (elements) =>
//   [].reduce.call(
//     elements,
//     (data, element) => {
//       if (isValidElement(element)) {
//         data[element.name] = element.value;
//       }
//       return data;
//     },
//     {}
//   );

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const data = formToJSON(form.elements);
// //send data to profile.json

//   // variable dataObject contains the data from form
//   const dataObject = JSON.stringify(data, null, "  ");
  
   
//   //take data from profile.json
// getData(requestURL)
 
// // sendRequest("POST", requestURL, data)
// //   .then((data) => { 
// //     console.log(data)
// //   })
// //   .catch((err) => console.log(err));

// form.reset();

//   // const dataContainer = document.getElementById("results");
//   // dataContainer.textContent = dataObject;
// });



   
 