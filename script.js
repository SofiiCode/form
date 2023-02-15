const form = document.getElementById("form");
const url = "https://github.com/SofiiCode/form/blob/main/profile.json";
  
  const requestURL = "https://jsonplaceholder.typicode.com/users";

  function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject(xhr.response);
      };

      xhr.send(JSON.stringify(body));
    });
  }

  sendRequest("GET", requestURL)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));



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

//   // variable dataObject contains the data from form
//   const dataObject = JSON.stringify(data, null, "  ");


//   form.reset();

//   const dataContainer = document.getElementsByClassName("results")[0];
//   dataContainer.textContent = dataObject;
// });


const saveButton = document.getElementById("save-button");

const editor = new EditorJS({
  holder: "editorjs",

  tools: {
    header: {
      class: Header,
    },

    raw: RawTool,
  },
  data: {
    blocks: [
      {
        type: "raw",
        data: {
          html: '"{"name":"","user":""},"',
        },
      },
    ],
  },

  onChange: (api, event) => {
    console.log("Now I know that Editor's content changed!", event);
  },
});

editor.isReady
  .then(() => {
    console.log("Editor.js is ready to work!");
  //  saveButton.click();
    /** Do anything you need after editor initialization */
  })
  .catch((reason) => {
    console.log(`Editor.js initialization failed because of ${reason}`);
  });

    saveButton.addEventListener("click", () => {
       editor
         .save()
         .then((savedData) => {
          let data = savedData.blocks[0].data.html;
        
           let savedDataJson = JSON.stringify(data, null, 4);
           console.log(savedDataJson);
         })
         .catch((error) => {
           console.log("Saving failed: ", error);
         });
    });
