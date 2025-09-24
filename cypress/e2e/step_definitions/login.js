import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------- CT-02 -----------------------------

Given('que eu preencho os campos "Email" e "senha" com dados que não foram cadastrados anteriormente', () => {
  cy.acessarPaginaLogin();
  const randomEmail = `nao_existe_${Date.now()}@mail.com`;
  cy.get('input[name="email"]').type(randomEmail);
  cy.get('input[name="senha"]').type('SenhaInvalida123');
});

When('clico no botão "Entrar"', () => {
  cy.contains('Entrar').click();
});

Then('o sistema deve exibir mensagem de erro', () => {
  cy.contains('Problemas com o login do usuário').should('be.visible');
});

// ---------------- CT-03 -----------------------------

Given('que tento logar com informações de um usuário válido', () => {
  cy.acessarPaginaLogin();

  cy.fixture('usuarioValido').then((usuario) => {
    cy.get('input[name="email"]').type(usuario.email);
    cy.get('input[name="senha"]').type(usuario.senha);
  });
});

When('clico no botão “Entrar”', () => {
  cy.contains('Entrar').click();
});

Then('devo acessar a página inicial do site', () => {

  cy.url().should('include', '/logar');
  cy.contains('Bem vindo').should('be.visible');
});