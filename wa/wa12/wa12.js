let myData = {};

function fetchData(){
    const comicNumber = Math.floor(Math.random()*3000)+1;
fetch(`https://corsproxy.io/?https://xkcd.com/${comicNumber}/info.0.json`)
.then(res => {
    if (res.ok) {
      return res.json();
    }
    else {
      console.log(res);
    }
  })
  .then(res => {
    myData = res;
    console.log(myData);
    document.getElementById("comicTitle").innerHTML = myData.title;
    document.getElementById("comicImg").src = myData.img;
    document.getElementById("comicAltText").setAttribute("alt",myData.alt);

    let m = myData.month;
    let d = myData.day;
    let y = myData.year;
    document.getElementById("comicDate").innerHTML = (m + '/' + d + '/' + y);

  })
  .catch(error => {console.log(error)})
}
fetchData();

document.getElementById("generate").addEventListener("click", e=> {fetchData();})

console.log(myData);

let name = "Ben";

let myString = "hello " + name + "!";
myString = `hello ${name} !`;