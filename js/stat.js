'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var COLUMN_GAP = 50;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderElements = function(ctx, players, times, maxTime) {
  for (var i = 0; i < players.length; i++) {

    ctx.fillStyle = (players[i] == 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + (25 + i * 50) + '%, 50%)';

    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT, BAR_WIDTH, -(barHeight * times[i]) / maxTime);

    ctx.fillStyle = "#000";
    ctx.fillText(players[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
  }

  ctx.font = 'PT Mono 16px';
  ctx.fillText('Ура вы победили!', CLOUD_X + COLUMN_GAP, CLOUD_Y + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + COLUMN_GAP, CLOUD_Y + 2 * TEXT_HEIGHT);
}


window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);
  renderElements (ctx, players, times, maxTime);
};
