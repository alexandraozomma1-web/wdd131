document.addEventListener("DOMContentLoaded", () => {
    // 12 & 13. JS Objects & Arrays (Storing vehicle configurations as an Array of Objects)
    const vehicleFleetData = [
        { id: "keke", name: "Tricycle / Keke", defaultPetrol: 20000, swapRate: 2250, conversionCost: 3500000 },
        { id: "bike", name: "Delivery Motorcycle", defaultPetrol: 10000, swapRate: 1250, conversionCost: 1500000 }
    ];

    const calcForm = document.getElementById("savings-calculator-form");
    const resultsBox = document.getElementById("calculator-results");
    const vehicleTypeSelect = document.getElementById("vehicle-type");
    const customPetrolInput = document.getElementById("custom-petrol");

    if (!calcForm || !resultsBox) return;

    // Helper Function: Find vehicle object using Array Method .find() (Requirements 9, 12, 13)
    function getSelectedVehicle(typeId) {
        return vehicleFleetData.find(vehicle => vehicle.id === typeId);
    }

    // 15. JS localStorage: Retrieve saved vehicle type or default to keke
    const savedVehicleType = localStorage.getItem("selectedVehicleType") || "keke";
    if (vehicleTypeSelect) {
        vehicleTypeSelect.value = savedVehicleType;
    }

    const activeVehicle = getSelectedVehicle(vehicleTypeSelect.value);
    if (customPetrolInput && activeVehicle) {
        // 15. JS localStorage: Retrieve saved petrol spend or use default
        const savedPetrol = localStorage.getItem("userPetrolSpend");
        customPetrolInput.value = savedPetrol ? savedPetrol : activeVehicle.defaultPetrol;

        // 10 & 11. DOM Manipulation & Conditional Branching on change
        vehicleTypeSelect.addEventListener("change", () => {
            const chosenVehicle = getSelectedVehicle(vehicleTypeSelect.value);
            if (chosenVehicle) {
                customPetrolInput.value = chosenVehicle.defaultPetrol;
                localStorage.setItem("selectedVehicleType", chosenVehicle.id);
            }
        });
    }

    // Hide results box initially
    resultsBox.style.display = "none";

    // Handle form submit
    calcForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedType = vehicleTypeSelect.value;
        const vehicle = getSelectedVehicle(selectedType);
        const userPetrol = parseFloat(customPetrolInput.value) || vehicle.defaultPetrol;
        const swapsCount = parseInt(document.getElementById("daily-swaps").value, 10) || 2;

        // 15. JS localStorage: Save user inputs on submission
        localStorage.setItem("selectedVehicleType", selectedType);
        localStorage.setItem("userPetrolSpend", userPetrol);

        if (!vehicle) return;

        const totalDailySwapCost = vehicle.swapRate * swapsCount;
        const dailySavings = userPetrol - totalDailySwapCost;

        // Validation check
        if (dailySavings <= 0) {
            alert("Your entered daily petrol cost is lower than the solar swap cost. Please enter a realistic daily fuel budget.");
            return;
        }

        const monthlySavings = dailySavings * 26; // 26 working days per month
        const annualSavings = monthlySavings * 12;

        // Payback Period Calculations
        const paybackDays = Math.ceil(vehicle.conversionCost / dailySavings);
        const paybackMonths = (paybackDays / 26).toFixed(1);

        // 10 & 14. DOM Manipulation using Template Literals
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