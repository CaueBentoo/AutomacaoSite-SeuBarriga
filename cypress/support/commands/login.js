// Login related commands

// Access login page
Cypress.Commands.add('acessarPaginaLogin', () => {
  cy.visit('https://seubarriga.wcaquino.me/login');
});

// Valid login
Cypress.Commands.add("loginValido", () => {
  cy.acessarPaginaLogin();
  cy.fixture("usuarioValido").then((usuario) => {
    cy.get('input[name="email"]').type(usuario.email);
    cy.get('input[name="senha"]').type(usuario.senha);
    cy.contains("Entrar").click();
  });

  cy.url().should("include", "/logar");
  cy.contains("Bem vindo").should("be.visible");
});
