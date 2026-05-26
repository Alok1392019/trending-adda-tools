/**
 * CALCULATOR & FINANCE TOOLS - COMPLETE PORTFOLIO
 */
const calculatorTools = [
  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "calculator",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    shortDesc: "Calculate your exact age in years, months, weeks, days, hours, and minutes based on your birth date. Free and accurate.",
    seoTitle: "Free Age Calculator Online - Calculate Exact Age in Real-Time",
    seoDescription: "An online Age Calculator that measures your exact age down to months, weeks, days, hours, and minutes. Compare date intervals securely.",
    seoKeywords: "age calculator, calculate age, exact age checker, date of birth calculator, how old am i, birthday counter",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Enter Dates</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="birth-date">Date of Birth:</label>
            <input type="date" id="birth-date" class="tool-input" value="1995-01-01">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="target-date">Age At The Date Of:</label>
            <input type="date" id="target-date" class="tool-input">
          </div>
          <div class="tool-btn-row">
            <button id="calculate-age-btn" class="glow-btn">Calculate Age</button>
          </div>
        </div>
        
        <div id="age-results-panel" class="glass-panel" style="padding: 2rem; display: none;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Age Results</h4>
          <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;" id="primary-age-str">0 Years, 0 Months, 0 Days</div>
          
          <h5 style="margin-bottom: 0.8rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem; color: var(--text-muted);">Detailed Conversions:</h5>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem;">
            <div style="display: flex; justify-content: space-between;">
              <span>Total Months:</span>
              <strong id="total-months">0</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Weeks:</span>
              <strong id="total-weeks">0</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Days:</span>
              <strong id="total-days">0</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Hours:</span>
              <strong id="total-hours">0</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Minutes:</span>
              <strong id="total-minutes">0</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const birthDateInput = document.getElementById('birth-date');
      const targetDateInput = document.getElementById('target-date');
      const calculateAgeBtn = document.getElementById('calculate-age-btn');
      const ageResultsPanel = document.getElementById('age-results-panel');
      const primaryAgeStr = document.getElementById('primary-age-str');
      const totalMonthsText = document.getElementById('total-months');
      const totalWeeksText = document.getElementById('total-weeks');
      const totalDaysText = document.getElementById('total-days');
      const totalHoursText = document.getElementById('total-hours');
      const totalMinutesText = document.getElementById('total-minutes');
      
      targetDateInput.value = new Date().toISOString().split('T')[0];
      
      function calculateAge() {
        const birthStr = birthDateInput.value;
        const targetStr = targetDateInput.value;
        if (!birthStr || !targetStr) {
          showToast('Please fill out both dates!', 'error');
          return;
        }
        const birth = new Date(birthStr);
        const target = new Date(targetStr);
        if (target < birth) {
          showToast('Target date cannot be before your Birth Date!', 'error');
          return;
        }
        const diffMs = target - birth;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();
        
        if (days < 0) {
          months--;
          const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
          days += prevMonth.getDate();
        }
        if (months < 0) { years--; months += 12; }
        
        primaryAgeStr.innerText = years + ' Years, ' + months + ' Months, ' + days + ' Days';
        const totalMonths = (years * 12) + months;
        totalMonthsText.innerText = totalMonths.toLocaleString();
        const totalWeeks = Math.floor(diffDays / 7);
        totalWeeksText.innerText = totalWeeks.toLocaleString();
        totalDaysText.innerText = diffDays.toLocaleString();
        totalHoursText.innerText = diffHours.toLocaleString();
        totalMinutesText.innerText = diffMinutes.toLocaleString();
        
        ageResultsPanel.style.display = 'block';
        showToast('Age calculated successfully!', 'success');
      }
      calculateAgeBtn.addEventListener('click', calculateAge);
    `,
    
    features: [
      "Exact age calculations based on calendar parameters.",
      "Time conversions breaking down hours, weeks, and minutes.",
      "Accepts future/past dates for flexible interval checking."
    ],
    instructions: [
      "Select your Birth Date.",
      "Select target date to check age against.",
      "Click 'Calculate Age' and review detailed outputs."
    ],
    benefits: [
      "Highly accurate date checker.",
      "Great for job or academic form verification.",
      "Secure browser execution."
    ],
    faqs: [
      { q: "Is the logic leap-year aware?", a: "Yes, standard JS Date handles leap years natively." }
    ]
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "calculator",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    shortDesc: "Calculate your monthly Equated Monthly Installment (EMI) for Home Loans, Car Loans, or Personal Loans in seconds.",
    seoTitle: "Free Loan EMI Calculator Online - Monthly Loan Payment Checker",
    seoDescription: "An online EMI Calculator that measures your monthly payments, interest totals, and overall payout metrics. Compare loan schemes securely.",
    seoKeywords: "emi calculator, loan emi calculator, home loan emi, car loan emi, calculate monthly payments, finance calculations",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Loan Particulars</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="loan-amount">Loan Principal Amount ($/₹):</label>
            <input type="number" id="loan-amount" class="tool-input" value="1000000">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="loan-interest">Interest Rate (Annual %):</label>
            <input type="number" id="loan-interest" class="tool-input" value="8.5" step="0.01">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="loan-tenure">Tenure (Years):</label>
            <input type="number" id="loan-tenure" class="tool-input" value="20">
          </div>
          <div class="tool-btn-row">
            <button id="calculate-emi-btn" class="glow-btn">Calculate EMI</button>
          </div>
        </div>
        
        <div id="emi-results-panel" class="glass-panel" style="padding: 2rem; display: none;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">EMI Results Breakdown</h4>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">
            Monthly EMI: <span id="emi-monthly-val">0.00</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.95rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Principal Amount:</span>
              <strong id="emi-principal-val">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Total Interest Payable:</span>
              <strong id="emi-interest-val" style="color: #f59e0b;">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Total Payout (Amount + Interest):</span>
              <strong id="emi-total-val" style="color: #10b981;">0.00</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const loanAmount = document.getElementById('loan-amount');
      const loanInterest = document.getElementById('loan-interest');
      const loanTenure = document.getElementById('loan-tenure');
      const calculateEmiBtn = document.getElementById('calculate-emi-btn');
      const emiResultsPanel = document.getElementById('emi-results-panel');
      const emiMonthlyVal = document.getElementById('emi-monthly-val');
      const emiPrincipalVal = document.getElementById('emi-principal-val');
      const emiInterestVal = document.getElementById('emi-interest-val');
      const emiTotalVal = document.getElementById('emi-total-val');
      
      function calculateEMI() {
        const p = parseFloat(loanAmount.value);
        const annualRate = parseFloat(loanInterest.value);
        const y = parseFloat(loanTenure.value);
        
        if (isNaN(p) || isNaN(annualRate) || isNaN(y) || p <= 0 || annualRate <= 0 || y <= 0) {
          showToast('Please enter positive valid values!', 'error');
          return;
        }
        
        const r = annualRate / 12 / 100;
        const n = y * 12;
        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;
        
        emiMonthlyVal.innerText = emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        emiPrincipalVal.innerText = p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        emiInterestVal.innerText = totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        emiTotalVal.innerText = totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        emiResultsPanel.style.display = 'block';
        showToast('EMI calculated successfully!', 'success');
      }
      calculateEmiBtn.addEventListener('click', calculateEMI);
    `,
    
    features: [
      "Exact EMI amortization calculations.",
      "Separate principal vs interest payout charts.",
      "Applies to Home, Car, and Personal loans."
    ],
    instructions: [
      "Enter your loan principal amount.",
      "Specify interest percentage and tenure in years.",
      "Click 'Calculate EMI' and analyze the detailed results."
    ],
    benefits: [
      "Avoid bank verification delays.",
      "Clear monthly budget planning.",
      "100% secure offline calculations."
    ],
    faqs: [
      { q: "What constitutes an EMI?", a: "Equated Monthly Installment consists of both principal and interest components paid monthly." }
    ]
  },
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "calculator",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12"/><path d="M4 14h12"/><rect width="16" height="20" x="4" y="2" rx="2"/></svg>`,
    shortDesc: "Calculate Goods and Services Tax (GST) easily. Add or remove GST from a base price with custom rate percentages instantly.",
    seoTitle: "Free GST Calculator Online - Add or Remove GST Instantly",
    seoDescription: "An online GST Calculator that adds or excludes tax brackets from base product prices. Set standard rates (5%, 12%, 18%, 28%) and download values.",
    seoKeywords: "gst calculator, calculate tax, goods services tax, add gst, remove gst, cgst sgst calculator",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">GST Input Particulars</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="gst-price">Base Price ($/₹):</label>
            <input type="number" id="gst-price" class="tool-input" value="1000">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="gst-rate">GST Percentage (%):</label>
            <select id="gst-rate" class="tool-select">
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18" selected>18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div class="tool-btn-row">
            <button id="add-gst-btn" class="glow-btn">Add GST (+)</button>
            <button id="remove-gst-btn" class="btn-secondary">Remove GST (-)</button>
          </div>
        </div>
        
        <div id="gst-results" class="glass-panel" style="padding: 2rem; display: none;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">GST Breakdown Results</h4>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;" id="gst-total-title">
            Gross Price: <span id="gst-gross-val">0.00</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.95rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Net Price (Excl. Tax):</span>
              <strong id="gst-net-val">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>GST Tax Amount:</span>
              <strong id="gst-tax-val" style="color: #f59e0b;">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>CGST Share (50%):</span>
              <strong id="gst-cgst-val">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>SGST Share (50%):</span>
              <strong id="gst-sgst-val">0.00</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const gstPrice = document.getElementById('gst-price');
      const gstRate = document.getElementById('gst-rate');
      const addGstBtn = document.getElementById('add-gst-btn');
      const removeGstBtn = document.getElementById('remove-gst-btn');
      const gstResults = document.getElementById('gst-results');
      
      const gstGrossVal = document.getElementById('gst-gross-val');
      const gstNetVal = document.getElementById('gst-net-val');
      const gstTaxVal = document.getElementById('gst-tax-val');
      const gstCgstVal = document.getElementById('gst-cgst-val');
      const gstSgstVal = document.getElementById('gst-sgst-val');
      const gstTotalTitle = document.getElementById('gst-total-title');
      
      function processGST(isAdd) {
        const base = parseFloat(gstPrice.value);
        const rate = parseFloat(gstRate.value);
        
        if (isNaN(base) || base <= 0) {
          showToast('Please enter a valid Price!', 'error');
          return;
        }
        
        let net = 0, tax = 0, gross = 0;
        if (isAdd) {
          net = base;
          tax = base * (rate / 100);
          gross = base + tax;
          gstTotalTitle.innerHTML = 'Gross Price (Incl. Tax): <span>' + gross.toFixed(2) + '</span>';
        } else {
          net = base / (1 + (rate / 100));
          tax = base - net;
          gross = base;
          gstTotalTitle.innerHTML = 'Net Price (Excl. Tax): <span>' + net.toFixed(2) + '</span>';
        }
        
        gstGrossVal.innerText = gross.toLocaleString(undefined, { minimumFractionDigits: 2 });
        gstNetVal.innerText = net.toLocaleString(undefined, { minimumFractionDigits: 2 });
        gstTaxVal.innerText = tax.toLocaleString(undefined, { minimumFractionDigits: 2 });
        gstCgstVal.innerText = (tax / 2).toLocaleString(undefined, { minimumFractionDigits: 2 });
        gstSgstVal.innerText = (tax / 2).toLocaleString(undefined, { minimumFractionDigits: 2 });
        
        gstResults.style.display = 'block';
        showToast('GST processed successfully!', 'success');
      }
      addGstBtn.addEventListener('click', () => processGST(true));
      removeGstBtn.addEventListener('click', () => processGST(false));
    `,
    
    features: [
      "Add tax markup or exclude tax values easily.",
      "Calculates CGST/SGST splits automatically.",
      "Applies standard business tax rate structures."
    ],
    instructions: [
      "Enter base pricing.",
      "Select tax rate, then click 'Add GST' or 'Remove GST' as required."
    ],
    benefits: [
      "Simplifies corporate invoicing tasks.",
      "Highly accurate accounting results."
    ],
    faqs: [
      { q: "What is dual GST?", a: "Dual GST splits tax evenly between national (CGST) and regional state (SGST) authorities." }
    ]
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "calculator",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    shortDesc: "Estimate future returns of your Systematic Investment Plan (SIP). Find maturity wealth, invested amount, and compounding gains.",
    seoTitle: "Free SIP Calculator Online - Systematic Investment Return Checker",
    seoDescription: "An online SIP Calculator that projects future investment yields. Set monthly contribution, expected return %, and years.",
    seoKeywords: "sip calculator, systematic investment plan, estimate mutual funds yield, compound interest investment growth, calculate sip returns online",
    
    htmlContent: `
      <div class="grid grid-2">
        <div class="glass-panel" style="padding: 2rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">SIP Variables</h4>
          <div class="tool-input-group">
            <label class="tool-input-label" for="sip-monthly">Monthly Investment Amount ($/₹):</label>
            <input type="number" id="sip-monthly" class="tool-input" value="5000">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="sip-return">Expected Annual Return Rate (%):</label>
            <input type="number" id="sip-return" class="tool-input" value="12" step="0.1">
          </div>
          <div class="tool-input-group">
            <label class="tool-input-label" for="sip-years">Tenure (Years):</label>
            <input type="number" id="sip-years" class="tool-input" value="10">
          </div>
          <div class="tool-btn-row">
            <button id="calculate-sip-btn" class="glow-btn">Calculate Yield</button>
          </div>
        </div>
        
        <div id="sip-results-panel" class="glass-panel" style="padding: 2rem; display: none;">
          <h4 style="margin-bottom: 1.5rem; color: var(--primary);">Investment Breakdown</h4>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">
            Estimated Maturity: <span id="sip-maturity-val">0.00</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.95rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Invested Amount:</span>
              <strong id="sip-invested-val">0.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Wealth Gained (Interest Earned):</span>
              <strong id="sip-wealth-val" style="color: #10b981;">0.00</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    
    jsContent: `
      const monthly = document.getElementById('sip-monthly');
      const rate = document.getElementById('sip-return');
      const years = document.getElementById('sip-years');
      const calculateSipBtn = document.getElementById('calculate-sip-btn');
      const resultsPanel = document.getElementById('sip-results-panel');
      
      const maturityVal = document.getElementById('sip-maturity-val');
      const investedVal = document.getElementById('sip-invested-val');
      const wealthVal = document.getElementById('sip-wealth-val');
      
      calculateSipBtn.addEventListener('click', () => {
        const p = parseFloat(monthly.value);
        const annualRate = parseFloat(rate.value);
        const y = parseFloat(years.value);
        
        if (isNaN(p) || isNaN(annualRate) || isNaN(y) || p <= 0 || annualRate <= 0 || y <= 0) {
          showToast('Please enter positive valid values!', 'error');
          return;
        }
        
        const i = (annualRate / 100) / 12; // Monthly rate
        const n = y * 12; // Total months
        
        // SIP compound interest formula: M = P x [ ( (1 + i)^n - 1 ) / i ] x (1 + i)
        const maturity = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const totalInvested = p * n;
        const wealthGained = maturity - totalInvested;
        
        maturityVal.innerText = maturity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        investedVal.innerText = totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        wealthVal.innerText = wealthGained.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        resultsPanel.style.display = 'block';
        showToast('SIP yield calculated successfully!', 'success');
      });
    `,
    
    features: [
      "Calculates compound interest Systematic maturities recursively.",
      "Clear visual outputs showing invested vs interest returns.",
      "In-browser security: no database logging."
    ],
    instructions: [
      "Enter your planned monthly SIP investment.",
      "Provide expected interest rate percentage and tenure in years.",
      "Click 'Calculate Yield' to run compound equations."
    ],
    benefits: [
      "Enables long-term mutual funds or stock portfolio projections.",
      "Allows testing multiple savings scenarios easily.",
      "Free financial utility."
    ],
    faqs: [
      { q: "What is an SIP?", a: "A Systematic Investment Plan lets you contribute a fixed sum regularly into equity schemes or mutual funds." }
    ]
  }
];

module.exports = calculatorTools;
