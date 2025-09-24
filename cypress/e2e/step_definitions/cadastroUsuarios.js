import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const randomEmail = () => `teste_${Date.now()}@mail.com`;

// ---------------- CT-01 -----------------------------

Given('que clico em "Novo usuário?"', () => {
  cy.acessarPaginaLogin();
  cy.contains("Novo usuário?").click();
});

When("preencho as informações", () => {
  cy.get('input[name="nome"]').type("Usuário Teste");
  cy.get('input[name="email"]').type(randomEmail());
  cy.get('input[name="senha"]').type("Senha123");
});

When('clico no botão "Cadastrar"', () => {
  cy.contains("Cadastrar").click();
});

Then("o usuário deve ser criado com sucesso", () => {
  cy.contains("Usuário inserido com sucesso").should("be.visible");
});
