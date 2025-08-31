const form = document.getElementById('rsvpForm');

// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby986VP6otheenpZpH9h5ZJ0os7bIFaCZlI_T9JcHXDGuh7zS_ETj1c4K6eq3tV0VwCOg/exec";

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;

  const data = { name, attendance, guests };

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("Thank you for your RSVP!");
    form.reset();
  })
  .catch(err => {
    alert("Error submitting RSVP, please try again.");
    console.error(err);
  });
});
