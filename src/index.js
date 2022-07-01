import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Bank from './bank.js';

$(document).ready(function(){

  $("#exchange").onclick(async function(){
    $("#error").text("");
    const currencies = ["USD", "GBP", "EUR", "JPY", "KRW", "NPR"];
    const symbols = ["$", "£", "€", "￥", "₩", "₨"];

    let currencyFrom = $("#currencyFrom").val();
    let currencyTo = $("#currencyTo").val();
    let amount = parseInt($("#amountFrom").val());

    let validCurrenciesFrom = await Bank.getCurrencies(`${currencyFrom}`);
    let validCurrenciesTo = await Bank.getCurrencies(`${currencyTo}`);

    if (!Number(amount)) {
      $("#error").text(`Error: Please input a number value to exchange`);
    } else if (!validCurrenciesFrom.result) {
      $("#error").text(`Error: ${currencyFrom} is not a supported currency`);
      return 0;
    } else if (!validCurrenciesTo.result) {
      $("#error").text(`Error: ${currencyTo} is not a supported currency`);
      return 0;
    } else {

      let conversion = await Bank.getExchangeRate(currencyFrom, currencyTo, amount);
      if (conversion.result) {
        $("#amountTo").text(`${symbols[currencies.indexOf(currencyTo)]} ${(conversion.conversion_result).toFixed(2)}`);
      } else {
        $("#error").text(`Error: ${conversion}`);
      }

      // print conversion from the input amount for each currency
      $("#mainCurrencyFrom").text(`Value of 1 ${currencyFrom} in:`);
      $("#mainCurrencyFrom").append(`<br><br>`);
      for (let i=0; i<currencies.length; i++) {
        let oneConversion = await Bank.getExchangeRate(currencyFrom, currencies[i], 1);
        $("#mainCurrencyFrom").append(`${currencies[i]}: ${symbols[i]}${(oneConversion.conversion_result).toFixed(2)}<br>`);
      }

    }
  });

});
