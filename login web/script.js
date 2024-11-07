
const USERNAME = "admin";
const PASSWORD = "admin";


function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("login-error");

    if (username === USERNAME && password === PASSWORD) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("converter-page").style.display = "block";
        loginError.textContent = "";
    } else {
        loginError.textContent = "Invalid username";
    }
}


async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency];
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}


async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const result = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter amount";
        return;
    }


    const rate = await getExchangeRate(fromCurrency, toCurrency);

    if (rate) {
        const convertedAmount = amount * rate;
        result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        result.textContent = "Unable to fetch conversion rate.";
    }
}
