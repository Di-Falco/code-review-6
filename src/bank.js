export default class Bank {

  static async getExchangeRate(currFrom, currTo, amount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currFrom}/${currTo}/${amount}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }

  static async getCurrencies(base) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${base}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }

}