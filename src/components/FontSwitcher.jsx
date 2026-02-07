import { useState, useEffect } from 'react';
import { fontOptions } from '../utils/fonts';
import './FontSwitcher.css';

/**
 * FontSwitcher - Typography control panel
 * 
 * NOTE: This component is currently unused but available for future use.
 * Provides ~20 font options that dramatically change the wall's feel.
 * Mix of serif, handwritten, clean reading, and display fonts.
 */

function FontSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem('wall-font') || 'Caveat';
  });

  useEffect(() => {
    // Apply selected font to document
    const font = fontOptions.find(f => f.name === selectedFont);
    if (font) {
      document.documentElement.style.setProperty('--font-handwritten', font.family);
      document.documentElement.style.setProperty('--font-body', font.family);
      localStorage.setItem('wall-font', selectedFont);
    }
  }, [selectedFont]);

  const handleFontChange = (fontName) => {
    setSelectedFont(fontName);
    setIsOpen(false);
  };

  // Group fonts by category
  const fontsByCategory = fontOptions.reduce((acc, font) => {
    if (!acc[font.category]) {
      acc[font.category] = [];
    }
    acc[font.category].push(font);
    return acc;
  }, {});

  return (
    <div className="font-switcher">
      <button
        className="font-switcher__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change font"
        title="Change font"
      >
        <svg className="font-switcher__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-switcher__label">Font</span>
      </button>

      {isOpen && (
        <>
          <div className="font-switcher__backdrop" onClick={() => setIsOpen(false)} />
          <div className="font-switcher__panel">
            <div className="font-switcher__header">
              <h3 className="font-switcher__title">Choose Your Font</h3>
              <button
                className="font-switcher__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className="font-switcher__content">
              {Object.entries(fontsByCategory).map(([category, fonts]) => (
                <div key={category} className="font-switcher__category">
                  <h4 className="font-switcher__category-title">{category}</h4>
                  <div className="font-switcher__options">
                    {fonts.map((font) => (
                      <button
                        key={font.name}
                        className={`font-switcher__option ${selectedFont === font.name ? 'font-switcher__option--active' : ''}`}
                        style={{ fontFamily: font.family }}
                        onClick={() => handleFontChange(font.name)}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FontSwitcher;
