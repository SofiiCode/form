
// var editor = new EditorJS(); /** Zero-configuration */

// // equals

// var editor = new EditorJS("editorjs");

const form = document.getElementById("form");

const isValidElement = (element) => {
  return element.name && element.value;
};
const formToJSON = (elements) =>
  [].reduce.call(
    elements,
    (data, element) => {
      if (isValidElement(element)) {
        data[element.name] = element.value;
      }
      return data;
    },
    {}
  );

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = formToJSON(form.elements);
  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName("results")[0];
  const dataObject = JSON.stringify(data, null, "  ");
  let response = fetch("https://stellular-dasik-2e4999.netlify.app/", {
    method: "POST",
    body: dataObject,
  });
  form.reset();
  // alert('Your data in the test.json')
  console.log(dataObject);
  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");
});
