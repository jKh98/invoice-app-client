# invoice-app-client
This is a React-Native front-end app for issuing invoices by merchants of small businesses.The app handles registration for merchants and supports adding items and customers.
Once there are items and customers, merchants can choose to generate invoices to save or send as email.
Emails include a pdf of the invoice with a payment url which opens a payment portal.
You can find back-end code for this app on [invoice-app-backend](https://github.com/jKh98/invoice-app-backend).

## Usage
* Setup your environment if you never used react-native, checkout the [doc](https://reactnative.dev/docs/environment-setup)
* Install react-native cli using `npm install -g react-native-cli`
* Clone or download repository
* Go into the main app directory
* Install dependencies by running `npm install`
* Run the application using `react-native run-android` for android or `react-native run-ios`for ios

## Dependencies

* [NativeBase](https://github.com/GeekyAnts/NativeBase) for cross-platform UI elements.
* [Redux](https://github.com/reduxjs/redux) as a state container.
* [Redux-thunk](https://github.com/reduxjs/redux-thunk) as middleware for Redux.
* [Redux-Form](https://github.com/redux-form/redux-form) to keep form state in store.
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) for routing between screens.


## Structure

  Inside the src folder:
* `actions/` contains different functions that are dispatched to send payload from application to store.
* `components/` contains different presentation and functional components.
* `config/` contains Redux store configuration.
* `pages/`contains pages or screens used in the application.
* `reducers/` contains reducers that specify how application state changes in response to dispatched actions
* `service/` contains api functions used to connect with back-end (Here you should modify the server url)
* `utils/` contains general util functions for error handling and form validation
* `Main.js` contains the root component that is called by App.js





