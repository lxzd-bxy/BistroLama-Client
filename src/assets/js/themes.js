export const defaultThemes = {
  light: {
    '--color-bg': '#ffffff',
    '--color-text': '#333333',
    '--color-primary': '#42b983',
  },
  dark: {
    '--color-bg': '#1a1a1a',
    '--color-text': '#f0f0f0',
    '--color-primary': '#88c999',
  }
};

export const loadCustomThemes = () => {
  return JSON.parse(localStorage.getItem('customThemes')) || {};
};
