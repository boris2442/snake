// window.onload = function () {
//   let canvasWidth = 900;
//   let canvasHeight = 600;
//   let blockSize = 30;
//   let ctx;
//   let delay = 100;
//   let xCoor = 0;
//   let yCood = 0;
//   let snakee;
//   let applee;
//   let widthBlock = canvasWidth / blockSize;
//   let height = canvasHeight / blockSize;
//   let score;
//   let timeOut;
//   init();

//   function init() {
//     let canvas = document.createElement("canvas");
//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
//     canvas.style.border = "10px solid gray";
//     canvas.style.margin = "20px auto";
//     canvas.style.display = "block";
//     document.body.appendChild(canvas);
//     canvas.style.backgroundColor = "#ddd";
//     ctx = canvas.getContext("2d");
//     snakee = new Snake([6, 4], [5, 4], [4, 4], [3, 4], [2, 4], "right");
//     applee = new Apple([10, 10]);
//     score = 0;
//     refreshCanvas();
//   }

//   function refreshCanvas() {
//     snakee.advance();
//     if (snakee.checkCollision()) {
//       gameOver();
//     } else {
//       if (snakee.isEatingApple(applee)) {
//         score++;
//         snakee.ateApple = true;
//         do {
//           applee.setNewPosition();
//         } while (applee.isOnsnake(snakee));
//         if (score % 5 == 0) {
//           speedUp();
//         }
//       }
//       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//       drawScore();
//       snakee.draw();
//       applee.draw();
//       timeOut = setTimeout(refreshCanvas, delay);
//     }
//   }
//   function speedUp() {
//     delay /= 2;
//   }
//   function gameOver() {
//     ctx.save();
//     ctx.font = "bold 70px sans-serif";
//     ctx.fillStyle = "#000";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.StrokeStyle = "white";
//     ctx.lineWidth = 5;
//     ctx.centreX = canvasWidth.width / 2;
//     ctx.centreY = canvasHeight.height / 2;
//     ctx.stokeText("Game Over", centreX, centreY - 180);
//     ctx.fillText("Game Over", centreX, centreY - 180);
//     ctx.font = "bold 30px sans-serif";
//     ctx.strokeText(
//       "Appuyer sur la touche espace pour rejouer",
//       centreX,
//       centreY - 120
//     );
//     ctx.fillText(
//       "Appuyer sur la touche espace pour rejouer",
//       centreX,
//       centreY - 120
//     );
//     ctx.restore();
//   }
//   function restart() {
//     snakee = new Snake(
//       [
//         [6, 4],
//         [5, 4],
//         [4, 4],
//         [3, 4],
//         [2, 4],
//       ],
//       "right"
//     );
//     applee = new Apple([10, 10]);
//     score = 0;
//     clearTimeout(timeOut);
//     delay: 100;
//     refreshCanvas();
//   }
//   function drawScore() {
//     ctx.save();
//     ctx.font = "bold 200px sans-serif";
//     ctx.fillStyle = "gray";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     let centreX = canvasWidth / 2;
//     let centreY = canvasHeight / 2;
//     ctx.fillText(score.toString(), centreX, centreY);
//     ctx.restore();
//   }
//   function Snake(body, direction) {
//     this.body = body;
//     this.direction = direction;
//     this.ateApple = false;
//     this.draw = function () {
//       ctx.save();
//       ctx.fillStyle = "#ff0000";
//       for (let i = 0; i < this.body.lenght; i++) {
//         dawBlock(ctx, this.body[i]);
//       }
//       ctx.restore();
//     };
//     this.advance = function () {
//       let nextPosition = this.body[0].slice();
//       switch (this.direction) {
//         case "left":
//           nextPosition[0] -= 1;
//           break;
//         case "right":
//           nextPosition[0] += 1;
//           break;
//         case "down":
//           nextPosition[1] += 1;
//           break;
//         case "up":
//           nextPosition[1] -= 1;
//           break;
//         default:
//           throw "Invalid direction";
//       }
//       this.body.unshift(nextPosition);
//       if (!this.ateApple) this.body.pop();
//       else {
//         this.ateapple = false;
//       }
//       this.setDirection = function (newDirection) {
//         let alloWedDirections;
//         switch (this.direction) {
//           case "left":
//             alloWedDirections = ["up", "down"];
//             break;
//             default: throw "Invalid direction";
//         }
//         if (alloWedDirections.indexOf(newDirect) > -1) {
//           this.direction = newDirection;
//         }
//       };
//       this.checkCollision = function () {
//         let wallCollision = false;
//         let snakeCollision = false;
//         let head = this.body[0];
//         let rest = this.body.slice(1);
//         let snakeX = head[0];
//         let snakeY = head[1];
//         let minX = 0;
//         let minY = 0;
//         let maxX = widthBlock - 1;
//         let maxY = heightBlock - 1;
//         let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
//         let isNotBetweenverticalesWalls = snakeY < minY || snakeY > maxY;
//         if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
//           wallCollision = true;
//         for (let i = 0; i < rest.lenght; i++) {
//           if (snakeX === rest[i][0] && snakeY === rest[i][1])
//             snakeCollision = true;
//         }
//         return wallCollision || snakeCollision;
//       };
//       this.isEatingApple = function () {
//         let head = this.body[0];
//         if (head[0] === appleToEat.position[i]) return true;
//         else {
//           return false;
//         }
//       };
//       function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//           ctx.save();
//           ctx.fillStyle = "#33cc33";
//           ctx.beginPath();
//           let radius = blockSize / 2;
//           let x = this.position[0] * blockSize + radius;
//           let y = this.position[1] * blockSize + radius;
//           ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//           ctx.fill();
//           ctx.restore();
//         };
//         this.setNewPosition = function () {
//           let newX = Math.round(Math.randon() * (widthInBlocks - 1));
//           this.position = [newX, newX];
//         };
//         this.isOnSnake = function (snakeToCheck) {
//           let isOnCheck = false;
//           for (let i = 0; i < i.snakeToCheck.body.lenght; i++) {
//             if (
//               this.position[0] === snakeToCheck.body[i][0] &&
//               this.position[1] === snakeToCheck.body[i][1]
//             ) {
//               this.isOnSnake = true;
//             }
//           }
//           return this.isOnSnake;
//         };
//       }
//       document.onkeydown = function handleKeyDown(e) {
//         let key = e.keyCode;
//         let newDirection;
//         switch (key) {
//           case 37:
//             newDirection = "left";
//             break;
//           case 38:
//             newDirection = "up";
//             break;
//           case 39:
//             newDirection = "right";
//             braak;
//           case 40:
//             newDirection = "down";
//             case32: restart();
//             return;
//           default:
//             return;
//         }
//         snakee.setDirection(newDirection);
//       };
//     };
//   }
// };


















// window.onload = function () {
//     let canvasWidth = 900;
//     let canvasHeight = 600;
//     let blockSize = 30;
//     let ctx;
//     let delay = 100;
//     let snakee;
//     let applee;
//     let widthInBlocks = canvasWidth / blockSize;
//     let heightInBlocks = canvasHeight / blockSize;
//     let score;
//     let timeOut;
//     init();
  
//     function init() {
//       let canvas = document.createElement("canvas");
//       canvas.width = canvasWidth;
//       canvas.height = canvasHeight;
//       canvas.style.border = "10px solid gray";
//       canvas.style.margin = "20px auto";
//       canvas.style.display = "block";
//       document.body.appendChild(canvas);
//       canvas.style.backgroundColor = "#ddd";
//       ctx = canvas.getContext("2d");
//       snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//       applee = new Apple([10, 10]);
//       score = 0;
//       refreshCanvas();
//     }
  
//     function refreshCanvas() {
//       snakee.advance();
//       if (snakee.checkCollision()) {
//         gameOver();
//       } else {
//         if (snakee.isEatingApple(applee)) {
//           score++;
//           snakee.ateApple = true;
//           do {
//             applee.setNewPosition();
//           } while (applee.isOnSnake(snakee));
//           if (score % 5 === 0) {
//             speedUp();
//           }
//         }
//         ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//         drawScore();
//         snakee.draw();
//         applee.draw();
//         timeOut = setTimeout(refreshCanvas, delay);
//       }
//     }
  
//     function speedUp() {
//       delay /= 2;
//     }
  
//     function gameOver() {
//       ctx.save();
//       ctx.font = "bold 70px sans-serif";
//       ctx.fillStyle = "#000";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.strokeStyle = "white";
//       ctx.lineWidth = 5;
//       let centreX = canvasWidth / 2;
//       let centreY = canvasHeight / 2;
//       ctx.strokeText("Game Over", centreX, centreY - 180);
//       ctx.fillText("Game Over", centreX, centreY - 180);
//       ctx.font = "bold 30px sans-serif";
//       ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
//       ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
//       ctx.restore();
//     }
  
//     function restart() {
//       snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//       applee = new Apple([10, 10]);
//       score = 0;
//       clearTimeout(timeOut);
//       delay = 100;
//       refreshCanvas();
//     }
  
//     function drawScore() {
//       ctx.save();
//       ctx.font = "bold 200px sans-serif";
//       ctx.fillStyle = "gray";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       let centreX = canvasWidth / 2;
//       let centreY = canvasHeight / 2;
//       ctx.fillText(score.toString(), centreX, centreY);
//       ctx.restore();
//     }
  
//     function Snake(body, direction) {
//       this.body = body;
//       this.direction = direction;
//       this.ateApple = false;
//       this.draw = function () {
//         ctx.save();
//         ctx.fillStyle = "#ff0000";
//         for (let i = 0; i < this.body.length; i++) {
//           drawBlock(ctx, this.body[i]);
//         }
//         ctx.restore();
//       };
//       this.advance = function () {
//         let nextPosition = this.body[0].slice();
//         switch (this.direction) {
//           case "left":
//             nextPosition[0] -= 1;
//             break;
//           case "right":
//             nextPosition[0] += 1;
//             break;
//           case "down":
//             nextPosition[1] += 1;
//             break;
//           case "up":
//             nextPosition[1] -= 1;
//             break;
//           default:
//             throw "Invalid direction";
//         }
//         this.body.unshift(nextPosition);
//         if (!this.ateApple) this.body.pop();
//         else {
//           this.ateApple = false;
//         }
//       };
//       this.setDirection = function (newDirection) {
//         let allowedDirections;
//         switch (this.direction) {
//           case "left":
//           case "right":
//             allowedDirections = ["up", "down"];
//             break;
//           case "up":
//           case "down":
//             allowedDirections = ["left", "right"];
//             break;
//           default:
//             throw "Invalid direction";
//         }
//         if (allowedDirections.indexOf(newDirection) > -1) {
//           this.direction = newDirection;
//         }
//       };
//       this.checkCollision = function () {
//         let wallCollision = false;
//         let snakeCollision = false;
//         let head = this.body[0];
//         let rest = this.body.slice(1);
//         let snakeX = head[0];
//         let snakeY = head[1];
//         let minX = 0;
//         let minY = 0;
//         let maxX = widthInBlocks - 1;
//         let maxY = heightInBlocks - 1;
//         let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
//         let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
//         if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
//           wallCollision = true;
//         }
//         for (let i = 0; i < rest.length; i++) {
//           if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
//             snakeCollision = true;
//           }
//         }
//         return wallCollision || snakeCollision;
//       };
//       this.isEatingApple = function (appleToEat) {
//         let head = this.body[0];
//         if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
//           return true;
//         } else {
//           return false;
//         }
//       };
//     }
  
//     function Apple(position) {
//       this.position = position;
//       this.draw = function () {
//         ctx.save();
//         ctx.fillStyle = "#33cc33";
//         ctx.beginPath();
//         let radius = blockSize / 2;
//         let x = this.position[0] * blockSize + radius;
//         let y = this.position[1] * blockSize + radius;
//         ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//         ctx.fill();
//         ctx.restore();
//       };
//       this.setNewPosition = function () {
//         let newX = Math.round(Math.random() * (widthInBlocks - 1));
//         let newY = Math.round(Math.random() * (heightInBlocks - 1));
//         this.position = [newX, newY];
//       };
//       this.isOnSnake = function (snakeToCheck) {
//         let isOnSnake = false;
//         for (let i = 0; i < snakeToCheck.body.length; i++) {
//           if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
//             isOnSnake = true;
//           }
//         }
//         return isOnSnake;
//       };
//     }
  
//     document.onkeydown = function handleKeyDown(e) {
//       let key = e.keyCode;
//       let newDirection;
//       switch (key) {
//         case 37:
//           newDirection = "left";
//           break;
//         case 38:
//           newDirection = "up";
//           break;
//         case 39:
//           newDirection = "right";
//           break;
//         case 40:
//           newDirection = "down";
//           break;
//         case 32:
//           restart();
//           return;
//         default:
//           return;
//       }
//       snakee.setDirection(newDirection);
//     };
//   };
  
//   function drawBlock(ctx, position) {
//     let x = position[0] * blockSize;
//     let y = position[1] * blockSize;
//     ctx.fillRect(x, y, blockSize, blockSize);
//   }














window.onload = function () {
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 100;
    let snakee;
    let applee;
    let widthInBlocks = canvasWidth / blockSize;
    let heightInBlocks = canvasHeight / blockSize;
    let score;
    let timeOut;
    init();

    function init() {
        let canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "10px solid gray";
        canvas.style.margin = "20px auto";
        canvas.style.display = "block";
        document.body.appendChild(canvas);
        canvas.style.backgroundColor = "#ddd";
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas() {
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
        delay = Math.max(30, delay * 0.8); // Réduction progressive de la vitesse
    }

    function gameOver() {
        clearTimeout(timeOut);
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        let centreX = canvasWidth / 2;
        let centreY = canvasHeight / 2;
        ctx.strokeText("Game Over", centreX, centreY - 180);
        ctx.fillText("Game Over", centreX, centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyez sur espace pour rejouer", centreX, centreY - 120);
        ctx.fillText("Appuyez sur espace pour rejouer", centreX, centreY - 120);
        ctx.restore();
    }

    function restart() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut);
        delay = 100;
        refreshCanvas();
    }

    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let centreX = canvasWidth / 2;
        let centreY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centreY);
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
        if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
    };
};

function drawBlock(ctx, position) {
    ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
}
