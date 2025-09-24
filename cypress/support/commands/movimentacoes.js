// Commands related to movements

// Create account with linked transactions
Cypress.Commands.add("criarContaComMovimentacao", () => {
  const nomeConta = `ContaMov_${Date.now()}`;
  const descricaoMov = `Movimentacao_${Date.now()}`;

  cy.contains("Contas").click();
  cy.contains("Adicionar").click({ force: true });
  cy.get('input[name="nome"]').type(nomeConta);
  cy.contains("Salvar").click();
  cy.contains("Conta adicionada com sucesso").should("be.visible");

  cy.contains("Criar Movimentação").click();
  cy.get('select[name="tipo"]').select("Receita");
  const hoje = "22/09/2025";
  cy.get('input[name="data_transacao"]').type(hoje);
  cy.get('input[name="data_pagamento"]').type(hoje);
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste Interessado");
  cy.get('input[name="valor"]').type("100");
  cy.get('select[name="conta"]').select(nomeConta);
  cy.contains("Salvar").click();
  cy.contains("Movimentação adicionada com sucesso").should("be.visible");

  cy.wrap({ conta: nomeConta, descricao: descricaoMov }).as("contaComMovimentacao");
});


// Create a movement of the type 'Revenue'

Cypress.Commands.add("criarMovimentacaoReceita", (tipo = "Receita", conta, valor = "100") => {
  const descricaoMov = `Movimentacao_${Date.now()}`;
  const dataReceita = "22/09/2025";
  
  cy.contains("Criar Movimentação").click();
  cy.get('select[name="tipo"]').select(tipo);
  cy.get('input[name="data_transacao"]').type(dataReceita);
  cy.get('input[name="data_pagamento"]').type(dataReceita);
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste Receita");
  cy.get('input[name="valor"]').type(valor);
  cy.get('select[name="conta"]').select(conta);
  cy.contains("Salvar").click();
  cy.contains("Movimentação adicionada com sucesso").should("be.visible");

  cy.wrap({ descricao: descricaoMov }).as("movimentacaoCriada");
});

// Create a movement of the type 'Expense'

Cypress.Commands.add("criarMovimentacaoDespesa", (tipo = "Despesa", conta, valor = "300") => {
  const descricaoMov = `Movimentacao_${Date.now()}`;
  const dataDespesa = "22/09/2025"; 
  
  cy.contains("Criar Movimentação").click();
  cy.get('select[name="tipo"]').select(tipo);
  cy.get('input[name="data_transacao"]').type(dataDespesa);
  cy.get('input[name="data_pagamento"]').type(dataDespesa);
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste Receita");
  cy.get('input[name="valor"]').type(valor);
  cy.get('select[name="conta"]').select(conta);
  cy.contains("Salvar").click();
  cy.contains("Movimentação adicionada com sucesso").should("be.visible");

  cy.wrap({ descricao: descricaoMov }).as("movimentacaoCriada");
});

// Create movements for the accounts

Cypress.Commands.add("criarMovimentacoesParaConta", (conta, tipo = "Receita", quantidade = 2, situacao = null) => {
  for (let i = 0; i < quantidade; i++) {
    const descricaoMov = `Mov_${tipo}_${Date.now()}_${i}`;

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    cy.contains("Criar Movimentação").click();
    cy.get('select[name="tipo"]').select(tipo);
    cy.get('input[name="data_transacao"]').type(dataFormatada);
    cy.get('input[name="data_pagamento"]').type(dataFormatada);
    cy.get('input[name="descricao"]').type(descricaoMov);
    cy.get('input[name="interessado"]').type("Teste");
    cy.get('input[name="valor"]').type("100");
    cy.get('select[name="conta"]').select(conta);

// If the situation is passed, select the status
    if (situacao) {
      const valor = String(situacao).trim().toLowerCase();
      if (valor === 'pago') {
        cy.get('#status_pago').check({ force: true });
      } else if (valor === 'pendente') {
        cy.get('#status_pendente').check({ force: true });
      }
    }

    cy.contains("Salvar").click();
    cy.contains("Movimentação adicionada com sucesso").should("be.visible");

    cy.wrap({ conta, descricao: descricaoMov, situacao }).as(`mov_${conta}_${i}`);
  }
});

// Helper function to get the last valid day of the previous month

function getDataMesAnterior(data) {
  const ano = data.getFullYear();
  const mes = data.getMonth();
  const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
  const dia = Math.min(data.getDate(), ultimoDiaMesAnterior);
  return new Date(ano, mes - 1, dia);
}

// Command to create movement with specific date

Cypress.Commands.add("criarMovimentacaoComData", (conta, tipo = "Receita", data, situacao = null) => {
  const descricaoMov = `Mov_${tipo}_${Date.now()}`;

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  const dataAlias = `${dia}_${mes}_${ano}`;

  cy.contains("Criar Movimentação").click();
  cy.get('select[name="tipo"]').select(tipo);
  cy.get('input[name="data_transacao"]').type(dataFormatada);
  cy.get('input[name="data_pagamento"]').type(dataFormatada);
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste");
  cy.get('input[name="valor"]').type("100");
  cy.get('select[name="conta"]').select(conta);

  if (situacao) {
    const valor = String(situacao).trim().toLowerCase();
    if (valor === 'pago') cy.get('#status_pago').check({ force: true });
    else if (valor === 'pendente') cy.get('#status_pendente').check({ force: true });
  }

  cy.contains("Salvar").click();
  cy.contains("Movimentação adicionada com sucesso").should("be.visible");

  cy.wrap({ conta, descricao: descricaoMov, data: dataFormatada }).as(`mov_${conta}_${dataAlias}`);
});

// Command to create transactions in the current month and the previous month

Cypress.Commands.add("criarMovimentacoesMesesDiferentes", (conta, tipo = "Receita") => {
  const hoje = new Date();
  const mesAnterior = getDataMesAnterior(hoje);

  cy.criarMovimentacaoComData(conta, tipo, hoje);
  cy.criarMovimentacaoComData(conta, tipo, mesAnterior);
});

// command to check transactions in the monthly summary

Cypress.Commands.add("verificarMovimentacoesResumoMensal", (conta) => {
  const hoje = new Date();
  const meses = [
    { data: hoje },
    { data: getDataMesAnterior(hoje) }
  ];

  cy.contains("Resumo Mensal").click();

  meses.forEach(m => {
    const dia = String(m.data.getDate()).padStart(2,"0");
    const mes = String(m.data.getMonth() + 1).padStart(2,"0");
    const ano = m.data.getFullYear();
    const alias = `${dia}_${mes}_${ano}`;

    cy.get('select[name="mes"]').select(mes);
    cy.get('select[name="ano"]').select(`${ano}`);
    cy.contains("Buscar").click();

    cy.get(`@mov_${conta}_${alias}`).then(mov => {
      cy.contains(mov.descricao).should("be.visible");
    });
  });
});

// command to create transaction without date

Cypress.Commands.add("criarMovimentacaoSemData", (conta, tipo = "Receita") => {
  const descricaoMov = `Mov_${tipo}_${Date.now()}`;

  cy.contains("Criar Movimentação").click();
  cy.get('select[name="tipo"]').select(tipo);
  cy.get('input[name="data_transacao"]').clear();
  cy.get('input[name="data_pagamento"]').clear();
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste");
  cy.get('input[name="valor"]').type("100");
  cy.get('select[name="conta"]').select(conta);
  cy.contains("Salvar").click();
});

Cypress.Commands.add("criarMovimentacaoComDataInvalida", (conta, tipo = "invalida") => {
  cy.contains("Criar Movimentação").click();

  if (tipo === "invalida") {
    cy.get('input[name="data_transacao"]').type("22-09-2025"); // formato errado
    cy.get('input[name="data_pagamento"]').type("testeData"); // texto inválido
  }

  if (tipo === "futuro") {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + 10);
    const dataFutura = `${String(hoje.getDate()).padStart(2, "0")}/${String(
      hoje.getMonth() + 1
    ).padStart(2, "0")}/${hoje.getFullYear()}`;

    cy.get('input[name="data_transacao"]').type(dataFutura);
    cy.get('input[name="data_pagamento"]').type(dataFutura);
  }

  cy.get('input[name="descricao"]').type(`Mov_Data_${Date.now()}`);
  cy.get('input[name="interessado"]').type("Teste");
  cy.get('input[name="valor"]').type("100");
  cy.get('select[name="conta"]').select(conta);
  cy.get('#status_pendente').check({ force: true }); // ou #status_pago se quiser marcar pago
  cy.contains("Salvar").click();
});

Cypress.Commands.add("criarMovimentacaoSemValor", (conta) => {
  cy.contains("Criar Movimentação").click();

  cy.get('input[name="data_transacao"]').type("23/09/2025");
  cy.get('input[name="data_pagamento"]').type("23/09/2025");
  cy.get('input[name="descricao"]').type(`Mov_SemValor_${Date.now()}`);
  cy.get('input[name="interessado"]').type("Teste");
  cy.get('select[name="conta"]').select(conta);
  cy.get('#status_pendente').check({ force: true });

  cy.contains("Salvar").click();
});

Cypress.Commands.add("criarMovimentacaoValorInvalido", (conta) => {
  cy.contains("Criar Movimentação").click();

  const descricaoMov = `Mov_ValorInvalido_${Date.now()}`;

  cy.get('select[name="tipo"]').select("Receita");
  cy.get('input[name="data_transacao"]').type("23/09/2025");
  cy.get('input[name="data_pagamento"]').type("23/09/2025");
  cy.get('input[name="descricao"]').type(descricaoMov);
  cy.get('input[name="interessado"]').type("Teste");
  cy.get('input[name="valor"]').type("abc!@#"); // valor inválido
  cy.get('select[name="conta"]').select(conta);
  cy.get('#status_pendente').check({ force: true });

  cy.contains("Salvar").click();
});

Cypress.Commands.add("validarMovimentacoesFiltroMesAno", (mes, ano) => {
  cy.contains("Resumo Mensal").click(); // só uma vez

  // espera para garantir que os selects estejam visíveis
  cy.get('select[name="mes"]').should("be.visible").select(mes);
  cy.get('select[name="ano"]').should("be.visible").select(`${ano}`);
  cy.contains("Buscar").click();

  // valida todas as linhas da tabela
  cy.get("table tbody tr").each(($linha) => {
    cy.wrap($linha).find("td").eq(1).invoke("text").then((data) => {
      const [dia, mesLinha, anoLinha] = data.split("/");
      expect(mesLinha).to.equal(mes.padStart(2, "0"));
      expect(anoLinha).to.equal(`${ano}`);
    });
  });
});

