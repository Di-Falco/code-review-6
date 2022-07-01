export default class Bank {

  static async getExchangeRate(currFrom, currTo, amount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currFrom}/${currTo}/${amount}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }



}