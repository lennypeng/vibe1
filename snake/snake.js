const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x: 10, y: 10}];
let velocity = {x: 0, y: 0};
let food = randomFood();
let score = 0;
scoreEl.textContent = `Score: ${score}`;

function randomFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++frame % 6 !== 0) return; // slow game loop
    update();
    draw();
}

let frame = 0;
requestAnimationFrame(gameLoop);

function update() {
    const head = {x: snake[0].x + velocity.x, y: snake[0].y + velocity.y};

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)) {
        alert('Game Over');
        snake = [{x: 10, y: 10}];
        velocity = {x: 0, y: 0};
        food = randomFood();
        score = 0;
        scoreEl.textContent = `Score: ${score}`;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = randomFood();
        score += 1;
        scoreEl.textContent = `Score: ${score}`;
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    snake.forEach(s => ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2));

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            if (velocity.x === 1) break;
            velocity = {x: -1, y: 0};
            break;
        case 'ArrowUp':
            if (velocity.y === 1) break;
            velocity = {x: 0, y: -1};
            break;
        case 'ArrowRight':
            if (velocity.x === -1) break;
            velocity = {x: 1, y: 0};
            break;
        case 'ArrowDown':
            if (velocity.y === -1) break;
            velocity = {x: 0, y: 1};
            break;
    }
});
