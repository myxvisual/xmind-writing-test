// Define Rectangle class
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(other) {
        // Check if this rectangle intersects with another rectangle
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }
}

// Define Quadtree class for spatial indexing and collision detection
class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // { x, y, width, height }
        this.capacity = capacity; // max number of objects per node
        this.rectangles = [];
        this.divided = false;
    }

    insert(rectangle) {
        if (!this.boundaryContains(rectangle)) {
            return false;
        }

        if (this.rectangles.length < this.capacity) {
            this.rectangles.push(rectangle);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northeast.insert(rectangle) ||
            this.northwest.insert(rectangle) ||
            this.southeast.insert(rectangle) ||
            this.southwest.insert(rectangle)
        );
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let ne = new Quadtree({ x: x + w / 2, y: y, width: w / 2, height: h / 2 }, this.capacity);
        let nw = new Quadtree({ x: x, y: y, width: w / 2, height: h / 2 }, this.capacity);
        let se = new Quadtree({ x: x + w / 2, y: y + h / 2, width: w / 2, height: h / 2 }, this.capacity);
        let sw = new Quadtree({ x: x, y: y + h / 2, width: w / 2, height: h / 2 }, this.capacity);

        this.northeast = ne;
        this.northwest = nw;
        this.southeast = se;
        this.southwest = sw;

        this.divided = true;

        // Move existing rectangles to appropriate children
        for (let rect of this.rectangles) {
            if (ne.insert(rect)) continue;
            if (nw.insert(rect)) continue;
            if (se.insert(rect)) continue;
            if (sw.insert(rect)) continue;
        }

        this.rectangles = []; // Clear rectangles array in parent node
    }

    boundaryContains(rectangle) {
        return (
            rectangle.x >= this.boundary.x &&
            rectangle.x + rectangle.width <= this.boundary.x + this.boundary.width &&
            rectangle.y >= this.boundary.y &&
            rectangle.y + rectangle.height <= this.boundary.y + this.boundary.height
        );
    }

    findClosestNonIntersectingPoint(targetX, targetY, width, height) {
        // Function to find the closest non-intersecting position near target
        let newRectangle = new Rectangle(targetX, targetY, width, height);
        let found = false;

        while (!found) {
            // Check for intersection with existing rectangles using Quadtree
            let intersectingRectangles = this.queryRange(newRectangle);

            found = true; // Assume we found a valid position

            for (let rect of intersectingRectangles) {
                if (newRectangle.intersects(rect)) {
                    found = false; // Found intersection, try a different position
                    newRectangle.x += 1; // Adjust position (example: move right by 1 pixel)
                    break;
                }
            }
        }

        return { x: newRectangle.x, y: newRectangle.y };
    }

    queryRange(range) {
        let found = [];

        if (!this.intersectsRange(range)) {
            return found;
        }

        for (let rect of this.rectangles) {
            if (
                rect.x < range.x + range.width &&
                rect.x + rect.width > range.x &&
                rect.y < range.y + range.height &&
                rect.y + rect.height > range.y
            ) {
                found.push(rect);
            }
        }

        if (this.divided) {
            found = found.concat(this.northeast.queryRange(range));
            found = found.concat(this.northwest.queryRange(range));
            found = found.concat(this.southeast.queryRange(range));
            found = found.concat(this.southwest.queryRange(range));
        }

        return found;
    }

    intersectsRange(range) {
        return !(
            range.x + range.width < this.boundary.x ||
            range.x > this.boundary.x + this.boundary.width ||
            range.y + range.height < this.boundary.y ||
            range.y > this.boundary.y + this.boundary.height
        );
    }
}

// Example usage:
let quadtree = new Quadtree({ x: 0, y: 0, width: 1000, height: 1000 }, 4); // Example boundary and capacity


let existingRectangles = [
    new Rectangle(100, 100, 50, 50),
    new Rectangle(200, 200, 50, 50),
    new Rectangle(200, 50, 50, 50),
    new Rectangle(500, 100, 50, 50),
    // Add more rectangles as needed
];

// Insert existing rectangles into Quadtree
existingRectangles.forEach(rect => {
    quadtree.insert(rect);
});

// Function to insert new rectangle near target location
function insertRectangleNearTarget(targetX, targetY, width, height) {
    // Find closest non-intersecting position using Quadtree
    let { x, y } = quadtree.findClosestNonIntersectingPoint(targetX, targetY, width, height);

    // Create new rectangle and insert into Quadtree
    let newRectangle = new Rectangle(x, y, width, height);
    quadtree.insert(newRectangle);

    return newRectangle;
}

// Example usage: Insert a new rectangle near target position
const padding = 0;
const newWidth = 100;
const newHeight = 100;
const targetX = 120 + padding;
const targetY = 100 + padding;

let newRectangle = insertRectangleNearTarget(targetX, targetY, newWidth, newHeight);
console.log("Inserted new rectangle at:", newRectangle.x, newRectangle.y);

// Draw all rectangles on canvas
const { createCanvas } = require('canvas');
const fs = require('fs');

// Example usage
const canvasWidth = 600;
const canvasHeight = 600;
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Draw all rectangles on canvas
ctx.clearRect(0, 0, canvasWidth, canvasHeight);
existingRectangles.forEach(existingRectangle => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(existingRectangle.x, existingRectangle.y, existingRectangle.width, existingRectangle.height);
});

ctx.fillStyle = 'yellow';
ctx.fillRect(newRectangle.x, newRectangle.y, newRectangle.width, newRectangle.height);


// Save or serve the canvas as needed
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./output.png', buffer);
console.log('Canvas saved to output.png');
