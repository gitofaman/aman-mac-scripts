function calculateAffordability() {
    var annualIncome = document.getElementById('annualIncome').value;
    var monthlyDebts = document.getElementById('monthlyDebts').value;
    var downPayment = document.getElementById('downPayment').value;
    var interestRate = document.getElementById('interestRate').value / 100 / 12;
    var loanTerm = document.getElementById('loanTerm').value * 12;
  
    var maxLoan = (annualIncome / 12 * 0.28) - monthlyDebts;
    var principal = maxLoan / (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
  
    document.getElementById('result').innerHTML = 'Estimated Mortgage: $' + principal.toFixed(2);
  }