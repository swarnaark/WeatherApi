class Weather{
    temp=".is-size-1";
    LnkBack="a[href='/weather']"
    sunrise=".is-size-5"
    sunset=".is-size-6"

    CheckAllAttributes()
    {
    
        cy.get(this.temp).should('exist')
        cy.get(this.sunrise).should('exist')
        cy.get(this.sunset).should('exist')
    

    }
   
    GoBack()
    {
        cy.get(this.LnkBack).click()
    }

}
export default Weather;