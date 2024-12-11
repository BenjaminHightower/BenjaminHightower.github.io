const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Player ---
const skier = {
    x: 50,
    y: 100,
    width: 10,
    height: 20,
    speed: 5,
    direction: 'down' // 'down', 'left', 'right'
};

// --- Obstacles ---
const obstacles = [];
function createObstacle() {
    obstacles.push({
        x: Math.random() * (canvas.width - 20),
        y: -20, // Start off-screen
        width: 20,
        height: 20
    });
}

// --- Game loop ---
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move skier
    switch (skier.direction) {
        case 'down':
            skier.y += skier.speed;
            break;
        case 'left':
            skier.x -= skier.speed;
            break;
        case 'right':
            skier.x += skier.speed;
            break;
    }

    // Keep skier within bounds
    if (skier.x < 0) skier.x = 0;
    if (skier.x + skier.width > canvas.width) skier.x = canvas.width - skier.width;
    if (skier.y + skier.height > canvas.height) skier.y = canvas.height - skier.height;

    // Move obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += 2; // Obstacle speed

        // Remove off-screen obstacles
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
        }

        // Collision detection (basic)
        if (
            skier.x < obstacles[i].x + obstacles[i].width &&
            skier.x + skier.width > obstacles[i].x &&
            skier.y < obstacles[i].y + obstacles[i].height &&
            skier.y + skier.height > obstacles[i].y
        ) {
            alert('Game Over!');
            document.location.reload(); // Restart game
        }
    }

    // Draw skier
    ctx.fillStyle = 'red';
    ctx.fillRect(skier.x, skier.y, skier.width, skier.height);

    // Draw obstacles
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    requestAnimationFrame(update);
}

// --- Controls ---
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            skier.direction = 'left';
            break;
        case 'ArrowRight':
            skier.direction = 'right';
            break;
        case 'ArrowDown':
            skier.direction = 'down';
            break;
    }
});

// --- Initialize ---
setInterval(createObstacle, 2000); // Create obstacle every 2 seconds
update(); // Start game loop













const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Game State ---
let gameState = 'title'; // 'title', 'game'
let gameDifficulty = 'easy'; // 'easy', 'medium', 'hard'

// --- Button properties ---
const buttonWidth = 100;
const buttonHeight = 30;
const buttonX = canvas.width / 2 - buttonWidth / 2;
const buttonY = [canvas.height / 2 + 20, canvas.height / 2 + 50, canvas.height / 2 + 80]; // Y-coordinates for each button
let buttonHover = -1; // -1 for no hover, 0 for easy, 1 for medium, 2 for hard

// --- Player ---
const skier = {
    x: 50,
    y: 100,
    width: 10,
    height: 20,
    speed: 5,
    direction: 'down' // 'down', 'left', 'right'
};

// --- Obstacles ---
const obstacles = [];

function createObstacle() {
    let obstacleSpeed = 2; // Default speed (easy)
    let obstacleFrequency = 2000; // Default frequency (easy)
    if (gameDifficulty === 'medium') {
        obstacleSpeed = 3;
        obstacleFrequency = 1500;
    }
    if (gameDifficulty === 'hard') {
        obstacleSpeed = 6; // Increased speed
        obstacleFrequency = 800; // Increased frequency
        // Potentially add more obstacles per creation or vary their sizes
        obstacles.push({
            x: Math.random() * (canvas.width - 20),
            y: -20, // Start off-screen
            width: 30, // Larger obstacles
            height: 20,
            speed: obstacleSpeed
        });
        obstacles.push({ // Add a second obstacle
            x: Math.random() * (canvas.width - 20),
            y: -60, // Start further off-screen
            width: 20,
            height: 20,
            speed: obstacleSpeed
        });
        return; // Exit to avoid creating the single obstacle below
    }

    obstacles.push({
        x: Math.random() * (canvas.width - 20),
        y: -20, // Start off-screen
        width: 20,
        height: 20,
        speed: obstacleSpeed
    });
}

// --- Game loop ---
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'title') {
        // Draw title screen
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('SkiFree', canvas.width / 2 - 70, canvas.height / 2 - 50);

        // Draw buttons with hover effect
        ctx.font = '20px Arial';
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = buttonHover === i ? 'gray' : 'black'; // Change color on hover
            ctx.fillRect(buttonX, buttonY[i], buttonWidth, buttonHeight);
            ctx.fillStyle = 'white';
            ctx.fillText(['Easy', 'Medium', 'Hard'][i], buttonX + 20, buttonY[i] + 22);
        }

        // Difficulty selection (using basic mouse click for now)
        canvas.addEventListener('click', function (event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (mouseX > buttonX && mouseX < buttonX + buttonWidth) {
                if (mouseY > buttonY[0] && mouseY < buttonY[0] + buttonHeight) {
                    gameDifficulty = 'easy';
                    gameState = 'game';
                }
                if (mouseY > buttonY[1] && mouseY < buttonY[1] + buttonHeight) {
                    gameDifficulty = 'medium';
                    gameState = 'game';
                }
                if (mouseY > buttonY[2] && mouseY < buttonY[2] + buttonHeight) {
                    gameDifficulty = 'hard';
                    gameState = 'game';
                }
            }
        });

    } else if (gameState === 'game') {
        // --- Game logic ---
        // Move skier
        switch (skier.direction) {
            case 'down':
                skier.y += skier.speed;
                break;
            case 'left':
                skier.x -= skier.speed;
                break;
            case 'right':
                skier.x += skier.speed;
                break;
        }

        // Keep skier within bounds
        if (skier.x < 0) skier.x = 0;
        if (skier.x + skier.width > canvas.width) skier.x = canvas.width - skier.width;
        if (skier.y + skier.height > canvas.height) skier.y = canvas.height - skier.height;

        // Move obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].y += obstacles[i].speed;

            // Remove off-screen obstacles
            if (obstacles[i].y > canvas.height) {
                obstacles.splice(i, 1);
            }

            // Collision detection (basic)
            if (
                skier.x < obstacles[i].x + obstacles[i].width &&
                skier.x + skier.width > obstacles[i].x &&
                skier.y < obstacles[i].y + obstacles[i].height &&
                skier.y + skier.height > obstacles[i].y
            ) {
                alert('Game Over!');
                document.location.reload(); // Restart game
            }
        }

        // Draw skier
        ctx.fillStyle = 'red';
        ctx.fillRect(skier.x, skier.y, skier.width, skier.height);

        // Draw obstacles
        ctx.fillStyle = 'blue';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    requestAnimationFrame(update);
}

// --- Controls ---
document.addEventListener('keydown', function (event) {
    if (gameState === 'game') { // Only control skier in game state
        switch (event.key) {
            case 'ArrowLeft':
                skier.direction = 'left';
                break;
            case 'ArrowRight':
                skier.direction = 'right';
                break;
            case 'ArrowDown':
                skier.direction = 'down';
                break;
        }
    }
});

// --- Mouse events for button hover ---
canvas.addEventListener('mousemove', function (event) {
    if (gameState === 'title') {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        buttonHover = -1;
        for (let i = 0; i < 3; i++) {
            if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
                mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight) {
                buttonHover = i;
                break;
            }
        }
    }
});

// --- Initialize ---
update(); // Start game loop