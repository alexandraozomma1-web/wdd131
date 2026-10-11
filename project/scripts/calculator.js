

document.addEventListener("DOMContentLoaded", () => {
    // 1. Select Form & Input Elements matching menu.html
    const calcForm = document.getElementById("savings-form");
    const dailyDistanceInput = document.getElementById("daily-distance");
    const swapFrequencySelect = document.getElementById("swap-frequency");

    // Output Display Elements matching menu.html
    const calcResultsBox = document.getElementById("calc-results");
    const petrolCostDisplay = document.getElementById("petrol-cost");
    const solarCostDisplay = document.getElementById("solar-cost");
    const dailySavingsDisplay = document.getElementById("daily-savings");
    const monthlySavingsDisplay = document.getElementById("monthly-savings");

    // Exit early if the calculator form is not on the current page
    if (!calcForm) return;

    // Fixed economic estimates for calculation
    const PETROL_COST_PER_KM = 150;  // Estimated NGN petrol cost per km
    const SOLAR_SWAP_COST_PER_KM = 80; // Estimated NGN solar swap cost per km
    const OPERATIONAL_DAYS_PER_MONTH = 26;

    // 2. Calculation Logic Function
    function calculateSavings(e) {
        if (e) e.preventDefault();

        const dailyKm = parseFloat(dailyDistanceInput.value) || 0;
        const swaps = parseInt(swapFrequencySelect.value, 10) || 1;

        if (dailyKm <= 0) return;

        // Daily costs based on distance and swap pricing
        const dailyPetrolCost = dailyKm * PETROL_COST_PER_KM;
        const dailySolarCost = dailyKm * SOLAR_SWAP_COST_PER_KM * (swaps * 0.5); // scaled by swap frequency
        
        const dailySavings = dailyPetrolCost - dailySolarCost;
        const monthlySavings = dailySavings * OPERATIONAL_DAYS_PER_MONTH;

        // 3. Update DOM Output Displays
        petrolCostDisplay.textContent = Math.round(dailyPetrolCost).toLocaleString();
        solarCostDisplay.textContent = Math.round(dailySolarCost).toLocaleString();
        dailySavingsDisplay.textContent = Math.round(dailySavings).toLocaleString();
        monthlySavingsDisplay.textContent = Math.round(monthlySavings).toLocaleString();

        // Reveal the results box
        if (calcResultsBox) {
            calcResultsBox.style.display = "block";
        }
    }

    // 4. Attach Event Listener for Form Submission
    calcForm.addEventListener("submit", calculateSavings);
});