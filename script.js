const form = document.getElementById('rsvpForm');

// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby986VP6otheenpZpH9h5ZJ0os7bIFaCZlI_T9JcHXDGuh7zS_ETj1c4K6eq3tV0VwCOg/exec";

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  // Try JSONP approach for better compatibility
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  
  // Create callback function
  window[callbackName] = function(response) {
    console.log("Success:", response);
    alert("Thank you for your RSVP!");
    form.reset();
    
    // Cleanup
    document.head.removeChild(script);
    delete window[callbackName];
    
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  };

  // Create script element for JSONP
  const script = document.createElement('script');
  script.src = `${SCRIPT_URL}?callback=${callbackName}&name=${encodeURIComponent(name)}&attendance=${encodeURIComponent(attendance)}&guests=${encodeURIComponent(guests)}`;
  
  // Handle errors
  script.onerror = function() {
    alert("Error submitting RSVP, please try again.");
    document.head.removeChild(script);
    delete window[callbackName];
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  };

  document.head.appendChild(script);
});

// Download function for Excel export
function downloadExcel() {
  // This would require additional setup to read from Google Sheets
  // For now, just show a message
  alert("Excel download feature needs additional setup. Check your Google Sheet directly for now.");
}