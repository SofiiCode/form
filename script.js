

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

  // variable dataObject contains the data from form 
  const dataObject = JSON.stringify(data, null, "  ");

  // const fs = require("fs");
  // fs.writeFileSync("data.json", dataObject);

  form.reset();
 

  const dataContainer = document.getElementsByClassName("results")[0];
  dataContainer.textContent = JSON.stringify(data, null, "  ");
});
