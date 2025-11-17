// Game configuration based on URL path
(function() {
  'use strict';

  window.GameConfig = {
    // Detect grid size from current URL path
    getGridSize: function() {
      var path = window.location.pathname;

      if (path.indexOf('/3x3') !== -1) {
        return 3;
      } else if (path.indexOf('/5x5') !== -1) {
        return 5;
      } else {
        return 4; // Default 4x4
      }
    },

    // Get mode name for display
    getModeName: function() {
      var size = this.getGridSize();
      return size + 'x' + size;
    },

    // Get storage key suffix for current mode
    // 4x4 mode uses no suffix for backward compatibility
    getStorageSuffix: function() {
      var size = this.getGridSize();
      if (size === 4) {
        return ''; // Standard 4x4 mode uses no suffix
      }
      return '-' + this.getModeName();
    }
  };
})();
