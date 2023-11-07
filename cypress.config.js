const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');


module.exports = defineConfig({

  viewportWidth: 1280,
  viewportHeight: 720,
  
  projectId: "vsptn6",
  e2e: {



    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--start-fullscreen')
          launchOptions.preferences.width = 660;
          launchOptions.preferences.height = 2000;
      
          return launchOptions
        }

        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = true
      
          return launchOptions
        }
      })



      getCompareSnapshotsPlugin(on, config);

    },
  },
});
