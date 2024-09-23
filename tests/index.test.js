const fs = require('fs');
const path = require('path');
const { modifySVG } = require('../index'); // Adjust the path as needed

jest.mock('fs');

describe('modifySVG function', () => {
    const logoColor = 'blue';
    const logoText = 'Test';
    const textColor = 'white';

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should correctly modify SVG content with color and text for circle', () => {
        const modifiedSVG = modifySVG('circle', logoColor, logoText, textColor);

        expect(modifiedSVG).toContain(`<circle cx="150" cy="100" r="80" fill="${logoColor}" />`);
        expect(modifiedSVG).toContain(`<text x="150" y="125" font-size="40" text-anchor="middle" fill="${textColor}">${logoText}</text>`);
    });

    it('should correctly modify SVG content with color and text for square', () => {
        const modifiedSVG = modifySVG('square', 'green', 'SQ', 'yellow');

        expect(modifiedSVG).toContain(`<rect x="50" y="50" width="200" height="200" fill="green" />`);
        expect(modifiedSVG).toContain(`<text x="150" y="125" font-size="40" text-anchor="middle" fill="yellow">SQ</text>`);
    });

    it('should correctly modify SVG content with color and text for triangle', () => {
        const modifiedSVG = modifySVG('triangle', 'red', 'TRI', 'black');

        expect(modifiedSVG).toContain(`<polygon points="150,10 270,190 30,190" fill="red" />`);
        expect(modifiedSVG).toContain(`<text x="150" y="125" font-size="40" text-anchor="middle" fill="black">TRI</text>`);
    });
});
