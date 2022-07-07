# Code Review 6

#### calculate currency exchange using an API

#### By Anthony DiFalco

## Technologies Used

* Javascript/JQuery
* Webpack
* HTML/CSS

## Description

Webpage that asks the user to select a currency and provide a quantity. user then selects an exchange currency and the API provides the converted amount. at the end of the page is an area where each of the allowed currencies is compared to a single unit of the user's input quantity.

There are only a few allowed currencies to keep the program simple. additionally there is a currency option for converting to/from the Legend of Zelda's rupees. but since I couldn't find a good estimate of USD to Hyrule Rupee exchange rates, it's just there to test the error message.

## Setup/Installation Requirements

* clone this repository using<br>
```git clone https://github.com/Di-Falco/code-review-6```
* Visit https://www.exchangerate-api.com/. You will be promted to enter your email to recieve an API key.
* Create a .env in your root directory. The .env file should contain only your API key, formatted like so:<br>
```API_KEY=[your api key here]```
* run<br> 
```npm install```
* run<br>
```npm run start```

Included scripts:
 * ```npm run build```<br>
builds the webpage using webpack
 * ```npm run start```<br>
runs npm build and opens a dev server
 * ```npm run lint```<br>
runs eslint

## Known Bugs

* No known bugs

## License

## Contact Information

Anthony DiFalco
aodifalco@gmail.com