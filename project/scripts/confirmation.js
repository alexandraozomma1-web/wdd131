document.addEventListener("DOMContentLoaded", () => {
    const detailsContainer = document.getElementById("confirmationDetails");
    const savedData = localStorage.getItem("fleetInquiryData");

    // Mapping helper for readable hub names
    const hubNames = {
        "enugu": "Enugu Central Solar Station",
        "portharcourt": "Port Harcourt Port Hub",
        "lagos": "Lagos Island Express Hub"
    };

    if (savedData && detailsContainer) {
        try {
            const data = JSON.parse(savedData);
            const readableHub = hubNames[data.hubLocation] || data.hubLocation || "Not specified";

            detailsContainer.innerHTML = `
                <div class="detail-row"><span>Full Name:</span> <strong>${data.fullName}</strong></div>
                <div class="detail-row"><span>Email Address:</span> <strong>${data.email}</strong></div>
                <div class="detail-row"><span>Phone / WhatsApp:</span> <strong>${data.phone}</strong></div>
                <div class="detail-row"><span>Fleet Size:</span> <strong>${data.fleetSize} tricycles</strong></div>
                <div class="detail-row"><span>Preferred Hub:</span> <strong>${readableHub}</strong></div>
                <div class="detail-row"><span>Additional Notes:</span> <strong>${data.notes || "None provided"}</strong></div>
                <div class="detail-row timestamp"><span>Submitted on:</span> <em>${data.submissionDate}</em></div>
            `;
        } catch (e) {
            detailsContainer.innerHTML = `<p class="no-data">Error loading inquiry summary. Please try submitting the form again.</p>`;
        }
    } else if (detailsContainer) {
        detailsContainer.innerHTML = `<p class="no-data">No recent inquiry details found. Please fill out the <a href="order.html">Fleet Inquiry form</a> first.</p>`;
    }
});