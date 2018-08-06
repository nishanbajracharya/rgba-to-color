'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
var clamp = function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
};

/**
 * Removes whitespace from a string
 *
 * @param {string} string
 *
 * @returns {string}
 */
var trimWhitespace = function trimWhitespace(string) {
  return string.replace(/\s/g, '');
};

/**
 * Converts an rgba string into an array of r, g, b and a values
 *
 * @param {string} rgba
 *
 * @returns {Array}
 */
var getRGBArray = function getRGBArray(rgba) {
  return rgba.replace('rgba(', '').replace(')', '').split(',');
};

/**
 * Converts r, g, b values into an rgb string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
var getRGBString = function getRGBString(r, g, b) {
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

/**
 * Converts r, g, b values into a hex string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
var rgbToHex = function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Converts r, g, b values into an hsl string
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 *
 * @returns {string}
 */
var rgbToHsl = function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h = void 0,
      s = void 0,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);break;
      case g:
        h = (b - r) / d + 2;break;
      case b:
        h = (r - g) / d + 4;break;
    }
    h /= 6;
  }

  return 'hsl(' + (h * 360).toFixed(0) + ', ' + (s * 100).toFixed(2) + '%, ' + (l * 100).toFixed(2) + '%)';
};

/**
 *
 * @param {String} rgba
 *
 * @returns {Color}
 */
var rgbaToColor = function rgbaToColor(rgba) {
  var _getRGBArray = getRGBArray(trimWhitespace(rgba)),
      _getRGBArray2 = _slicedToArray(_getRGBArray, 4),
      r = _getRGBArray2[0],
      g = _getRGBArray2[1],
      b = _getRGBArray2[2],
      a = _getRGBArray2[3];

  var newColors = [r, g, b].map(function (val) {
    return clamp(Math.floor(255 + a * (val - 255)), 0, 255);
  });

  return {
    hex: rgbToHex.apply(undefined, _toConsumableArray(newColors)),
    hsl: rgbToHsl.apply(undefined, _toConsumableArray(newColors)),
    rgb: getRGBString.apply(undefined, _toConsumableArray(newColors)),
    rgba: rgba
  };
};

module.exports = rgbaToColor;
