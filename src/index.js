import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Bank from './bank.js';

$(document).ready(function(){

  $("#exchange").click(function(){
    let currencyFrom = $("#currencyFrom").val();
    let currencyTo = $("#currencyTo").val();
    let amount = parseInt($("#amountFrom").val());

    console.log(Bank.getExchangeRate(currencyFrom, currencyTo, amount));
  });

});
