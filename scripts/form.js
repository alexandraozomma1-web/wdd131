
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power converters", averagerating: 4.7 },
  { id: "fs-1987", name: "time warp equalizer", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Populate Select Options dynamically
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.querySelector("#productName");

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name; 
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    document.querySelector("#currentyear").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
});

