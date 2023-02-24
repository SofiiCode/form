const form = document.getElementById("form");
const results = document.getElementById("results");
  hljs.initHighlightingOnLoad();


//link to server
const url = "https://jsonplaceholder.typicode.com/users";

  function sendRequest(method, url, body) {
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.json().then((error) => {
        const e = new Error("Somethink went wrong");
        e.data = error;
        throw e;
      });
    });
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
     
       const name = document.getElementById("name").value;
       const user = document.getElementById("user").value;
       const body = { name: `${name}`, user:`${user}` };
      
      sendRequest("POST", url, body).catch((err) => console.log(err));
      getData(url);
      form.reset();
    });



 