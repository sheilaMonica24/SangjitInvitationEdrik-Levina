const form = document.getElementById('rsvpForm');

// Replace with your NEW Google Apps Script Web App URL after redeployment
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCqXnPJuGthsZdvgsdGSZgrVykQbcMlGpe7Zluo8NUTB5IsH0H4HbsXrmuFicLvooGZA/exec";

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

  console.log('Submitting data:', { name, attendance, guests });

  // Try the simplest possible approach - redirect method
  const params = new URLSearchParams({
    name: name,
    attendance: attendance,
    guests: guests
  });

  // Method 1: Try with a hidden iframe (most reliable for Google Apps Script)
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.name = 'rsvp_frame';
  document.body.appendChild(iframe);

  // Create a form that submits to the iframe
  const hiddenForm = document.createElement('form');
  hiddenForm.method = 'POST';
  hiddenForm.action = SCRIPT_URL;
  hiddenForm.target = 'rsvp_frame';

  // Add form fields
  Object.keys({ name, attendance, guests }).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = eval(key); // name, attendance, guests variables
    hiddenForm.appendChild(input);
  });

  document.body.appendChild(hiddenForm);

  // Handle iframe load (success/error)
  let submitted = false;
  iframe.onload = function() {
    if (!submitted) return; // Ignore initial load
    
    console.log('Form submitted successfully');
    alert("Thank you for your RSVP!");
    form.reset();
    
    // Cleanup
    document.body.removeChild(iframe);
    document.body.removeChild(hiddenForm);
    
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  };

  // Submit the hidden form
  setTimeout(() => {
    submitted = true;
    hiddenForm.submit();
  }, 100);

  // Fallback timeout
  setTimeout(() => {
    if (submitted) {
      console.log('Fallback timeout - assuming success');
      alert("RSVP submitted! Please check if it appears in the spreadsheet.");
      form.reset();
      
      // Cleanup
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      if (document.body.contains(hiddenForm)) document.body.removeChild(hiddenForm);
      
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }, 5000);
});

// Download function for Excel export
function downloadExcel() {
  alert("Excel download feature needs additional setup. Check your Google Sheet directly for now.");
}