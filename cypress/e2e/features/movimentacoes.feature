Feature: Movimentações

  @CT-08
  Scenario: Criar movimentação (Receita)
    Given que estou na página inicial
    And possuo uma conta cadastrada
    And clico na opção Criar Movimentação
    When adiciono uma movimentação do tipo Receita
    Then a movimentação deve ser exibida na aba Resumo Mensal

  @CT-09
  Scenario: Criar movimentação (Despesa)
    Given que eu estou na página inicial
    And eu possuo uma conta cadastrada
    And eu clico na opção Criar Movimentação
    When adiciono uma movimentação do tipo Despesa
    Then a movimentação deverá ser exibida na aba Resumo Mensal  

  @CT-10
  Scenario: Criar movimentações para contas diferentes
    Given que crio duas contas
    When adiciono duas movimentações na primeira conta
    And adiciono duas movimentações na segunda conta
    Then as movimentações devem ser listadas corretamente na aba Resumo Mensal

  @CT-11
  Scenario: Criar movimentações para a situação "Pago"
    Given que tenho uma conta adicionada
    When adiciono duas movimentações com a situação “Pago”
    Then as movimentações devem refletir a situação correta na aba Resumo Mensal

  @CT-12
  Scenario: Criar movimentações para a situação "Pendente"
    Given que eu tenho uma conta adicionada
    When adiciono duas movimentações com a situação “Pendente”
    Then as movimentações deverão refletir a situação correta na aba Resumo Mensal

  @CT-13
  Scenario: Criar movimentações para meses diferentes
    Given que adiciono uma conta
    When adiciono nesta conta uma movimentação no mês atual e uma no mês anterior
    Then ambas devem ser listadas corretamente na aba Resumo Mensal

  @CT-14
  Scenario: Criar movimentação com os campos que contém data, em branco
    Given que crio uma conta
    When crio uma movimentação com os campos que contém data, em branco
    Then o sistema deve exibir a mensagem "Data da Movimentação é obrigatório" e "Data do pagamento é obrigatório"

  @CT-15
  Scenario: Criar movimentação com campos de data em formato inválido
    Given que eu crio uma conta
    When crio uma movimentação com datas em formato inválido
    Then o sistema deve exibir as mensagens de erro para data inválida

  @CT-16
  Scenario: Criar movimentação com campos de data no futuro
    Given que irei criar uma conta
    When crio uma movimentação com datas no futuro
    Then o sistema deve exibir a mensagem de erro para data no futuro  

  @CT-17
  Scenario: Criar movimentação com o campo "Valor" em branco
    Given que estou adicionando uma conta
    When crio uma movimentação e deixo o campo Valor em branco
    Then o sistema deve exibir mensagem de erro no campo Valor

  @CT-18
  Scenario: Criar movimentação com o campo "Valor" com formato inválido
    Given que estou criando uma conta
    When crio uma movimentação e preencho o campo Valor com um formato inválido
    Then o sistema deve exibir uma mensagem de erro