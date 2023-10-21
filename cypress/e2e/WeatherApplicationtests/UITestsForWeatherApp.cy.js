import { isVisible } from "@testing-library/user-event/dist/utils";
import Dashboard from "../../PageObjects/DashboardPage";
import Settings from "../../PageObjects/Settings";
import Weather from "../../PageObjects/Weather";
const Location = new Dashboard();
const GetLocation = new Settings();
const GetWeatherAtt = new Weather();

describe('UI tests for Weather application', function() {
  beforeEach(() => {
    cy.visit("http://localhost:3000/weather");
    cy.wait(3000)
  })
  it('verify the title of main page', function() {
  //Visit the weatherApp and check the Title
    cy.contains("Dashboard")
})

  it('verify the current and Default locations when page is loaded ', function() {
  //Visit the weatherApp and check application can use current location by allowing Geolocation access. 
    Location.AddCurentLocation();
    Location.verifyDefaultLocation();

})

  it('verify Navigation from Dashboard to settings page', function() {
  //Visit the weatherApp and check the Anchor element
    cy.contains("Settings").should('be.visible');
    Location.GoToSettings();
    GetLocation.ValidateLabel();
    //verify Location and units exists
    GetLocation.ValidateStaticElements()
  //verify if back link works
    GetLocation.GoBack();
    cy.get('.title.has-text-centered').should('contain','Dashboard');
  

})
  it('verify navigation to Weather display page', function() {
 
  //Test weather display for Current locations 
    cy.get('[data-testid="weather-card-location"]').eq(0).contains('Oslo').click();
    cy.get('.title.mb-0').should('contain','Oslo');
    cy.get('.is-size-1').should('exist');
  //Validate sunrise and sunset times for current location
    cy.get('.is-size-6').eq(0).should('exist').contains('Sunrise');
    cy.get('.is-size-5').eq(0).should('exist');
    cy.get('.is-size-6').eq(1).should('exist').contains('Sunset');
    cy.get('.is-size-5').eq(1).should('exist');
  //validate bac button and verify weather display for default locations
    cy.get('a[href="/weather"]').click();
    cy.get('[data-testid="weather-card-location"]').eq(1).contains('Berlin').click();
    cy.get('.title.mb-0').should('contain','Berlin');
    cy.get('.is-size-1').should('exist');
  //Validate sunrise and sunset times for default location-Berlin
    cy.get('.is-size-6').eq(0).should('exist').contains('Sunrise');
    cy.get('.is-size-5').eq(0).should('exist');
    cy.get('.is-size-6').eq(1).should('exist').contains('Sunset');
    cy.get('.is-size-5').eq(1).should('exist');
    cy.get('a[href="/weather"]').click();
    cy.get('[data-testid="weather-card-location"]').eq(2).contains('Porto').click();
    cy.get('.title.mb-0').should('contain','Porto');
    cy.get('a[href="/weather"]').click();


})
  it('verify Add and Remove new Geographical locations', function() {
    Location.GoToSettings();
    GetLocation.AddLocation();
    //Assert if the location is added
    cy.contains('venice')
    //verify Newly added location is visible in the dashboard page and location page
    GetLocation.GoBack();
    cy.contains('venice').click()
    cy.get('.title.mb-0').should('contain','venice');
    cy.get('.is-size-1').should('exist');
    //verify if added location can be Removed 
    GetLocation.GoBack();
    Location.GoToSettings();
    GetLocation.RemoveLocation()
    GetLocation.GoBack();
    //check after deletion
    cy.get('.container').should('not.contain', 'venice');
  })
    

it('verify if the Error message displayed when wrong location is chosen', function() {
  //Go to settings page and choose invalid location
  Location.GoToSettings();
  GetLocation.AddInvalidLocation();
  //verify Newly added location is visible in the dashboard page and location page
  GetLocation.GoBack();
  //validate the error message displayed
  cy.get('[data-testid="weather-card-error"]').should('contain','We got stormy weather. Location not found');

  
})
  //verify cancel button in Location prompt box 
  it('verify cancel in location prompt box', function() {
      Location.GoToSettings();
      cy.window().then(($Win)=>{
        cy.stub($Win,'prompt').callsFake(() => null);
      cy.get('.button').eq(0).click();
      })
     })

  it('verify that user can switch preferred units', function() {
      //Go to settings page and try switching preferred units 
      Location.GoToSettings();
      GetLocation.UnitImperial();
      GetLocation.GoBack();
      // Verify that the temperature units on the UI update accordingly.
      Location.CheckWeatherCard();
 })

})
describe('Mock a location and validate the results in UI', function() {
 it('Mock a location and validate the current weather, temperature, sunrise, and sunset', function() {
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/weather?*', {
        fixture: 'WeatherLocation.json'
      }).as('WeatherData')
      cy.visit("http://localhost:3000/weather");
      cy.get('a[href="/weather/settings"]').click();
      cy.window().then(($Win)=>{
        cy.stub($Win,'prompt').returns('Chennai');
      cy.get('.button').eq(0).click();
    //Assert if the location is added
      cy.contains('Chennai')
    //verify Newly added location is visible in the dashboard page and location page
      cy.get('a[href="/weather"]').click();
      cy.contains('Chennai').click()
      cy.get('.title.mb-0').should('contain','Chennai');
    //Validate weather,temp,sunrise and sunset times for Mocked location
      cy.get('div.is-size-1[aria-label="Current temperature"]').should('contain','5 °C');
      cy.get('span.is-size-5').eq(0).should('contain','2:29:41 AM')
       
      
    });

      });
    })
    describe('verify denying current location access', function() {
      it('Deny current location access', function() {
        //tag:checklocationdeny
         cy.visit("http://localhost:3000/weather");
         cy.get('[data-testid="weather-card-error"]').contains('We got stormy weather. User denied Geolocation').should('exist');
         cy.screenshot('access denied for current location')
          
           });
         })
