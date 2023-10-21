import Dashboard from "../../PageObjects/DashboardPage";
import Settings from "../../PageObjects/Settings";
import Weather from "../../PageObjects/Weather";


describe('Integration tests for Weather application', function() {       
    it('Get weather data for location-success', function() {
      
      cy.request(
        {
          method:"GET",
        url:'api.openweathermap.org/data/2.5/weather?q=venice',
        
        qs:{
          appid:'972090ed8c26eac287e08228a678b6cd'
        }
        
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.isOkStatusCode).to.eq(true);
          expect(response.body.name).to.equal('Venice');
          expect(response.body.coord).to.have.keys('lat', 'lon');
          expect(response.body.sys).to.have.key(
            'type',
            'id',
            'country',
            'sunrise',
            'sunset',
          );

 
      })
    })
    it('Get weather data for location by lat and long-success', function() {
      
      cy.request(
        {
          method:"GET",
        //url:'api.openweathermap.org/data/2.5/weather?q=venice',
        url:'https://api.openweathermap.org/data/2.5/weather?lat=40.99&lon=10.99',
        qs:{
          appid:'972090ed8c26eac287e08228a678b6cd'
        }
     
        
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.isOkStatusCode).to.eq(true);
          expect(response.body.name).to.equal('Budoni');
          expect(response.body.coord).to.have.keys('lat', 'lon');
          expect(response.body.main.temp).to.be.a('number');
        

 
      })
    })
    it('Get weather data for Invalid location ', function() {
      
      cy.request(
        {
          method:"GET",
         url:'https://api.openweathermap.org/data/2.5/weather?q=jhfhue',
        //url:'https://api.openweathermap.org/data/2.5/weather?lat=40.99&lon=10.99',
        qs:{
          appid:'972090ed8c26eac287e08228a678b6cd'
        },
        failOnStatusCode: false,
        
        }).then((response) => {
          expect(response.status).to.eq(404)
          expect(response.isOkStatusCode).to.eq(false);
          expect(response.body.message).to.eq('city not found');
 
      })
    })
    it('Get weather data -use InvalidAPi call ', function() {
      
      cy.request(
        {
          method:"GET",
         url:'https://api.openweathermap.org/data/2.5/weather?jhfhue',
        //url:'https://api.openweathermap.org/data/2.5/weather?lat=40.99&lon=10.99',
        qs:{
          appid:'972090ed8c26eac287e08228a678b6cd'
        },
        failOnStatusCode: false,
        
        }).then((response) => {
          expect(response.status).to.eq(400)
          //expect(response.isOkStatusCode).to.eq(false);
          expect(response.body.message).to.eq('Nothing to geocode');
 
      })
    })
    it('Get weather data -use InvalidAuthentication', function() {
      
      cy.request(
        {
          method:"GET",
         url:'https://api.openweathermap.org/data/2.5/weather?q=singapore',
        //url:'https://api.openweathermap.org/data/2.5/weather?lat=40.99&lon=10.99',
        qs:{
          appid:'972090ed08228a678b6cd'
        },
        failOnStatusCode: false,
        
        }).then((response) => {
          expect(response.status).to.eq(401)
          expect(response.isOkStatusCode).to.eq(false);
          expect(response.body.message).to.eq('Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.');
 
      })
    })
   it('Get weather data for location by lat and long-success', function() {
      
      cy.request(
        {
          method:"GET",
        //url:'api.openweathermap.org/data/2.5/weather?q=venice',
        url:'https://api.openweathermap.org/data/2.5/weather?lat=40.99&lon=10.99',
        qs:{
          appid:'972090ed8c26eac287e08228a678b6cd'
        }
     
        
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.isOkStatusCode).to.eq(true);
          expect(response.body.name).to.equal('Budoni');
          expect(response.body.coord).to.have.keys('lat', 'lon');
          expect(response.body.main.temp).to.be.a('number');
        
      })
    })
    
describe('validate api for different locations', () => {
  const Locations = ['Africa', 'Chicago', 'Vellore', 'Canberra','Auckland'];

  Locations.forEach((Location) => {
    it('should fetch weather data for ${Location}', () => {
 
      const LocationName = `apiResponse_${Location}`;

      cy.request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
          q: Location,
          appid: '972090ed8c26eac287e08228a678b6cd',
        },
      })
      
        .its('body')
        .as(LocationName);
          
      cy.get(`@${LocationName}`).should('include', { name: Location });
    });
  });
});


  })
   
          
       
      

    
    



