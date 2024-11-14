let ourObject = {
  "name": "ben",
  "profession": "og rizzler",
  "age": 23
}

console.log(ourObject);

let myData = {};

function fetchData() {
  fetch('https://catfact.ninja/fact')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        console.log(res);
      }
    })
    .then(data => {
      myData = data;
      console.log(myData);
      document.getElementById("fact").innerText = myData.fact;
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById("generate").addEventListener("click", e => {
  fetchData();
});

fetchData();