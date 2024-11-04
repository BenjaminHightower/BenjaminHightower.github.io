const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let storyText = 'It was a beautiful 69 fahrenheit day in :inserty: when :insertx: decided to recite every last digit of pi. After 5 minutes though, the applied mathematics department showed up and :insertz:. Since all of this happened, The APPM Department calls :insertx: the forbidden math god.';
let insertX = ['Mario','Luigi','Joe Mama'];
let insertY = ['the engineering center','your house','the great outdoors'];
let insertZ = ['started helping them','took them away','started to take notes'];

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);
  newStory = newStory.replace(':insertx:',xItem).replace(':insertx:',xItem).replace(':inserty:',yItem).replace(':insertz:',zItem);

  if(customName.value !== '') {
    let name = customName.value;
    newStory =  newStory.replace('The APPM Department',name);
  }

  if(document.getElementById("uk").checked) {
    let temperature =  Math.round((75-32)/1.8).toString() + ' centigrade';
    newStory =  newStory.replace('69 fahrenheit',temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

randomize.addEventListener('click', result);