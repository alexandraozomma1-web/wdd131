document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // 2. Featured Charging Hubs Data & Filter Logic
    const hubsData = [
        { name: "Enugu Central Swap Hub", region: "Enugu", status: "Operational", capacity: "45 Batteries Available", swaps: 120 },
        { name: "Lagos Ikeja Solar Terminal", region: "Lagos", status: "Operational", capacity: "80 Batteries Available", swaps: 310 },
        { name: "Nsukka Commercial Exchange", region: "Enugu", status: "Operational", capacity: "18 Batteries Available", swaps: 85 },
        { name: "Abuja City Depot", region: "Abuja", status: "Operational", capacity: "62 Batteries Available", swaps: 200 }
    ];

    const regionFilter = document.getElementById("regionFilter");
    const hubListContainer = document.getElementById("hubListContainer");

    // Populate region dropdown options dynamically
    if (regionFilter) {
        const regions = [...new Set(hubsData.map(hub => hub.region))];
        regions.forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionFilter.appendChild(option);
        });

        regionFilter.addEventListener("change", (e) => {
            renderHubs(e.target.value);
        });
    }

    function renderHubs(selectedRegion) {
        if (!hubListContainer) return;
        hubListContainer.innerHTML = "";

        const filteredHubs = selectedRegion === "all"
            ? hubsData
            : hubsData.filter(hub => hub.region === selectedRegion);

        filteredHubs.forEach(hub => {
            const hubItem = document.createElement("div");
            hubItem.className = "hub-item";
            hubItem.innerHTML = `
                <h3>${hub.name}</h3>
                <p><strong>Region:</strong> ${hub.region}</p>
                <p><strong>Status:</strong> ${hub.status}</p>
                <p><strong>Capacity:</strong> ${hub.capacity}</p>
                <p><strong>Avg. Daily Swaps:</strong> ${hub.swaps}</p>
            `;
            hubListContainer.appendChild(hubItem);
        });
    }

    // Initial render if container exists
    if (hubListContainer) {
        renderHubs("all");
    }

    // 3. Dynamic Last Modified Footer Date
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }

    // 4. Check and load fleet inquiry summary on confirmation.html
    const summaryContainer = document.getElementById("inquirySummaryContainer");
    if (summaryContainer) {
        const rawData = localStorage.getItem("latestFleetInsight") || localStorage.getItem("latestFleetInquiry");

        if (rawData) {
            const data = JSON.parse(rawData);
            summaryContainer.innerHTML = `
                <p><strong>Full Name:</strong> ${data.fullName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Region:</strong> ${data.region || data.hubLocation || "N/A"}</p>
                <p><strong>Vehicle Type:</strong> ${data.vehicleType}</p>
                <p><strong>Fleet Size:</strong> ${data.fleetSize || data.fleetCount}</p>
                <p><strong>Additional Notes:</strong> ${data.notes || "None provided"}</p>
                <p><strong>Submitted At:</strong> ${data.submittedAt || "Recent"}</p>
            `;
        } else {
            summaryContainer.innerHTML = `<p>No recent inquiry data found.</p>`;
        }
    }
});