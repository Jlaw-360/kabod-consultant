// Interactive Calculators
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Welcome Tax Calculator (Real Estate Page)
    const propertyPriceInput = document.getElementById('propertyPrice');
    const welcomeTaxResult = document.getElementById('welcomeTaxResult');

    if (propertyPriceInput && welcomeTaxResult) {
        const calculateWelcomeTax = (value) => {
            let tax = 0;
            // 2024 Montreal welcome tax brackets (Approximate values for demonstration)
            // 0 - $58,900: 0.5%
            // $58,900 - $294,600: 1%
            // $294,600 - $589,200: 1.5%
            // $589,200 - $1,178,500: 2%
            // > $1,178,500: 3%
            
            let remainingVal = value;
            
            if (remainingVal > 1178500) {
                tax += (remainingVal - 1178500) * 0.03;
                remainingVal = 1178500;
            }
            if (remainingVal > 589200) {
                tax += (remainingVal - 589200) * 0.02;
                remainingVal = 589200;
            }
            if (remainingVal > 294600) {
                tax += (remainingVal - 294600) * 0.015;
                remainingVal = 294600;
            }
            if (remainingVal > 58900) {
                tax += (remainingVal - 58900) * 0.01;
                remainingVal = 58900;
            }
            if (remainingVal > 0) {
                tax += remainingVal * 0.005;
            }
            
            return tax;
        };

        const updateWelcomeTax = () => {
            const val = parseFloat(propertyPriceInput.value) || 0;
            const res = calculateWelcomeTax(val);
            welcomeTaxResult.textContent = '$' + res.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        propertyPriceInput.addEventListener('input', updateWelcomeTax);
        updateWelcomeTax(); // Init
    }

    // 2. Startup Cost Estimator (Business Page)
    const bizTypeSelect = document.getElementById('bizType');
    const startupCostResult = document.getElementById('startupCostResult');

    if (bizTypeSelect && startupCostResult) {
        const costs = {
            sole: 500,     // Name registration + basic minor local fees + buffer
            inc: 2500,     // Full provincial incorporation with REQ + minute book + accountant buffer
            partner: 1200  // Partnership aggreement basic legal review + name registration + REQ
        };

        const updateStartupCost = () => {
            const c = costs[bizTypeSelect.value] || 0;
            startupCostResult.textContent = '$' + c.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        };

        bizTypeSelect.addEventListener('change', updateStartupCost);
        updateStartupCost(); // Init
    }
});
