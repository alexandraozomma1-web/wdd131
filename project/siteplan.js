

document.addEventListener("DOMContentLoaded", () => {
    console.log("Solar Charge Africa script loaded successfully.");

    // 1. Dynamic Footer Year Update
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Solar Charge Africa | Alexandra Ozomma`;
    }

    // 2. Solar Savings Calculator Function (Preview / Teaser)
    // This function calculates estimated daily and monthly savings when switching from petrol to solar EV.
    function calculateFuelSavings(dailyKm, petrolPricePerLiter) {
        // Average petrol efficiency: 25 km per liter
        const litersUsedPerDay = dailyKm / 25;
        const dailyPetrolCost = litersUsedPerDay * petrolPricePerLiter;

        // Estimated Solar EV swap/charging cost (approx 60% cheaper than petrol)
        const dailySolarCost = dailyPetrolCost * 0.4;
        const dailySavings = dailyPetrolCost - dailySolarCost;
        const monthlySavings = dailySavings * 30;

        return {
            petrolCost: Math.round(dailyPetrolCost),
            solarCost: Math.round(dailySolarCost),
            dailySavings: Math.round(dailySavings),
            monthlySavings: Math.round(monthlySavings)
        };
    }

    // Example trigger for testing calculation logic in browser console
    // e.g., 80km daily distance at ₦1,100 per liter of petrol
    const sampleSavings = calculateFuelSavings(80, 1100);
    console.log(`Estimated Daily Petrol Cost: ₦${sampleSavings.petrolCost}`);
    console.log(`Estimated Daily Solar EV Cost: ₦${sampleSavings.solarCost}`);
    console.log(`Estimated Daily Savings: ₦${sampleSavings.dailySavings}`);
    console.log(`Estimated Monthly Savings: ₦${sampleSavings.monthlySavings}`);
});