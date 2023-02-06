
const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: "editorjs",

  tools: {
    header: {
      class: Header,
      shortcut: "CMD+SHIFT+H",
    },
  },
});
editor.isReady
  .then(() => {
    console.log("Editor.js is ready to work!");
    /** Do anything you need after editor initialization */
  })
  .catch((reason) => {
    console.log(`Editor.js initialization failed because of ${reason}`);
  });




const saveButton = document.getElementById("save-button");

    saveButton.addEventListener("click", () => {
      editor.save().then((savedData) => {
        let savedDataJson = JSON.stringify(savedData, null, 4);
        console.log(savedDataJson);
      }).catch((error) => {
     console.log("Saving failed: ", error);
   });
    });



// document.querySelector("form").addEventListener("submit", (event) => {
//   let formData = new FormData(event.target);

//   editor.data.blocks.push({
//     name: formData.get("name"),
//     user: formData.get("user"),
//   });

//   editor
//     .save()
//     .then((savedData) => {
//       let savedDataJson = JSON.stringify(savedData, null, 4);
//       console.log(savedDataJson);
//     })
//     .catch((error) => {
//       console.log("Saving failed: ", error);
//     });
//   // editor.render();
// });



// const form = document.getElementById("form");

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

//   // const fs = require("fs");
//   // fs.writeFileSync("data.json", dataObject);

//   form.reset();

//   const dataContainer = document.getElementsByClassName("results")[0];
//   dataContainer.textContent = JSON.stringify(data, null, "  ");
// });
