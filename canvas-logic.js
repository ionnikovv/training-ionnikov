var can = document.getElementsByClassName('game-block');

var ctx = can.getContext('2d');

can.width = 600;
can.height = 600;

var img = new Image();

img.src = './src/assets/game-background.jpg';

window.onload = function () {
  var imgHeight = 0;
  var scrollSpeed = 10;

  function loop() {
    ctx.drawImage(img, 0, imgHeight);

    ctx.drawImage(img, 0, imgHeight - can.height);

    imgHeight += scrollSpeed;

    if (imgHeight == can.height) imgHeight = 0;

    window.requestAnimationFrame(loop);
  }
  loop();
};
