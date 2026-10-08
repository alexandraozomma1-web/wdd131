
let numReviews = Number(window.localStorage.getItem("numReviews-ls")) || 0;

// Increment count for this visit/submission
numReviews++;

// Save updated count back to localStorage
localStorage.setItem("numReviews-ls", numReviews);

// Update the DOM element
document.querySelector("#review-count").textContent = numReviews;

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;