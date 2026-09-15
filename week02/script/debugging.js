// 1. Fixed selector syntax (added # for ID)
const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area'); // Added '#'

let area = 0;
const PI = 3.14159;

// 2. First calculation & output using .textContent (not reassigning the const)
let radius = 10;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// 3. Second calculation & output
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;