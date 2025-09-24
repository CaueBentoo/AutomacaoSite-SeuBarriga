import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------- CT-19 ----------------

Given("que criei uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

Given("adiciono algumas movimentações em meses diferentes", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacoesMesesDiferentes(conta);
  });
});

When("acesso a aba Resumo Mensal", () => {
  cy.contains("Resumo Mensal").click();
});

Then("todas as movimentações exibidas correspondem aos filtros aplicados", () => {
  cy.get("@contaCriada").then((conta) => {
    const hoje = new Date();
    const mesAtual = String(hoje.getMonth() + 1).padStart(2, "0");
    const anoAtual = hoje.getFullYear();

    const mesAnteriorDate = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());
    const mesAnterior = String(mesAnteriorDate.getMonth() + 1).padStart(2, "0");
    const anoAnterior = mesAnteriorDate.getFullYear();

    cy.validarMovimentacoesFiltroMesAno(mesAtual, anoAtual);

    cy.validarMovimentacoesFiltroMesAno(mesAnterior, anoAnterior);
  });
});

// ---------------- CT-20 ----------------

Given("que adicionei uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

Given("criei uma movimentação", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoReceita("Receita", conta);
  });
});

When("eu acesso a aba Resumo Mensal", () => {
  cy.contains("Resumo Mensal").click();
});

When('clico no ícone de "x" para excluir uma movimentação', () => {
  cy.get("@movimentacaoCriada").then((mov) => {
    cy.contains("table tbody tr", mov.descricao)
      .find("a[href*='removerMovimentacao']") 
      .click();
  });
});


Then("a movimentação deve ser excluída com sucesso", () => {
  cy.contains("Movimentação removida com sucesso").should("be.visible");

  cy.get("@movimentacaoCriada").then((mov) => {
    cy.contains("table tbody tr", mov.descricao).should("not.exist");
  });
});

