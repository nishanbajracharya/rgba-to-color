const expect = require('chai').expect;

const rgbaToColor = require('./index');

describe('# Positive Tests', () => {
  it('Should give positon results', () => {
    const input = 'rgba(0, 0, 0, 0.7)';
    const output = {
      hex: '#4c4c4c',
      rgb: 'rgb(76, 76, 76)',
      rgba: 'rgba(0, 0, 0, 0.7)',
      hsl: 'hsl(0, 0.00%, 29.80%)'
    }
    const result = rgbaToColor(input);

    expect(result).to.deep.equal(output);
  });

  it('Should give positon results', () => {
    const input = 'rgba(0, 0, 0, 0)';
    const output = {
      hex: '#ffffff',
      rgba: 'rgba(0, 0, 0, 0)',
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0.00%, 100.00%)'
    }
    const result = rgbaToColor(input);

    expect(result).to.deep.equal(output);
  });

  it('Should give positon results', () => {
    const input = 'rgba(0, 0, 0, 1)';
    const output = {
      hex: '#000000',
      rgb: 'rgb(0, 0, 0)',
      rgba: 'rgba(0, 0, 0, 1)',
      hsl: 'hsl(0, 0.00%, 0.00%)'
    }
    const result = rgbaToColor(input);

    expect(result).to.deep.equal(output);
  });
});
