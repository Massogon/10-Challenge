const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Function to generate SVG content based on the shape, color, text, and text color
function modifySVG(logoShape, logoColor, logoText, textColor) {
    let shapeSVG;
    if (logoShape === 'circle') {
        shapeSVG = `<circle cx="150" cy="100" r="80" fill="${logoColor}" />`;
    } else if (logoShape === 'square') {
        shapeSVG = `<rect x="50" y="50" width="200" height="200" fill="${logoColor}" />`;
    } else if (logoShape === 'triangle') {
        shapeSVG = `<polygon points="150,10 270,190 30,190" fill="${logoColor}" />`;
    }

    // Create the final SVG content with shape and text
    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shapeSVG}
            <text x="150" y="125" font-size="40" text-anchor="middle" fill="${textColor}">${logoText}</text>
        </svg>
    `;
    
    return svgContent;
}

// Inquirer prompts for user input
const prompts = [
    {
        type: 'list',
        name: 'logoShape',
        message: 'Choose the shape of your logo:',
        choices: ['circle', 'square', 'triangle']
    },
    {
        type: 'input',
        name: 'logoColor',
        message: 'Enter the color for your logo (keyword or hex):'
    },
    {
        type: 'input',
        name: 'logoText',
        message: 'Enter the text for your logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be 3 characters or less.'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color for your logo (keyword or hex):'
    }
];

// Prompt user for input and generate SVG file
inquirer.prompt(prompts)
    .then(answers => {
        const { logoShape, logoColor, logoText, textColor } = answers;

        // Generate the SVG content
        const svgContent = modifySVG(logoShape, logoColor, logoText, textColor);

        // Write the SVG content to file
        const filename = 'logo.svg';
        fs.writeFileSync(filename, svgContent);
        console.log(`Generated ${filename}`);
    })
    .catch(error => {
        console.error('Error occurred during prompts:', error);
    });

// Export modifySVG function for testing or reuse
module.exports = {
    modifySVG,
};
