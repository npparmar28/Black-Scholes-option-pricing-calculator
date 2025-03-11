function normalCDF(x) {
    return (1.0 + Math.erf(x / Math.sqrt(2.0))) / 2.0;
}

function calculateOptions() {
    let S = parseFloat(document.getElementById("spot").value);
    let K = parseFloat(document.getElementById("strike").value);
    let expiry = new Date(document.getElementById("expiry").value);
    let T = (expiry - new Date()) / (365 * 24 * 60 * 60 * 1000);
    let sigma = parseFloat(document.getElementById("volatility").value) / 100;
    let r = parseFloat(document.getElementById("interest").value) / 100;
    let q = parseFloat(document.getElementById("dividend").value) / 100;

    if (isNaN(S) || isNaN(K) || isNaN(T) || isNaN(sigma) || isNaN(r) || isNaN(q)) {
        document.getElementById("result").innerText = "Please enter valid inputs";
        return;
    }

    let d1 = (Math.log(S / K) + (r - q + 0.5 * (sigma ** 2)) * T) / (sigma * Math.sqrt(T));
    let d2 = d1 - sigma * Math.sqrt(T);
    let Nd1 = normalCDF(d1);
    let Nd2 = normalCDF(d2);
    let Nnegd1 = normalCDF(-d1);
    let Nnegd2 = normalCDF(-d2);

    let callPrice = S * Math.exp(-q * T) * Nd1 - K * Math.exp(-r * T) * Nd2;
    let putPrice = K * Math.exp(-r * T) * Nnegd2 - S * Math.exp(-q * T) * Nnegd1;

    document.getElementById("result").innerHTML = `
        <p><b>Call Option:</b> ${callPrice.toFixed(4)}</p>
        <p><b>Put Option:</b> ${putPrice.toFixed(4)}</p>
    `;
}
