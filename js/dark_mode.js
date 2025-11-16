(function() {
  'use strict';

  // Check for saved dark mode preference or default to light mode
  const savedMode = localStorage.getItem('darkMode');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Apply dark mode on page load if previously saved or system prefers dark
  if (savedMode === 'enabled' || (savedMode === null && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  }

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');

    // Update icon based on current mode
    function updateIcon() {
      if (document.documentElement.classList.contains('dark-mode')) {
        toggleIcon.textContent = '☀️';
      } else {
        toggleIcon.textContent = '🌙';
      }
    }

    // Initialize icon
    updateIcon();

    // Toggle dark mode on button click
    toggleButton.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      document.body.classList.toggle('dark-mode');

      // Save preference to localStorage
      if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }

      // Update icon
      updateIcon();
    });
  });
})();
