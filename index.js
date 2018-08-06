/**
 * @typedef {Object} Color
 * @property {string} hex
 * @property {string} hsl
 * @property {string} rgb
 * @property {string} rgba
 */

// Utility Functions

/**
 * Clamps a number between a min and a max value
 *
 * @param {number} number
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
const clamp = (number, min, max) => Math.max(min, Math.min(number, max));

/**
 * Removes whitespace from a string
 *
 * @param {string} string
 *
 * @returns {string}
 */
const trimWhitespace = string => string.replace(/\s/g, '');

/**
 * Converts an rgba string into an array of r, g, b and a values
 *
 * @param {string} rgba
 *
 * @returns {Array}
 */
const getRGBArray = rgba => rgba.replace('rgba(', '').replace(')', '').split(',');

/**
 * Converts r, g, b values into an rgb string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
const getRGBString = (r, g, b) => `rgb(${r}, ${g}, ${b})`

/**
 * Converts r, g, b values into a hex string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * Converts r, g, b values into an hsl string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
const rgbToHsl = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(2)}%, ${(l * 100).toFixed(2)}%)`;
}

/**
 *
 * @param {String} rgba
 *
 * @returns {Color}
 */
const rgbaToColor = rgba => {
  const [r, g, b, a] = getRGBArray(trimWhitespace(rgba));

  const newColors = [r, g, b].map(val => clamp(Math.ceil(255 + a * (val - 255)), 0, 255));

  return {
    hex: rgbToHex(...newColors),
    hsl: rgbToHsl(...newColors),
    rgb: getRGBString(...newColors),
    rgba
  };
}

module.exports = rgbaToColor;
