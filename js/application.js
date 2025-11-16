// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var gridSize = window.GameConfig ? window.GameConfig.getGridSize() : 4;
  new GameManager(gridSize, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
