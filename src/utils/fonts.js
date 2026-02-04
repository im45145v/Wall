/**
 * Font options for notes
 * 
 * Shared font collection for consistent typography across the app
 */

export const fontOptions = [
  // Handwritten & Casual
  { name: 'Caveat', family: 'Caveat, cursive', category: 'Handwritten' },
  { name: 'Patrick Hand', family: 'Patrick Hand, cursive', category: 'Handwritten' },
  { name: 'Kalam', family: 'Kalam, cursive', category: 'Handwritten' },
  { name: 'Indie Flower', family: 'Indie Flower, cursive', category: 'Handwritten' },
  { name: 'Architects Daughter', family: 'Architects Daughter, cursive', category: 'Handwritten' },
  { name: 'Shadows Into Light', family: 'Shadows Into Light, cursive', category: 'Handwritten' },
  { name: 'Permanent Marker', family: 'Permanent Marker, cursive', category: 'Handwritten' },
  
  // Serif - Classic & Bookish
  { name: 'Crimson Text', family: 'Crimson Text, serif', category: 'Serif' },
  { name: 'Lora', family: 'Lora, serif', category: 'Serif' },
  { name: 'Merriweather', family: 'Merriweather, serif', category: 'Serif' },
  { name: 'Playfair Display', family: 'Playfair Display, serif', category: 'Serif' },
  { name: 'Libre Baskerville', family: 'Libre Baskerville, serif', category: 'Serif' },
  { name: 'EB Garamond', family: 'EB Garamond, serif', category: 'Serif' },
  
  // Sans-Serif - Clean & Modern
  { name: 'Inter', family: 'Inter, sans-serif', category: 'Sans-Serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'Sans-Serif' },
  { name: 'Nunito', family: 'Nunito, sans-serif', category: 'Sans-Serif' },
  { name: 'Raleway', family: 'Raleway, sans-serif', category: 'Sans-Serif' },
  
  // Display & Special
  { name: 'Special Elite', family: 'Special Elite, cursive', category: 'Display' },
  { name: 'Courier Prime', family: 'Courier Prime, monospace', category: 'Display' },
  { name: 'Anonymous Pro', family: 'Anonymous Pro, monospace', category: 'Display' },
];

export const getFontFamily = (fontName) => {
  const font = fontOptions.find(f => f.name === fontName);
  return font ? font.family : 'Caveat, cursive';
};
