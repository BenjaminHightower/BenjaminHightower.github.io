const canvas = document.getElementById('area');
const ctx = canvas.getContext('2d');

let gamestate = 'start';

// player
const player = {
    x: 50,
    y: 100,
    width: 10,
    height: 10,
    speed: 3.5,
};

// obstacles
const obstacles = [];
function spawn() {
    obstacles.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        speed: 2
    });
}

// score
let score = 0;
let rate;

// difficulty spike (levels)
rate = setInterval(spawn, 2560);
function update_score() {
    score++;
    if (score === 1000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 1280);
    }
    if (score === 2000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 640);
    }
    if (score === 3000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 320);
    }
    if (score === 4000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 160);
    }
    if (score === 5000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 80);
    }
    if (score === 6000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 40);
    }
    if (score === 7000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 20);
    }
    if (score === 8000 && rate) {
        clearInterval(rate);
        rate = setInterval(spawn, 10);
    }
}

// loop start
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw start
    if (gamestate === 'start') {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Hopeless Space', canvas.width / 2-122, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Enter to Start', canvas.width / 2 - 100, canvas.height / 2 + 50);
        ctx.font = '16px Arial';
        ctx.fillText('Arrow Keys = Engage Thrusters | Spacebar = Enable Stasis', canvas.width / 2 - 220, canvas.height / 2 + 90);
        ctx.fillText('After every 1000 points gained, you advance further into the asteroid cluster...', canvas.width / 2 - 285, canvas.height / 2 + 120);
    } else if (gamestate === 'game') {

        // player movement
        switch (player.direction) {
            case 'down':
                player.y += player.speed;
                break;
            case 'up':
                player.y -= player.speed;
                break;
            case 'left':
                player.x -= player.speed;
                break;
            case 'right':
                player.x += player.speed;
                break;
        }

        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

        // move obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].y += obstacles[i].speed;

            // remove obstacles
            if (obstacles[i].y > canvas.height) {
                obstacles.splice(i, 1);
            }

            // collisions
            if (
                player.x < obstacles[i].x + obstacles[i].width &&
                player.x + player.width > obstacles[i].x &&
                player.y < obstacles[i].y + obstacles[i].height &&
                player.y + player.height > obstacles[i].y
            ) {
                gamestate = 'end';
            }
        }

        // draw player
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // draw obstacles
        ctx.fillStyle = '#363636';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });

        // draw score
        update_score();
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, 10, 20);
    } else if (gamestate === 'end') {

        // draw ending
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Game Over', canvas.width / 2 - 90, canvas.height / 2 - 65);
        ctx.font = '16px Arial';
        ctx.fillText('You and your crew were lost to the asteroids...', canvas.width / 2 - 170, canvas.height / 2 - 35);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2);
        ctx.fillText('Press Enter to Continue', canvas.width / 2 - 110, canvas.height / 2 + 50);
    }
    requestAnimationFrame(update);
}

// controls
document.addEventListener('keydown', function (event) {
    if (gamestate === 'game') {
        switch (event.key) {
            case 'ArrowLeft':
                player.direction = 'left';
                break;
            case 'ArrowRight':
                player.direction = 'right';
                break;
            case 'ArrowDown':
                player.direction = 'down';
                break;
            case 'ArrowUp':
                player.direction = 'up';
                break;
            case ' ':
                player.direction = 'stop';
                break;
        }
    } else if (gamestate === 'start' || gamestate === 'end') {
        if (event.key === 'Enter') {
            if (gamestate === 'start') {
                gamestate = 'game';
                setInterval(spawn, 2560);
            } else {
                document.location.reload();
            }
        }
    }
});

// game initiate
update();