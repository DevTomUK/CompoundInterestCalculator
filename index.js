// Input Fields

var initial = document.getElementById('initial');
var interest = document.getElementById('interest');
var time = document.getElementById('time');
var compFreq = document.getElementById('compFreq');
var addAmt = document.getElementById('addAmt');
var addFreq = document.getElementById('addFreq');

// Display Boxes

const resultsBox = document.getElementById('resultsBox');
const helpBox = document.getElementById('helpBox')

// Submit Button

const submitButton = document.getElementById('submitButton');

// ToolTip - help on hover, appears in box to top right

function hover(input) {
    
    // When the mouse goes over these, do the following:

    input.addEventListener('mouseover', function() {
      if (window.innerWidth > 767) {
        if (input.id === 'initial') {
            helpBox.innerHTML = '<p class="display-6">Initial Amount</p>This is the starting principal or the initial sum of money you are investing or depositing. It represents the initial balance or investment amount.';
        }   else if (input.id === 'interest') {
            helpBox.innerHTML = '<p class="display-6">Interest Rate</p>The interest rate is the percentage at which your investment grows over time. It determines the rate of return on your investment. It is usually expressed as an annual percentage.';
        }   else if (input.id === 'time') {
            helpBox.innerHTML = '<p class="display-6">Time Period</p>The time period refers to the duration for which you are calculating the compound interest. It represents the length of time during which your investment will grow.';
        }   else if (input.id === 'compFreq') {
            helpBox.innerHTML = '<p class="display-6">Compounding Frequency</p>The compounding frequency specifies how often the interest is added to the initial amount. It determines the frequency at which the interest is reinvested or compounded. Common compounding frequencies include annually, semi-annually, quarterly, monthly, or daily.';
        }   else if (input.id === 'addAmt') {
            helpBox.innerHTML = '<p class="display-6">Additional Contribution Amount</p>This refers to any extra amount that you contribute or invest at regular intervals, on top of the initial amount. It represents additional deposits or investments made during the time period.';
        }   else if (input.id === 'addFreq') {
            helpBox.innerHTML = '<p class="display-6">Additional Contribution Frequency</p>The additional contribution frequency indicates how often you make the extra contributions. It specifies the frequency at which you add the additional contribution amount to your investment.';
        }}
      else if (window.innerWidth < 768) {
        if (input.id === 'initial') {
          helpBox.innerHTML = 'This is the starting principal or the initial sum of money you are investing or depositing. It represents the initial balance or investment amount.';
      }   else if (input.id === 'interest') {
          helpBox.innerHTML = 'The interest rate is the percentage at which your investment grows over time. It determines the rate of return on your investment. It is usually expressed as an annual percentage.';
      }   else if (input.id === 'time') {
          helpBox.innerHTML = 'The time period refers to the duration for which you are calculating the compound interest. It represents the length of time during which your investment will grow.';
      }   else if (input.id === 'compFreq') {
          helpBox.innerHTML = 'The compounding frequency specifies how often the interest is added to the initial amount. It determines the frequency at which the interest is reinvested or compounded.';
      }   else if (input.id === 'addAmt') {
          helpBox.innerHTML = 'This refers to any extra amount that you contribute or invest at regular intervals, on top of the initial amount. It represents additional deposits or investments made during the time period.';
      }   else if (input.id === 'addFreq') {
          helpBox.innerHTML = 'The additional contribution frequency indicates how often you make the extra contributions. It specifies the frequency at which you add the additional contribution amount to your investment.';
      }
      }

    });

    // When the mouse is moved from these areas, change the innerHTML of helpBox to:

    input.addEventListener('mouseout', function() {
        helpBox.innerHTML = '<br><br>Hover over the input boxes for some help';
    });
}

// Hover Function is run when following inputs are hovered over:

hover(initial);
hover(interest);
hover(time);
hover(compFreq);
hover(addAmt);
hover(addFreq);


// Function to display the results in the bottom right when the submit button is clicked

// Event listener waiting for submitButton to be clicked
submitButton.addEventListener('click', calculateCompoundInterestHandler);

// Function to handle the calculation and display the results
function calculateCompoundInterestHandler() {
  // Get the input values
  var initial = parseFloat(document.getElementById('initial').value);
  var interest = parseFloat(document.getElementById('interest').value);
  var time = parseFloat(document.getElementById('time').value);
  var compFreq = parseFloat(document.getElementById('compFreq').value);
  var addAmt = parseFloat(document.getElementById('addAmt').value) || 0; // Set default value to 0 if empty
  var addFreq = parseFloat(document.getElementById('addFreq').value) || 0; // Set default value to 0 if empty

  // Check if the initial field is empty
  if (!initial) {
    alert("Please fill in the Initial Amount");
    return false; // Prevent form submission
  }

  // Check if the interest field is empty
  if (!interest) {
    alert("Please fill in the Interest Rate");
    return false; // Prevent form submission
  }

  // Check if the time field is empty
  if (!time) {
    alert("Please fill in the Time Period");
    return false; // Prevent form submission
  }

  // Check if the compounding frequency field is empty
  if (!compFreq) {
    alert("Please select a Compounding Frequency");
    return false; // Prevent form submission
  }

  // Calculate the compound interest
  var result = calculateCompoundInterest(initial, interest, time, compFreq, addAmt, addFreq);

  // Display the results in the bottom right (resultsBox)
  var resultsBox = document.getElementById('resultsBox');
  resultsBox.innerHTML = "Final Amount: " + result.amount + "<br><br>" +
                         "Interest Earned: " + result.interestEarned;

  return false; // Prevent form submission
}

// Function to calculate compound interest
function calculateCompoundInterest(initial, interest, time, compFreq, addAmt, addFreq) {
  // Convert interest rate to decimal
  const rate = interest / 100;

  // Calculate the total number of compounding periods
  const periods = compFreq * time;

  // Calculate the compound interest
  let amount = initial;
  let totalContributions = 0;

  for (let i = 0; i < periods; i++) {
    amount += amount * rate / compFreq;

    if ((i + 1) % addFreq === 0) {
      amount += addAmt;
      totalContributions += addAmt * addFreq;
    }
  }

  // Calculate the interest earned
  const interestEarned = amount - initial - totalContributions;

  return {
    amount: "£" + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), // Final amount (including principal, interest, and contributions)
    interestEarned: "£" + interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) // Interest earned
  };
  
}