import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from "cypress-browser-permissions";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on,config);
      require('cypress-mochawesome-reporter/plugin')(on);

    },
    
    env: {
      browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
      
    },
      },
  },
});
