const jokeButton = document.getElementById('joke-button');
const jokeText = document.getElementById('joke-paragraph');
const apiUrl = 'https://api.chucknorris.io/jokes/random'; 

jokeButton.addEventListener('click', getJoke);

function getJoke() {
    console.log("Button clicked!");
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log(data); 
        displayRes(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error fetching the joke. Please try again later.'); 
      });
}

function displayRes(jokeData) {
    jokeText.textContent = `${jokeData.setup} ... ${jokeData.punchline}`;
  }

/*
{
    "categories": [],
    "created_at": "2020-01-05 13:42:26.447675",
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "id": "AudTjIHWRCq4Hg1drHxZ_w",
    "updated_at": "2020-01-05 13:42:26.447675",
    "url": "https://api.chucknorris.io/jokes/AudTjIHWRCq4Hg1drHxZ_w",
    "value": "lightening struck Chuck Norris... he struck back"
}
*/

getJoke();
