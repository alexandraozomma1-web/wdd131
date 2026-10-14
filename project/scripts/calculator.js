document.addEventListener("DOMContentLoaded", () => {
    const calcForm = document.getElementById("savings-calculator-form");
    const resultsBox = document.getElementById("calculator-results");
    const vehicleTypeSelect = document.getElementById("vehicle-type");
    const customPetrolInput = document.getElementById("custom-petrol");

    if (!calcForm || !resultsBox) return;

    // Set dynamic default petrol price when vehicle selection changes
    if (vehicleTypeSelect && customPetrolInput) {
        customPetrolInput.value = vehicleTypeSelect.value === "keke" ? 20000 : 10000;

        vehicleTypeSelect.addEventListener("change", () => {
            customPetrolInput.value = vehicleTypeSelect.value === "keke" ? 20000 : 10000;
        });
    }

    // Hide results box initially
    resultsBox.style.display = "none";

    // Handle form submit
    calcForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const vehicleType = vehicleTypeSelect.value;
        const userPetrol = parseFloat(customPetrolInput.value) || 0;
        const swapsCount = parseInt(document.getElementById("daily-swaps").value, 10) || 2;

        let swapRatePerUnit = 0;
        let conversionCost = 0;

        if (vehicleType === "keke") {
            swapRatePerUnit = 2250;   // ₦2,250 per swap (2 swaps = ₦4,500/day)
            conversionCost = 3500000; // ₦3.5M conversion cost
        } else {
            swapRatePerUnit = 1250;   // ₦1,250 per swap (2 swaps = ₦2,500/day)
            conversionCost = 1500000; // ₦1.5M conversion cost
        }

        const totalDailySwapCost = swapRatePerUnit * swapsCount;
        const dailySavings = userPetrol - totalDailySwapCost;

        // If petrol entered is less than swap cost, alert or prevent negative payback
        if (dailySavings <= 0) {
            alert("Your entered daily petrol cost is lower than the solar swap cost. Please enter a realistic daily fuel budget.");
            return;
        }

        const monthlySavings = dailySavings * 26; // 26 working days per month
        const annualSavings = monthlySavings * 12;

        // Payback Period Calculations based on driver's actual custom input
        const paybackDays = Math.ceil(conversionCost / dailySavings);
        const paybackMonths = (paybackDays / 26).toFixed(1);

        // Update UI Outputs
        document.getElementById("res-petrol").textContent = `₦${userPetrol.toLocaleString()}`;
        document.getElementById("res-swap").textContent = `₦${totalDailySwapCost.toLocaleString()} (${swapsCount} swap${swapsCount > 1 ? 's' : ''})`;
        document.getElementById("res-daily-savings").textContent = `₦${dailySavings.toLocaleString()}`;
        document.getElementById("res-monthly-savings").textContent = `₦${monthlySavings.toLocaleString()}`;
        document.getElementById("res-payback").textContent = `~${paybackMonths} Months (${paybackDays} operating days)`;
        document.getElementById("res-annual-profit").textContent = `₦${annualSavings.toLocaleString()} / year`;

        // Unhide summary container
        resultsBox.style.display = "block";
    });
});