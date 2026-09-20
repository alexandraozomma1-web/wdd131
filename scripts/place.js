document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;


const tempElement = document.getElementById("temp");
const temp = parseFloat(tempElement.textContent);

const windSpeed = 12.5; 

// Calculate wind chill function
const calculateWindChill = (t, v) => (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);

// Corrected element lookup (no # symbol)
const windChillElement = document.getElementById("chill");

if (temp <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
} else {
    windChillElement.textContent = "N/A";
}