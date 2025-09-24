import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------- CT-21 -----------------------------

Given("que estou logado no sistema", () => {
  cy.loginValido();
});

When('clico em "Sair"', () => {
  cy.contains("Sair").click();
});

Then("o usuário deve ser redirecionado para a tela de login", () => {
  cy.url().should("include", "/logout");
  cy.contains("Entrar").should("be.visible");
});
