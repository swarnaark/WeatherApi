class Settings{
    btnAddLocation=".button";
    LnkBack="a[href='/weather']"
    btnRemove="button.delete.is-medium.has-background-danger.mt-1[aria-label='Remove venice']"
    lblSettings=".title.mb-0"
    AddLocation()
    {
        cy.window().then(($Win)=>{
            cy.fixture('Location.json').then((data)=>{
            cy.stub($Win,'prompt').returns(data.Location);
        cy.get(this.btnAddLocation).eq(0).click()
        })
    })
}
    AddInvalidLocation()
    {
        cy.window().then(($Win)=>{
            cy.fixture('Location.json').then((data)=>{
            cy.stub($Win,'prompt').returns(data.Location_Invalid);
        cy.get(this.btnAddLocation).eq(0).click()
        })
    })


    }
    RemoveLocation()
    {
        cy.get(this.btnRemove).click()
    }
    UnitMetric()
    {
        cy.get(this.btnAddLocation).eq(1).click()

    }
    UnitImperial()  
    {
        cy.get(this.btnAddLocation).eq(2).click()


    }
    
    GoBack()
    {
        cy.get(this.LnkBack).click()
    }
    ValidateLabel()
    {
        
        cy.get(this.lblSettings).should('contain','Settings');

    }
    ValidateStaticElements()
    {
        cy.contains('h2', 'Location').should('exist');
        cy.contains('h2', 'Units').should('exist');
        cy.get(this.btnAddLocation).eq(0).should('exist');
        cy.get(this.btnAddLocation).eq(1).contains('Metric');
        cy.get(this.btnAddLocation).eq(2).contains('Imperial');
    }

}
export default Settings;