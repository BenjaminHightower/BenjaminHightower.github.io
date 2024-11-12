const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const alt = {'pic1.jpg' : 'Bro 1','pic2.jpg' : 'Bro 2','pic3.jpg' : 'Bro 3','pic4.jpg' : 'Bro 4','pic5.jpg' : 'Bro 5'}

for(let i=0; i<images.length; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', "images/"+ images[i]);
    newImage.setAttribute('alt', "images/"+ images[i]);
    thumbBar.appendChild(newImage);
    thumbBar.addEventListener('click', (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;

    });
}

btn.addEventListener('click', (e) => {
  if (e.target.className == 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,50%)';
}

 else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
}
});