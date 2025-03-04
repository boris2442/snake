
window.onload = function () {
    let canvas = document.createElement("canvas");
    let canvasWidth = window.innerWidth > 900 ? 900 : window.innerWidth - 20;
    let canvasHeight = window.innerHeight > 600 ? 600 : window.innerHeight - 20;
    let blockSize = 30;
    let ctx;
    let delay = 100;
    let snakee;
    let applee;
    let widthInBlocks = Math.floor(canvasWidth / blockSize);
    let heightInBlocks = Math.floor(canvasHeight / blockSize);
    let score;
    let timeOut;
    let isPaused = false;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "5px solid gray";
    canvas.style.display = "block";
    canvas.style.margin = "auto";
    document.body.appendChild(canvas);
    canvas.style.backgroundColor = "#ddd";
    ctx = canvas.getContext("2d");

    init();

    function init() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas() {
        if (isPaused) return;

        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
        } else {
            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee));
                if (score % 5 === 0) {
                    speedUp();
                }
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeOut = setTimeout(refreshCanvas, delay);
        }
    }

    function speedUp() {
        delay = Math.max(30, delay * 0.8);
    }

    function gameOver() {
        clearTimeout(timeOut);
        ctx.save();
        ctx.font = "bold 50px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50);
        ctx.fillText("Press Space to Restart", canvasWidth / 2, canvasHeight / 2);
        ctx.restore();
    }

    function restart() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut);
        delay = 100;
        isPaused = false;
        refreshCanvas();
    }

    function togglePause() {
        isPaused = !isPaused;
        if (!isPaused) refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 30px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + score, 10, 30);
        ctx.restore();
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (let i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance = function () {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left": nextPosition[0] -= 1; break;
                case "right": nextPosition[0] += 1; break;
                case "down": nextPosition[1] += 1; break;
                case "up": nextPosition[1] -= 1; break;
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple) this.body.pop();
            else this.ateApple = false;
        };
        this.setDirection = function (newDirection) {
            let allowedDirections = (this.direction === "left" || this.direction === "right") ? ["up", "down"] : ["left", "right"];
            if (allowedDirections.includes(newDirection)) {
                this.direction = newDirection;
            }
        };
        this.checkCollision = function () {
            let head = this.body[0];
            let rest = this.body.slice(1);
            let [snakeX, snakeY] = head;
            let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
            let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
            return wallCollision || snakeCollision;
        };
        this.isEatingApple = function (appleToEat) {
            let head = this.body[0];
            return head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1];
        };
    }

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            let radius = blockSize / 2;
            let x = this.position[0] * blockSize + radius;
            let y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPosition = function () {
            this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
        };
        this.isOnSnake = function (snakeToCheck) {
            return snakeToCheck.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
        if (e.keyCode === 32) restart();
        if (e.keyCode === 80) togglePause();
        if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
    };
};

function drawBlock(ctx, position) {
    ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
}









