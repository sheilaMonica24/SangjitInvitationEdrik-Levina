const form = document.getElementById('rsvpForm');

// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby986VP6otheenpZpH9h5ZJ0os7bIFaCZlI_T9JcHXDGuh7zS_ETj1c4K6eq3tV0VwCOg/exec";

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;

  const data = { name, attendance, guests };

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Success - don't try to parse response due to CORS
    console.log("RSVP submitted successfully");
    alert("Thank you for your RSVP!");
    form.reset();
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Error submitting RSVP, please try again.");
  })
  .finally(() => {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

// Download function for Excel export
function downloadExcel() {
  // This would require additional setup to read from Google Sheets
  // For now, just show a message
  alert("Excel download feature needs additional setup. Check your Google Sheet directly for now.");
}