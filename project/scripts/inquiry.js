

document.addEventListener("DOMContentLoaded", () => {
    const inquiryForm = document.getElementById("fleetInquiryForm");
    if (!inquiryForm) return;

    inquiryForm.addEventListener("submit", (e) => {
        // Prevent default browser form submission (stops the 405 error)
        e.preventDefault();

        // Form Validation Check
        if (!inquiryForm.checkValidity()) {
            inquiryForm.reportValidity();
            return;
        }

        // Collect form data using the exact IDs from order.htm
        const inquiryData = {
            fullName: document.getElementById("full-name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            vehicleType: document.getElementById("vehicleType").value, // <-- ADD THIS LINE
            region: document.getElementById("hub-location").value,
            fleetCount: document.getElementById("fleet-size").value,
            notes: document.getElementById("notes").value.trim(),
            submittedAt: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
    })
};
        // Save Object to localStorage
        localStorage.setItem("latestFleetInquiry", JSON.stringify(inquiryData));

        // Manually redirect to confirmation page
        window.location.href = "confirmation.html";
    });
});