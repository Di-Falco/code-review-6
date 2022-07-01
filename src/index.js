import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Bank from './bank.js';

$(document).ready(function(){

  $("#exchange").click(async function(){
    const currencies = ["USD", "GBP", "EUR", "JPY", "KRW", "NPR", "ZWD"];
    const symbols = ["$", "£", "€", "￥", "₩", "₨", "Z$"];

    let currencyFrom = $("#currencyFrom").val();
    let currencyTo = $("#currencyTo").val();
    let amount = parseInt($("#amountFrom").val());

    let validCurrenciesFrom = await Bank.getCurrencies(`${currencyFrom}`);
    let validCurrenciesTo = await Bank.getCurrencies(`${currencyTo}`);
    console.log("VALID FROM : ",validCurrenciesFrom);
    console.log("VALID TO : ",validCurrenciesTo);

    if (!validCurrenciesFrom.result) {
      $("#error").text(`Error: ${currencyFrom} is not a supported currency`);
      return 0;
    }
    if (!validCurrenciesTo.result) {
      $("#error").text(`Error: ${currencyTo} is not a supported currency`);
      return 0;
    } else {

      let conversion = await Bank.getExchangeRate(currencyFrom, currencyTo, amount);
      console.log("CONVERSION : ",conversion);
      if (conversion.result) {
        $("#amountTo").text(`${symbols[currencies.indexOf(currencyTo)]} ${(conversion.conversion_result).toFixed(2)}`);
      } else {
        $("#error").text(`Error: ${conversion}`);
      }

    }
  });

});
