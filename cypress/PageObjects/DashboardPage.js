class Dashboard{
    btnLocation="[data-testid='weather-card-location']";
    LnkSettings="a[href='/weather/settings']";
    Weathercard="[data-testid='weather-card-temperature']"

    DisplayWeatherDetails()
    {
        cy.get(this.btnLocation).eq(0).click()
        cy.get(this.btnLocation).eq(1).click()
        cy.get(this.btnLocation).eq(2).click()
    }
    GoToSettings()
    {
        cy.get(this.LnkSettings).click()

    }
    AddCurentLocation()
    {
        cy.get(this.btnLocation).eq(0).contains('Oslo').should('exist');
        
    }
    verifyDefaultLocation()
    {
        cy.get(this.btnLocation).eq(1).contains('Berlin').should('exist');
    cy.get(this.btnLocation).eq(2).contains('Porto').should('exist');
    }
    CheckWeatherCard()
    {
     
    cy.get(this.Weathercard).should('contain','°F');
    }
}
export default Dashboard;
