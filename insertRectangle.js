function insertRectangle(existingRects, targetLocation, newRectWidth, newRectHeight) {
    function check(dx, dy) {
        const x = targetLocation.x + dx;
        const y = targetLocation.y + dy;

        // Check if the new rectangle would intersect with any existing rectangle
        let intersects = false;
        for (let i = 0; i < existingRects.length; i++) {
            if (doesIntersect({ x, y, width: newRectWidth, height: newRectHeight }, existingRects[i])) {
                intersects = true;
                break;
            }
        }

        // If it doesn't intersect, calculate the distance to the target location
        if (!intersects) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bestDistance) {
                bestLocation = { x, y };
                bestDistance = distance;
            }
        }
    
        return intersects;
    }

    const canPlaced = check(0, 0);
    if (canPlaced) {
        // The new rectangle can be placed at the target location
        return targetLocation;
    }

    let bestLocation = null;
    let bestDistance = Infinity;

    // Calculate the search range based on the new rectangle size
    const searchRangeX = newRectWidth * 2;
    const searchRangeY = newRectHeight * 2;

    // Search step size
    const SEARCH_STEP = 10;
    // Iterate over a reduced grid around the target location
    for (let dx = -searchRangeX; dx <= searchRangeX; dx += SEARCH_STEP) {
        for (let dy = -searchRangeY; dy <= searchRangeY; dy += SEARCH_STEP) {
            check(dx, dy);
        }
    }

    return bestLocation;
}

function doesIntersect(rect1, rect2) {
    return (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y);
}

// Example usage:
const existingRects = [
    {x: 100, y: 100, width: 50, height: 50},
    {x: 200, y: 200, width: 50, height: 50},
    {x: 200, y: 50, width: 50, height: 50},
    {x: 500, y: 100, width: 50, height: 50},
];

const padding = 4;
const targetLocation = { x: 150 + padding, y: 100 + padding };
const newRectWidth = 350 - padding * 2;
const newRectHeight = 100 - padding * 2;

const newRectLocation = insertRectangle(existingRects, targetLocation, newRectWidth, newRectHeight);
if (newRectLocation) {
    console.log(`New rectangle placed at (${newRectLocation.x}, ${newRectLocation.y})`);
} else {
    console.log("No valid location found");
}


const { createCanvas } = require('canvas');
const fs = require('fs');

// Example usage
const canvasWidth = 600;
const canvasHeight = 600;
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Draw all rectangles on canvas
ctx.clearRect(0, 0, canvasWidth, canvasHeight);
existingRects.forEach(rect => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
});

ctx.fillStyle = 'yellow';
ctx.fillRect(targetLocation.x, targetLocation.y, newRectWidth, newRectHeight);

if (newRectLocation) {
    ctx.fillRect(newRectLocation.x, newRectLocation.y, newRectWidth, newRectHeight);
}

// Save or serve the canvas as needed
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./output.png', buffer);
console.log('Canvas saved to output.png');
