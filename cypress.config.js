const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://seubarriga.wcaquino.me",
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      if (config.env.TAGS) {
        config.env.CUCUMBER_TAGS = config.env.TAGS;
      }

      require("cypress-mochawesome-reporter/plugin")(on);

      config.env = {
        ...config.env,
        stepDefinitions: [
          "cypress/e2e/step_definitions/**/*.{js,mjs,ts,tsx}",
          "cypress/support/step_definitions/**/*.{js,mjs,ts,tsx}"
        ]
      };

      return config;
    },
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Relatório de Testes - Seu Barriga",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});
