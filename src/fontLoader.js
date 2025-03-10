// Font loading checker
document.addEventListener('DOMContentLoaded', () => {
  // Check if fonts are loaded
  if (document.fonts) {
    document.fonts.ready.then(() => {
      console.log('All fonts loaded successfully');
      
      // Add class to body when fonts are ready
      document.body.classList.add('fonts-loaded');
      
      // Log which fonts are available
      const fontFamilies = ['Garamond', 'Instrument', 'Garamonditalic'];
      fontFamilies.forEach(font => {
        if (document.fonts.check(`12px "${font}"`)) {
          console.log(`"${font}" is available`);
        } else {
          console.warn(`"${font}" is NOT available`);
        }
      });
    });
  }
});
