import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Bank from './bank.js';

// empty all necessary fields
function clearFields() {
  $("#error").text("");
  $("#amountTo").text("");
}

// check to see if a valid currency has been selected
async function checkResponse(validCurrency, currency) {
  if (!validCurrency.result) {
    $("#error").text(`Error: ${currency} is not a supported currency`);
    return false;
  }
  return true;
}

// display the results of converting between selected currencies
function displayConversion(conversion, currencies, symbols) {
  console.log(conversion);
  if (conversion.result) {
    $("#amountTo").text(`${symbols[currencies.indexOf(conversion.target_code)]} ${(conversion.conversion_result).toFixed(2)}`);
  } else {
    $("#error").text(`Error: ${conversion}`);
  }
}

// display exchange rate for 1 unit of input currency in each currency
async function displayRates(currencyFrom, currencies, symbols) {
  $("#mainCurrencyFrom").text(`Value of 1 ${currencyFrom} in:`);
  $("#mainCurrencyFrom").append(`<br><br>`);
  for (let i=0; i<currencies.length; i++) {
    let oneConversion = await Bank.getExchangeRate(currencyFrom, currencies[i], 1);
    $("#mainCurrencyFrom").append(`${currencies[i]}: ${symbols[i]}${(oneConversion.conversion_result).toFixed(2)}<br>`);
  }
}

// make api call for 1:1 exchange
async function getCurrencyApiCall(currency) {
  const response = await Bank.getCurrencies(currency);
  return response;
}

// make api call for each exchange rate
async function getExchangeApiCall(currencyFrom, currencyTo, amount) {
  const response = await Bank.getExchangeRate(currencyFrom, currencyTo, amount);
  return response;
}

// UI
$(document).ready(function(){

  $("#exchange").click(async function(){
    clearFields();
    const currencies = ["USD", "GBP", "EUR", "JPY", "KRW", "NPR"];
    const symbols = ["$", "£", "€", "￥", "₩", "₨"];

    let currencyFrom = $("#currencyFrom").val();
    let currencyTo = $("#currencyTo").val();
    let amount = parseInt($("#amountFrom").val());

    let validCurrenciesFrom = await getCurrencyApiCall(currencyFrom);
    let validCurrenciesTo = await getCurrencyApiCall(currencyTo);

    if (!Number(amount)) {
      $("#error").text(`Error: Please input a number value to exchange`);
    } else if (!checkResponse(validCurrenciesFrom, currencyFrom)) {
      return 0;
    } else if (!checkResponse(validCurrenciesTo, currencyTo)) {
      return 0;
    } else {
      let conversion = await getExchangeApiCall(currencyFrom, currencyTo, amount);
      
      displayConversion(conversion, currencies, symbols);
      displayRates(currencyFrom, currencies, symbols);
    }
  });
});
