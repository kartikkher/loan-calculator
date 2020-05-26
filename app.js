// Listen for sumbit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

function calculateResults(e) {
  // UI Var
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calulatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calulatedInterest, calculatedPayments);
  const monthly = (principal * x * calulatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please Check Your Numbers");
  }

  e.preventDefault();
}

// Show Error
function showError(error) {
  // create div
  const errorDiv = document.createElement("div");
  // get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // add class
  errorDiv.className = "alert alert-danger";
  // create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
