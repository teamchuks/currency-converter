// generated api key--
const apiKey = "fcc9a713e3640c88c21d5fe6";
const apiURL = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD `;

// variable selection
const fromDropDown = document.querySelector("#from-currency-select");
const toDropDown = document.querySelector("#to-currency-select");

// fetch API
fetch(apiURL).then((res) => res.json())
.then((data) => {
    // console.log(data);
    const currencyCodes = Object.keys(data.conversion_rates);

    // Output the list of currency codes
    // console.log(currencyCodes);
})
.catch((error) => {
    console.log('there is an error here:', error);
})

// creating dropdown from the array of currencies
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
})
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
})

// setting default values 
fromDropDown.value = "USD"; 
toDropDown.value = "EUR";

const result = document.querySelector('#result')
// function to convert currency 
const convertCurrency = () => {
    // get hold of the input value
    const amountValue = document.querySelector('#amount').value; 
    const fromCurrency = fromDropDown.value; 
    const toCurrency = toDropDown.value;

    // if amount in input field is not empty
    if (amountValue.length != 0) {
        // alert('you can convert currency');
        fetch(apiURL).then((res) => res.json())
        .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            // console.log('rate is', fromExchangeRate)
            let toExchangeRate = data.conversion_rates[toCurrency];
            // console.log('the converted rate is', toExchangeRate);

            // converted amount
            const convertedAmount = (amountValue / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amountValue} ${fromCurrency} = ${convertedAmount.toFixed(
              2
            )} ${toCurrency}`;

        });

    } else { 
        alert ('fill the amount value')
    }
}

// adding event listener for the convert button
const convertButton = document.querySelector("#convert-button");
convertButton.addEventListener('click', convertCurrency);