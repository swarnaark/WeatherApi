describe('Weather App Integration Validation', () => {
    beforeEach(() => {
      // API Request to fetch data for a selected Location.
      cy.request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?units=metric',
        qs: {
          q: 'Porto',
          appid: '972090ed8c26eac287e08228a678b6cd'
        }
      })
        .its('body')
        .as('Response'); 
    })
  ///Tc_0001:verify the City displayed in UI matches with API response
    it('should display the correct city name', function () {
      // Accessing the aliased API response
      const apiResponse = this.Response;
  
      cy.visit('http://localhost:3000/weather'); 
      cy.wait(3000)
  
      // Assertion for  city name in the UI matches the API response
      cy.get('[data-testid="weather-card-location"]').eq(2).should('contain', apiResponse.name);
    })
    ///Tc_0002:verify the Temperature displayed in UI matches with API response
    it('should display the correct temperature', function () {
      const apiResponse = this.Response;
  
      cy.visit('http://localhost:3000/weather'); 
  
      // Assert that the temperature in the UI matches the API response
      cy.get('[data-testid="weather-card-temperature"]').eq(2).should('contain', apiResponse.main.temp);
    })
    ///TC_003- verify Humidity,visibility matches with in UI matches Api response
    it('should display the correct humidity', function () {
        // Access the aliased API response using `this.Response`
        const apiResponse = this.Response;
    
        cy.visit('http://localhost:3000/weather'); 
        cy.wait(3000)
        cy.get('[data-testid="weather-card-location"]').eq(2).click()
        cy.get('.is-size-5').eq(2).should('contain', apiResponse.main.humidity);
  })

})