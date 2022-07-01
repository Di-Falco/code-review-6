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

    let conversion = await Bank.getExchangeRate(currencyFrom, currencyTo, amount);
    console.log(conversion);
    if (conversion.result) {
      $("#amountTo").text(`${symbols[currencies.indexOf(currencyTo)]} ${(conversion.conversion_result).toFixed(2)}`);
    } else {
      $("#amountTo").text(`Error: ${conversion}`);
    }
    console.log(conversion);
  });

});
