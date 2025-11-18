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

    // Detect theme from URL path
    getTheme: function() {
      var path = window.location.pathname;
      if (path.indexOf('/2048-classic') !== -1) {
        return 'classic';
      }
      return 'cupcakes';
    },

    // Check if classic theme
    isClassic: function() {
      return this.getTheme() === 'classic';
    },

    // Get mode name for display
    getModeName: function() {
      var size = this.getGridSize();
      return size + 'x' + size;
    },

    // Get storage key suffix for current mode
    // 4x4 cupcakes mode uses no suffix for backward compatibility
    getStorageSuffix: function() {
      var size = this.getGridSize();
      var theme = this.getTheme();
      var suffix = '';

      // Add theme suffix for classic
      if (theme === 'classic') {
        suffix = '-classic';
      }

      // Add size suffix for non-4x4 modes
      if (size !== 4) {
        suffix += '-' + this.getModeName();
      }

      return suffix;
    }
  };
})();
