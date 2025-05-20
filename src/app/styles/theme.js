// Theme options for the website
export const themes = {
  // Option 1: Dark theme
  dark: {
    background: '#1c1c1c',
    text: '#ffffff',
    heading: '#ffffff',
    accent: '#d3d3d3',
    link: '#d3d3d3',
    fontFamily: "'Courier New', Courier, monospace"
  },
  
  // Option 2: Light theme with green text
  light: {
    background: '#ffffff',
    text: '#6a7b4f',
    heading: '#6a7b4f',
    accent: '#9cac7f',
    link: '#6a7b4f',
    fontFamily: "'Courier New', Courier, monospace"
  }
};

// Export a function to easily get all colors for a specific theme
export const getThemeColors = (themeName) => {
  return themes[themeName] || themes.dark; // Default to dark theme if not found
}; 