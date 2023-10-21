This task is to Automate the UI of a weather application hosted on :http://localhost:3000/weather and OpenWeather API using Cypress . 

# Approach
cloned the code base to IDE and Integrated the cypress framework .
Have started the development server using npm start command

# Required Installations
npm install cypress --save-dev
install cypress-mochawesome-reporter npm i --save 

# Approach to UI:
UI has 3 different pages ,Captured the page objects of these three different pages and automated the below test scenarios for UI:
UI tests for Weather application 
    √ verify the title of main page
    √ verify the current and Default locations when page is loaded 
    √ verify Navigation from Dashboard to settings page
    √ verify navigation to Weather display page
    √ verify Add and Remove new Geographical locations
    √ verify if the Error message displayed when wrong location is chosen
    √ verify cancel in location prompt box
    √ verify that user can switch preferred units
Mock a location and validate the results in UI
    √ Mock a location and validate the current weather, temperature, sunrise, and sunset
verify denying current location access(**set Geolocation access to block in cypress.config files)
     Deny current location access
# Approach to UI and API integration Test.
 This test suite is created for validating the dynamic elements like temperature ,humidity are fetched properly through API and displayed properly in UI.
 In simple, comparing the UI values with the api response .
 Test Scenarios: 
 
  Weather App Integration Validation
    √ should display the correct city name (5428ms)
    1) should display the correct temperature
    √ should display the correct humidity

Issue Observed : The temperature from API doesn't match perfectly with UI data .


# API tests:
API test uses the openweatherMapAPI, GET current Weather .Please find below the tests Automated.
 Integration tests for Weather application
    √ Get weather data for location-success-200
    √ Get weather data for location by lat and long-success-200
    √ Get weather data for Invalid location -404
    √ Get weather data -use InvalidAPi call -400
    √ Get weather data -use InvalidAuthentication--401
    √ Get weather data for location by lat and long-success--200
 validate api for different locations by parametrising multiple locations.
      
