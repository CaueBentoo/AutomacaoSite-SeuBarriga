// Account-related commands

// Create a simple account and save the name
Cypress.Commands.add('criarConta', (nomeConta) => {
  const nome = nomeConta || `Conta_${Date.now()}`;
  cy.contains("Contas").click();
  cy.contains("Adicionar").click({ force: true });
  cy.get('input[name="nome"]').clear().type(nome);
  cy.contains("Salvar").click();
  cy.contains("Conta adicionada com sucesso").should("be.visible");
  cy.wrap(nome).as('contaCriada');
  return cy.get('@contaCriada');
});

// Create two accounts
Cypress.Commands.add("criarDuasContas", () => {
  cy.loginValido();
  cy.contains("Contas").click();

  const contasCriadas = [];
  for (let i = 0; i < 2; i++) {
    const nomeConta = `Conta_${Date.now()}_${i}`;
    contasCriadas.push(nomeConta);

    cy.contains("Adicionar").click({ force: true });
    cy.get('input[name="nome"]').clear().type(nomeConta);
    cy.contains("Salvar").click();
    cy.contains("Conta adicionada com sucesso").should("be.visible");
  }

  return cy.wrap(contasCriadas).as("contasCriadas");
});
