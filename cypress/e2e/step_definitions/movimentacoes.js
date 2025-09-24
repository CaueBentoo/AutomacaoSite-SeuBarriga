import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ---------------- CT-08 ----------------

Given("que estou na página inicial", () => {
  cy.loginValido();
});

Given("possuo uma conta cadastrada", () => {
  cy.criarConta();
});

Given("clico na opção Criar Movimentação", () => {
    cy.contains("Criar Movimentação").click();
  });
  

When("adiciono uma movimentação do tipo Receita", (tipo) => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoReceita(tipo, conta);
  });
});

Then("a movimentação deve ser exibida na aba Resumo Mensal", () => {
  cy.get("@movimentacaoCriada").then((mov) => {
    cy.contains("Resumo Mensal").click();
    cy.contains(mov.descricao).should("be.visible");
  });
});

// ---------------- CT-09 ----------------

Given("que eu estou na página inicial", () => {
    cy.loginValido();
  });
  
  Given("eu possuo uma conta cadastrada", () => {
    cy.criarConta();
  });
  
  Given("eu clico na opção Criar Movimentação", () => {
      cy.contains("Criar Movimentação").click();
    });
    
  
  When("adiciono uma movimentação do tipo Despesa", (tipo) => {
    cy.get("@contaCriada").then((conta) => {
      cy.criarMovimentacaoDespesa(tipo, conta);
    });
  });
  
  Then("a movimentação deverá ser exibida na aba Resumo Mensal", () => {
    cy.get("@movimentacaoCriada").then((mov) => {
      cy.contains("Resumo Mensal").click();
      cy.contains(mov.descricao).should("be.visible");
    });
  });

// ---------------- CT-10 ----------------

  Given("que crio duas contas", () => {
    cy.criarDuasContas();
  });
  
  When("adiciono duas movimentações na primeira conta", () => {
    cy.get("@contasCriadas").then(contas => {
      cy.criarMovimentacoesParaConta(contas[0], "Receita", 2);
    });
  });
  
  When("adiciono duas movimentações na segunda conta", () => {
    cy.get("@contasCriadas").then(contas => {
      cy.criarMovimentacoesParaConta(contas[1], "Despesa", 2);
    });
  });

  Then("as movimentações devem ser listadas corretamente na aba Resumo Mensal", () => {
    cy.contains("Resumo Mensal").click();
  
    cy.get("@contasCriadas").then(contas => {
      contas.forEach((conta, contaIndex) => {
        for (let i = 0; i < 2; i++) {
          cy.get(`@mov_${conta}_${i}`).then(mov => {
            cy.contains(mov.descricao).should("be.visible");
          });
        }
      });
    });
  });
  
// ---------------- CT-11 ----------------

Given("que tenho uma conta adicionada", () => {
    cy.loginValido(); 
    cy.criarConta();
  });
  
  When("adiciono duas movimentações com a situação “Pago”", () => {
    cy.get("@contaCriada").then(conta => {
      cy.criarMovimentacoesParaConta(conta, "Receita", 2, "Pago");
    });
  });
  
  Then("as movimentações devem refletir a situação correta na aba Resumo Mensal", () => {
    cy.contains("Resumo Mensal").click();
    cy.get("@contaCriada").then(conta => {
      for (let i = 0; i < 2; i++) {
        cy.get(`@mov_${conta}_${i}`).then(mov => {
          cy.contains(mov.descricao).should("be.visible");
          cy.contains(mov.descricao)
            .parent()
            .contains(mov.situacao)
            .should("be.visible");
        });
      }
    });
  });

// ---------------- CT-12 ----------------

Given("que eu tenho uma conta adicionada", () => {
    cy.loginValido(); 
    cy.criarConta();
  });
  
  When("adiciono duas movimentações com a situação “Pendente”", () => {
    cy.get("@contaCriada").then(conta => {
      cy.criarMovimentacoesParaConta(conta, "Receita", 2, "Pendente");
    });
  });
  
  Then("as movimentações deverão refletir a situação correta na aba Resumo Mensal", () => {
    cy.contains("Resumo Mensal").click();
    cy.get("@contaCriada").then(conta => {
      for (let i = 0; i < 2; i++) {
        cy.get(`@mov_${conta}_${i}`).then(mov => {
          cy.contains(mov.descricao).should("be.visible");
          cy.contains(mov.descricao)
            .parent()
            .contains(mov.situacao)
            .should("be.visible");
        });
      }
    });
  });

// ---------------- CT-13 ----------------

Given("que adiciono uma conta", () => {
    cy.loginValido();
    cy.criarConta();
  });
  
  When("adiciono nesta conta uma movimentação no mês atual e uma no mês anterior", () => {
    cy.get("@contaCriada").then(conta => {
      cy.criarMovimentacoesMesesDiferentes(conta);
    });
  });
  
  Then("ambas devem ser listadas corretamente na aba Resumo Mensal", () => {
    cy.get("@contaCriada").then(conta => {
      cy.verificarMovimentacoesResumoMensal(conta);
    });
  });

// ---------------- CT-14 ----------------
  
Given("que crio uma conta", () => {
    cy.loginValido();
    cy.criarConta();
  });
  
  When("crio uma movimentação com os campos que contém data, em branco", () => {
    cy.get("@contaCriada").then(conta => {
      cy.criarMovimentacaoSemData(conta);
    });
  });
  
  Then('o sistema deve exibir a mensagem "Data da Movimentação é obrigatório" e "Data do pagamento é obrigatório"', () => {
    cy.contains("Data da Movimentação é obrigatório").should("be.visible");
    cy.contains("Data do pagamento é obrigatório").should("be.visible");
  });

// ---------------- CT-15 ----------------
Given("que eu crio uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

When("crio uma movimentação com datas em formato inválido", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoComDataInvalida(conta, "invalida");
  });
});

Then("o sistema deve exibir as mensagens de erro para data inválida", () => {
  cy.contains("Data da Movimentação inválida (DD/MM/YYYY)").should("be.visible");
  cy.contains("Data do pagamento inválida (DD/MM/YYYY)").should("be.visible");
});

// ---------------- CT-16 ----------------

Given("que irei criar uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

When("crio uma movimentação com datas no futuro", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoComDataInvalida(conta, "futuro");
  });
});

Then("o sistema deve exibir a mensagem de erro para data no futuro", () => {
  cy.contains("Data da Movimentação deve ser menor ou igual à data atual").should("be.visible");
});

// ---------------- CT-17 ----------------
Given("que estou adicionando uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

When("crio uma movimentação e deixo o campo Valor em branco", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoSemValor(conta);
  });
});

Then('o sistema deve exibir mensagem de erro no campo Valor', () => {
  cy.contains("Valor é obrigatório").should("be.visible");
  cy.contains("Valor deve ser um número").should("be.visible");
});

// ---------------- CT-18 ----------------

Given("que estou criando uma conta", () => {
  cy.loginValido();
  cy.criarConta();
});

When("crio uma movimentação e preencho o campo Valor com um formato inválido", () => {
  cy.get("@contaCriada").then((conta) => {
    cy.criarMovimentacaoValorInvalido(conta);
  });
});

Then("o sistema deve exibir uma mensagem de erro", () => {
  cy.contains("Valor deve ser um número").should("be.visible");
});