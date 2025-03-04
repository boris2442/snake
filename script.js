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
//         let canvas = document.createElement("canvas");
//         canvas.width = canvasWidth;
//         canvas.height = canvasHeight;
//         canvas.style.border = "10px solid gray";
//         canvas.style.margin = "20px auto";
//         canvas.style.display = "block";
//         document.body.appendChild(canvas);
//         canvas.style.backgroundColor = "#ddd";
//         ctx = canvas.getContext("2d");
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         snakee.advance();
//         if (snakee.checkCollision()) {
//             gameOver();
//         } else {
//             if (snakee.isEatingApple(applee)) {
//                 score++;
//                 snakee.ateApple = true;
//                 do {
//                     applee.setNewPosition();
//                 } while (applee.isOnSnake(snakee));
//                 if (score % 5 === 0) {
//                     speedUp();
//                 }
//             }
//             ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//             drawScore();
//             snakee.draw();
//             applee.draw();
//             timeOut = setTimeout(refreshCanvas, delay);
//         }
//     }

//     function speedUp() {
//         delay = Math.max(30, delay * 0.8); 
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         ctx.save();
//         ctx.font = "bold 70px sans-serif";
//         ctx.fillStyle = "#000";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.strokeStyle = "white";
//         ctx.lineWidth = 5;
//         let centreX = canvasWidth / 2;
//         let centreY = canvasHeight / 2;
//         ctx.strokeText("Game Over", centreX, centreY - 180);
//         ctx.fillText("Game Over", centreX, centreY - 180);
//         ctx.font = "bold 30px sans-serif";
//         ctx.strokeText("Appuyez sur espace pour rejouer", centreX, centreY - 120);
//         ctx.fillText("Appuyez sur espace pour rejouer", centreX, centreY - 120);
//         ctx.restore();
//     }

//     function restart() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         clearTimeout(timeOut);
//         delay = 100;
//         refreshCanvas();
//     }

//     function drawScore() {
//         ctx.save();
//         ctx.font = "bold 200px sans-serif";
//         ctx.fillStyle = "gray";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         let centreX = canvasWidth / 2;
//         let centreY = canvasHeight / 2;
//         ctx.fillText(score.toString(), centreX, centreY);
//         ctx.restore();
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#ff0000";
//             for (let i = 0; i < this.body.length; i++) {
//                 drawBlock(ctx, this.body[i]);
//             }
//             ctx.restore();
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             switch (this.direction) {
//                 case "left": nextPosition[0] -= 1; break;
//                 case "right": nextPosition[0] += 1; break;
//                 case "down": nextPosition[1] += 1; break;
//                 case "up": nextPosition[1] -= 1; break;
//             }
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowedDirections = (this.direction === "left" || this.direction === "right") ? ["up", "down"] : ["left", "right"];
//             if (allowedDirections.includes(newDirection)) {
//                 this.direction = newDirection;
//             }
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let [snakeX, snakeY] = head;
//             let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
//             let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
//             return wallCollision || snakeCollision;
//         };
//         this.isEatingApple = function (appleToEat) {
//             let head = this.body[0];
//             return head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1];
//         };
//     }

//     function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#33cc33";
//             ctx.beginPath();
//             let radius = blockSize / 2;
//             let x = this.position[0] * blockSize + radius;
//             let y = this.position[1] * blockSize + radius;
//             ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//             ctx.fill();
//             ctx.restore();
//         };
//         this.setNewPosition = function () {
//             this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
//         };
//         this.isOnSnake = function (snakeToCheck) {
//             return snakeToCheck.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
//         };
//     }

//     document.onkeydown = function handleKeyDown(e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) restart();
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };
// };

// function drawBlock(ctx, position) {
//     ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
// }













// window.onload = function () {
//     let canvas, ctx;
//     let blockSize = 30;
//     let delay = 100;
//     let snakee, applee;
//     let score;
//     let timeOut;

//     function updateCanvasSize() {
//         let minSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
//         let maxBlocks = Math.floor(minSize / blockSize);
//         canvas.width = maxBlocks * blockSize;
//         canvas.height = maxBlocks * blockSize;
//         widthInBlocks = canvas.width / blockSize;
//         heightInBlocks = canvas.height / blockSize;
//     }

//     function init() {
//         canvas = document.createElement("canvas");
//         document.body.appendChild(canvas);
//         ctx = canvas.getContext("2d");
//         canvas.style.border = "10px solid gray";
//         canvas.style.margin = "20px auto";
//         canvas.style.display = "block";
//         canvas.style.backgroundColor = "#ddd";
        
//         updateCanvasSize();
        
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         snakee.advance();
//         if (snakee.checkCollision()) {
//             gameOver();
//         } else {
//             if (snakee.isEatingApple(applee)) {
//                 score++;
//                 snakee.ateApple = true;
//                 do {
//                     applee.setNewPosition();
//                 } while (applee.isOnSnake(snakee));
//                 if (score % 5 === 0) {
//                     speedUp();
//                 }
//             }
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             drawScore();
//             snakee.draw();
//             applee.draw();
//             timeOut = setTimeout(refreshCanvas, delay);
//         }
//     }

//     function speedUp() {
//         delay = Math.max(30, delay * 0.8);
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         ctx.save();
//         ctx.font = "bold 40px sans-serif";
//         ctx.fillStyle = "#000";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         let centreX = canvas.width / 2;
//         let centreY = canvas.height / 2;
//         ctx.fillText("Game Over", centreX, centreY - 40);
//         ctx.fillText("Press SPACE to restart", centreX, centreY);
//         ctx.restore();
//     }

//     function restart() {
//         updateCanvasSize();
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         clearTimeout(timeOut);
//         delay = 100;
//         refreshCanvas();
//     }

//     function drawScore() {
//         ctx.save();
//         ctx.font = "bold 100px sans-serif";
//         ctx.fillStyle = "gray";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         let centreX = canvas.width / 2;
//         let centreY = canvas.height / 2;
//         ctx.fillText(score.toString(), centreX, centreY);
//         ctx.restore();
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#ff0000";
//             this.body.forEach(block => drawBlock(ctx, block));
//             ctx.restore();
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             let moves = { left: [-1, 0], right: [1, 0], down: [0, 1], up: [0, -1] };
//             nextPosition[0] += moves[this.direction][0];
//             nextPosition[1] += moves[this.direction][1];
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowedDirections = (this.direction === "left" || this.direction === "right") ? ["up", "down"] : ["left", "right"];
//             if (allowedDirections.includes(newDirection)) {
//                 this.direction = newDirection;
//             }
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let [snakeX, snakeY] = head;
//             let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
//             let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
//             return wallCollision || snakeCollision;
//         };
//         this.isEatingApple = function (apple) {
//             return this.body[0][0] === apple.position[0] && this.body[0][1] === apple.position[1];
//         };
//     }

//     function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#33cc33";
//             ctx.beginPath();
//             let radius = blockSize / 2;
//             let x = this.position[0] * blockSize + radius;
//             let y = this.position[1] * blockSize + radius;
//             ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//             ctx.fill();
//             ctx.restore();
//         };
//         this.setNewPosition = function () {
//             this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
//         };
//         this.isOnSnake = function (snake) {
//             return snake.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
//         };
//     }

//     document.onkeydown = function (e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) restart();
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };

//     init();
// };

// function drawBlock(ctx, position) {
//     ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
// }



// window.onload = function () {
//     let canvas = document.createElement("canvas");
//     document.body.appendChild(canvas);
//     let ctx = canvas.getContext("2d");
//     let blockSize = 30;
//     let delay = 100;
//     let snakee;
//     let applee;
//     let score;
//     let timeOut;

//     function setCanvasSize() {
//         canvas.width = Math.min(window.innerWidth - 20, 900);
//         canvas.height = Math.min(window.innerHeight - 20, 600);
//     }

//     function init() {
//         setCanvasSize();
//         canvas.style.border = "5px solid gray";
//         canvas.style.margin = "10px auto";
//         canvas.style.display = "block";
//         canvas.style.backgroundColor = "#ddd";

//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         snakee.advance();
//         if (snakee.checkCollision()) {
//             gameOver();
//         } else {
//             if (snakee.isEatingApple(applee)) {
//                 score++;
//                 snakee.ateApple = true;
//                 do {
//                     applee.setNewPosition();
//                 } while (applee.isOnSnake(snakee));
//             }
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             drawScore();
//             snakee.draw();
//             applee.draw();
//             timeOut = setTimeout(refreshCanvas, delay);
//         }
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         alert("Game Over! Score: " + score + "\nAppuyez sur OK pour rejouer.");
//         restart();
//     }

//     function restart() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         delay = 100;
//         refreshCanvas();
//     }

//     function drawScore() {
//         ctx.fillStyle = "black";
//         ctx.font = "20px Arial";
//         ctx.fillText("Score: " + score, 10, 20);
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.fillStyle = "#ff0000";
//             this.body.forEach(block => drawBlock(ctx, block));
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             let directions = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
//             nextPosition[0] += directions[this.direction][0];
//             nextPosition[1] += directions[this.direction][1];
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowed = { left: ["up", "down"], right: ["up", "down"], up: ["left", "right"], down: ["left", "right"] };
//             if (allowed[this.direction].includes(newDirection)) this.direction = newDirection;
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let wallCollision = head[0] < 0 || head[0] >= canvas.width / blockSize || head[1] < 0 || head[1] >= canvas.height / blockSize;
//             let selfCollision = rest.some(block => block[0] === head[0] && block[1] === head[1]);
//             return wallCollision || selfCollision;
//         };
//         this.isEatingApple = function (apple) {
//             return this.body[0][0] === apple.position[0] && this.body[0][1] === apple.position[1];
//         };
//     }

//     function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//             ctx.fillStyle = "#33cc33";
//             ctx.beginPath();
//             let x = this.position[0] * blockSize + blockSize / 2;
//             let y = this.position[1] * blockSize + blockSize / 2;
//             ctx.arc(x, y, blockSize / 2, 0, Math.PI * 2, true);
//             ctx.fill();
//         };
//         this.setNewPosition = function () {
//             this.position = [Math.floor(Math.random() * (canvas.width / blockSize)), Math.floor(Math.random() * (canvas.height / blockSize))];
//         };
//         this.isOnSnake = function (snake) {
//             return snake.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
//         };
//     }

//     function drawBlock(ctx, position) {
//         ctx.fillRect(position[0] * blockSize, position[1] * blockSize, blockSize, blockSize);
//     }

//     document.onkeydown = function (e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) restart();
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };

//     canvas.addEventListener("touchstart", function (e) {
//         let touchX = e.touches[0].clientX;
//         let touchY = e.touches[0].clientY;
//         let centerX = canvas.width / 2;
//         let centerY = canvas.height / 2;
//         let dx = touchX - centerX;
//         let dy = touchY - centerY;
//         if (Math.abs(dx) > Math.abs(dy)) {
//             snakee.setDirection(dx > 0 ? "right" : "left");
//         } else {
//             snakee.setDirection(dy > 0 ? "down" : "up");
//         }
//     });

//     window.onresize = setCanvasSize;
//     init();
// };

// window.onload = function () {
//     let canvas = document.createElement("canvas");
//     document.body.appendChild(canvas);
//     let ctx = canvas.getContext("2d");

//     let blockSize = 30;
//     let delay = 100;
//     let snakee;
//     let applee;
//     let score;
//     let timeOut;
//     let isPaused = false;
//     let canvasWidth, canvasHeight, widthInBlocks, heightInBlocks;

//     function resizeCanvas() {
//         canvasWidth = Math.min(window.innerWidth - 20, 900);
//         canvasHeight = Math.min(window.innerHeight - 20, 600);
//         widthInBlocks = Math.floor(canvasWidth / blockSize);
//         heightInBlocks = Math.floor(canvasHeight / blockSize);
//         canvas.width = widthInBlocks * blockSize;
//         canvas.height = heightInBlocks * blockSize;
//     }

//     function init() {
//         resizeCanvas();
//         canvas.style.border = "5px solid gray";
//         canvas.style.display = "block";
//         canvas.style.margin = "auto";
//         canvas.style.backgroundColor = "#ddd";

//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         if (!isPaused) {
//             snakee.advance();
//             if (snakee.checkCollision()) {
//                 gameOver();
//             } else {
//                 if (snakee.isEatingApple(applee)) {
//                     score++;
//                     snakee.ateApple = true;
//                     do {
//                         applee.setNewPosition();
//                     } while (applee.isOnSnake(snakee));
//                 }
//                 ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//                 drawScore();
//                 snakee.draw();
//                 applee.draw();
//                 timeOut = setTimeout(refreshCanvas, delay);
//             }
//         }
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         ctx.fillStyle = "black";
//         ctx.font = "bold 50px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
//     }

//     function drawScore() {
//         ctx.fillStyle = "gray";
//         ctx.font = "bold 30px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillText(score, canvasWidth / 2, 30);
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.fillStyle = "red";
//             this.body.forEach(block => drawBlock(ctx, block));
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             switch (this.direction) {
//                 case "left": nextPosition[0] -= 1; break;
//                 case "right": nextPosition[0] += 1; break;
//                 case "down": nextPosition[1] += 1; break;
//                 case "up": nextPosition[1] -= 1; break;
//             }
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowedDirections = this.direction === "left" || this.direction === "right" ? ["up", "down"] : ["left", "right"];
//             if (allowedDirections.includes(newDirection)) this.direction = newDirection;
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let [snakeX, snakeY] = head;
//             let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
//             let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
//             return wallCollision || snakeCollision;
//         };
//         this.isEatingApple = function (appleToEat) {
//             return this.body[0][0] === appleToEat.position[0] && this.body[0][1] === appleToEat.position[1];
//         };
//     }

//     function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//             ctx.fillStyle = "green";
//             ctx.beginPath();
//             let radius = blockSize / 2;
//             ctx.arc(this.position[0] * blockSize + radius, this.position[1] * blockSize + radius, radius, 0, Math.PI * 2);
//             ctx.fill();
//         };
//         this.setNewPosition = function () {
//             this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
//         };
//         this.isOnSnake = function (snakeToCheck) {
//             return snakeToCheck.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
//         };
//     }

//     document.onkeydown = function (e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) isPaused = !isPaused;
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };

//     window.addEventListener("resize", resizeCanvas);
//     init();
// };

// function drawBlock(ctx, position) {
//     ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
// }







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










// window.onload = function () {
//     let canvas = document.createElement("canvas");
//     let canvasWidth = window.innerWidth > 900 ? 900 : window.innerWidth - 20;
//     let canvasHeight = window.innerHeight > 600 ? 600 : window.innerHeight - 20;
//     let blockSize = 30;
//     let ctx;
//     let delay = window.innerWidth < 600 ? 150 : 100; // Réduction de la vitesse sur mobile
//     let snakee;
//     let applee;
//     let widthInBlocks = Math.floor(canvasWidth / blockSize);
//     let heightInBlocks = Math.floor(canvasHeight / blockSize);
//     let score;
//     let timeOut;
//     let isPaused = false;
//     let audio = new Audio("https://www.soundjay.com/button/beep-07.wav"); 

//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
//     canvas.style.border = "5px solid gray";
//     canvas.style.display = "block";
//     canvas.style.margin = "auto";
//     document.body.appendChild(canvas);
//     canvas.style.backgroundColor = "#ddd";
//     ctx = canvas.getContext("2d");

//     init();

//     function init() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         if (isPaused) return;

//         snakee.advance();
//         if (snakee.checkCollision()) {
//             gameOver();
//         } else {
//             if (snakee.isEatingApple(applee)) {
//                 score++;
//                 snakee.ateApple = true;
//                 do {
//                     applee.setNewPosition();
//                 } while (applee.isOnSnake(snakee));
//                 if (score % 5 === 0) {
//                     speedUp();
//                 }
//             }
//             ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//             drawScore();
//             drawPauseInstruction();
//             snakee.draw();
//             applee.draw();
//             timeOut = setTimeout(refreshCanvas, delay);
//         }
//     }

//     function speedUp() {
//         delay = Math.max(30, delay * 0.8);
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         audio.play(); // Lecture du son
//         ctx.save();
//         ctx.font = "bold 50px sans-serif";
//         ctx.fillStyle = "#000";
//         ctx.textAlign = "center";
//         ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50);
//         ctx.fillText("Press Space to Restart", canvasWidth / 2, canvasHeight / 2);
//         ctx.restore();
//     }

//     function restart() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         clearTimeout(timeOut);
//         delay = window.innerWidth < 600 ? 150 : 100;
//         isPaused = false;
//         refreshCanvas();
//     }

//     function togglePause() {
//         isPaused = !isPaused;
//         if (!isPaused) refreshCanvas();
//     }

//     function drawScore() {
//         ctx.save();
//         ctx.font = "bold 30px sans-serif";
//         ctx.fillStyle = "gray";
//         ctx.textAlign = "left";
//         ctx.fillText("Score: " + score, 10, 30);
//         ctx.restore();
//     }

//     function drawPauseInstruction() {
//         ctx.save();
//         ctx.font = "bold 20px sans-serif";
//         ctx.fillStyle = "black";
//         ctx.textAlign = "right";
//         ctx.fillText("Press 'P' to Pause", canvasWidth - 10, 30);
//         ctx.restore();
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#ff0000";
//             for (let i = 0; i < this.body.length; i++) {
//                 drawBlock(ctx, this.body[i]);
//             }
//             ctx.restore();
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             switch (this.direction) {
//                 case "left": nextPosition[0] -= 1; break;
//                 case "right": nextPosition[0] += 1; break;
//                 case "down": nextPosition[1] += 1; break;
//                 case "up": nextPosition[1] -= 1; break;
//             }
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowedDirections = (this.direction === "left" || this.direction === "right") ? ["up", "down"] : ["left", "right"];
//             if (allowedDirections.includes(newDirection)) {
//                 this.direction = newDirection;
//             }
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let [snakeX, snakeY] = head;
//             let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
//             let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
//             return wallCollision || snakeCollision;
//         };
//         this.isEatingApple = function (appleToEat) {
//             let head = this.body[0];
//             return head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1];
//         };
//     }

//     function Apple(position) {
//         this.position = position;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#33cc33";
//             ctx.beginPath();
//             let radius = blockSize / 2;
//             let x = this.position[0] * blockSize + radius;
//             let y = this.position[1] * blockSize + radius;
//             ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//             ctx.fill();
//             ctx.restore();
//         };
//         this.setNewPosition = function () {
//             this.position = [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
//         };
//         this.isOnSnake = function (snakeToCheck) {
//             return snakeToCheck.body.some(block => block[0] === this.position[0] && block[1] === this.position[1]);
//         };
//     }

//     document.onkeydown = function handleKeyDown(e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) restart();
//         if (e.keyCode === 80) togglePause();
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };
// };

// function drawBlock(ctx, position) {
//     ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
// }






// window.onload = function () {
//     let canvas = document.createElement("canvas");
//     let canvasWidth = window.innerWidth > 900 ? 900 : window.innerWidth - 20;
//     let canvasHeight = window.innerHeight > 600 ? 600 : window.innerHeight - 20;
//     let blockSize = 30;
//     let ctx;
//     let delay = window.innerWidth < 600 ? 170 : 100; // Réduction de la vitesse sur mobile
//     let snakee;
//     let applee;
//     let widthInBlocks = Math.floor(canvasWidth / blockSize);
//     let heightInBlocks = Math.floor(canvasHeight / blockSize);
//     let score;
//     let timeOut;
//     let isPaused = false;
//     let audio = new Audio("https://www.soundjay.com/button/beep-07.wav"); // Son de fin de partie

//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
//     canvas.style.border = "5px solid gray";
//     canvas.style.display = "block";
//     canvas.style.margin = "auto";
//     document.body.appendChild(canvas);
//     canvas.style.backgroundColor = "#ddd";
//     ctx = canvas.getContext("2d");

//     let pauseButton = document.createElement("button");
//     pauseButton.innerText = "Pause";
//     pauseButton.style.position = "absolute";
//     pauseButton.style.top = "10px";
//     pauseButton.style.right = "10px";
//     pauseButton.style.fontSize = "20px";
//     pauseButton.style.padding = "10px";
//     pauseButton.onclick = togglePause;
//     document.body.appendChild(pauseButton);

//     init();

//     function init() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         refreshCanvas();
//     }

//     function refreshCanvas() {
//         if (isPaused) return;

//         snakee.advance();
//         if (snakee.checkCollision()) {
//             gameOver();
//         } else {
//             if (snakee.isEatingApple(applee)) {
//                 score++;
//                 snakee.ateApple = true;
//                 do {
//                     applee.setNewPosition();
//                 } while (applee.isOnSnake(snakee));
//                 if (score % 5 === 0) {
//                     speedUp();
//                 }
//             }
//             ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//             drawScore();
//             drawPauseInstruction();
//             snakee.draw();
//             applee.draw();
//             timeOut = setTimeout(refreshCanvas, delay);
//         }
//     }

//     function speedUp() {
//         delay = Math.max(30, delay * 0.8);
//     }

//     function gameOver() {
//         clearTimeout(timeOut);
//         audio.play(); // Lecture du son
//         ctx.save();
//         ctx.font = "bold 50px sans-serif";
//         ctx.fillStyle = "#000";
//         ctx.textAlign = "center";
//         ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 50);
//         ctx.fillText("Press Space to Restart", canvasWidth / 2, canvasHeight / 2);
//         ctx.restore();
//     }

//     function restart() {
//         snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
//         applee = new Apple([10, 10]);
//         score = 0;
//         clearTimeout(timeOut);
//         delay = window.innerWidth < 600 ? 170 : 100;
//         isPaused = false;
//         refreshCanvas();
//     }

//     function togglePause() {
//         isPaused = !isPaused;
//         if (!isPaused) refreshCanvas();
//     }

//     function drawScore() {
//         ctx.save();
//         ctx.font = "bold 30px sans-serif";
//         ctx.fillStyle = "gray";
//         ctx.textAlign = "left";
//         ctx.fillText("Score: " + score, 10, 30);
//         ctx.restore();
//     }

//     function drawPauseInstruction() {
//         ctx.save();
//         ctx.font = "bold 20px sans-serif";
//         ctx.fillStyle = "black";
//         ctx.textAlign = "right";
//         ctx.fillText("Press 'P' to Pause", canvasWidth - 10, 30);
//         ctx.restore();
//     }

//     function Snake(body, direction) {
//         this.body = body;
//         this.direction = direction;
//         this.ateApple = false;
//         this.draw = function () {
//             ctx.save();
//             ctx.fillStyle = "#ff0000";
//             for (let i = 0; i < this.body.length; i++) {
//                 drawBlock(ctx, this.body[i]);
//             }
//             ctx.restore();
//         };
//         this.advance = function () {
//             let nextPosition = this.body[0].slice();
//             switch (this.direction) {
//                 case "left": nextPosition[0] -= 1; break;
//                 case "right": nextPosition[0] += 1; break;
//                 case "down": nextPosition[1] += 1; break;
//                 case "up": nextPosition[1] -= 1; break;
//             }
//             this.body.unshift(nextPosition);
//             if (!this.ateApple) this.body.pop();
//             else this.ateApple = false;
//         };
//         this.setDirection = function (newDirection) {
//             let allowedDirections = (this.direction === "left" || this.direction === "right") ? ["up", "down"] : ["left", "right"];
//             if (allowedDirections.includes(newDirection)) {
//                 this.direction = newDirection;
//             }
//         };
//         this.checkCollision = function () {
//             let head = this.body[0];
//             let rest = this.body.slice(1);
//             let [snakeX, snakeY] = head;
//             let wallCollision = snakeX < 0 || snakeX >= widthInBlocks || snakeY < 0 || snakeY >= heightInBlocks;
//             let snakeCollision = rest.some(block => block[0] === snakeX && block[1] === snakeY);
//             return wallCollision || snakeCollision;
//         };
//         this.isEatingApple = function (appleToEat) {
//             let head = this.body[0];
//             return head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1];
//         };
//     }

//     document.onkeydown = function handleKeyDown(e) {
//         let directions = { 37: "left", 38: "up", 39: "right", 40: "down" };
//         if (e.keyCode === 32) restart();
//         if (e.keyCode === 80) togglePause();
//         if (directions[e.keyCode]) snakee.setDirection(directions[e.keyCode]);
//     };
// };

// function drawBlock(ctx, position) {
//     ctx.fillRect(position[0] * 30, position[1] * 30, 30, 30);
// }
