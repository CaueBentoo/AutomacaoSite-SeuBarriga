import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------- CT-04 ----------------

Given('que clico na opção Contas', () => {
  cy.loginValido();
  cy.contains("Contas").click(); 
});

When('clico na opção Adicionar', () => {

  cy.contains("Adicionar").click({ force: true });
});

When('preencho o campo Nome e salvo', () => {
  const contas = [];

  // Create 2 different accounts
  for (let i = 0; i < 2; i++) {
    const nomeConta = `Conta_${Date.now()}_${i}`;
    contas.push(nomeConta);

    cy.get('input[name="nome"]').clear().type(nomeConta);
    cy.contains("Salvar").click();

    cy.contains("Conta adicionada com sucesso").should("be.visible");

    if (i === 0) cy.contains("Adicionar").click({ force: true });
  }

  cy.wrap(contas).as("contasCriadas");
});

Then('as contas serão adicionadas com sucesso', function () {
  // Validate that the two created accounts are visible in the list
  this.contasCriadas.forEach(nomeConta => {
    cy.contains(nomeConta).should("be.visible");
  });
});

// ---------------- CT-05 ----------------

Given('que adiciono contas previamente', function () {
  // Create the two accounts and save their names
  cy.criarDuasContas();
});

When('edito os nomes das contas criadas anteriormente', function () {
  this.contasCriadas.forEach((nomeConta, index) => {
    cy.get('#tabelaContas tbody tr')
      .contains(nomeConta)
      .parent('tr')
      .within(() => {
        cy.get('span.glyphicon-edit').click({ force: true });
      });

    const novoNome = `${nomeConta}_Editada`;
    cy.get('input[name="nome"]').clear().type(novoNome);
    cy.wrap(novoNome).as(`novoNome${index}`);
    cy.contains("Salvar").click();
  });
});

Then('os novos nomes devem aparecer na lista', function () {
  this.contasCriadas.forEach((nomeConta, index) => {
    const novoNome = this[`novoNome${index}`];
    cy.contains(novoNome).should("be.visible");
  });
});

// ---------------- CT-06 ----------------

Given('que existe uma conta vinculada a uma movimentação', function () {
  cy.loginValido();
  cy.criarContaComMovimentacao();
});

When('tento excluir essa conta', function () {
  cy.get('@contaComMovimentacao').then(dados => {
    const nomeConta = dados.conta;

    // Go to list of accounts
    cy.contains('Contas').click();
    cy.contains('Listar').click();

    // Ensure the table loads
    cy.get('#tabelaContas tbody tr').should('exist');

    // Find the row with the account and click the delete button
    cy.get('#tabelaContas tbody')
      .contains('tr', nomeConta)
      .within(() => {
        cy.get('span.glyphicon-remove-circle').click({ force: true });
      });
  });
});

Then('o sistema deve exibir uma mensagem de erro informando que a conta está vinculada a uma movimentação', () => {
  cy.contains("Conta em uso na movimentações").should("be.visible");
});

// ---------------- CT-07 ----------------

Given('que acesso a tela de listagem de contas', () => {
  cy.loginValido();
  cy.contains("Contas").click();
  cy.contains("Listar").click();
});

When('tento adicionar uma conta que já existe', function () {
  cy.criarConta().then(nome => {
    // Try creating the same account again
    cy.contains("Adicionar").click({ force: true });
    cy.get('input[name="nome"]').clear().type(nome);
    cy.contains("Salvar").click();
  });
});

Then('o sistema deve exibir mensagem de erro de conta duplicada', () => {
  cy.contains("Já existe uma conta com esse nome!").should("be.visible");
});