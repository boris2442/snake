window.onload = function () {
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 100;
  let xCoor = 0;
  let yCood = 0;
  let snakee;
  let applee;
  let widthBlock = canvasWidth / blockSize;
  let height = canvasHeight / blockSize;
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
    snakee = new Snake([6, 4], [5, 4], [4, 4], [3, 4], [2, 4], "right");
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
        } while (applee.isOnsnake(snakee));
        if (score % 5 == 0) {
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
    delay /= 2;
  }
  function gameOver() {
    ctx.save();
    ctx.font = "bold 70px sans-serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.StrokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.centreX = canvasWidth.width / 2;
    ctx.centreY = canvasHeight.height / 2;
    ctx.stokeText("Game Over", centreX, centreY - 180);
    ctx.fillText("Game Over", centreX, centreY - 180);
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText(
      "Appuyer sur la touche espace pour rejouer",
      centreX,
      centreY - 120
    );
    ctx.fillText(
      "Appuyer sur la touche espace pour rejouer",
      centreX,
      centreY - 120
    );
    ctx.restore();
  }
  function restart(){
    snakee=new Snake([[6,4], [5,4], [4,4], [3,4],[2,4]], "right");
    applee=new Apple([10,10]);
    score=0;
    clearTimeout(timeOut);
    delay:100;
    refreshCanvas();
  }
  function drawScore(){
    ctx.save();
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle="gray";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    let centreX=canvasWidth/2;
    let centreY=canvasHeight/2;
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
  }
};
