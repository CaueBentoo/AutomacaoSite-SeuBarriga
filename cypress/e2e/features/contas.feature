Feature: Contas

  @CT-04
  Scenario: Adicionar contas
    Given que clico na opção Contas
    When clico na opção Adicionar
    And preencho o campo Nome e salvo
    Then as contas serão adicionadas com sucesso

  @CT-05 
  Scenario: Alterar o nome de uma conta
    Given que adiciono contas previamente
    When edito os nomes das contas criadas anteriormente
    Then os novos nomes devem aparecer na lista

  @CT-06
  Scenario: Excluir conta vinculada a movimentação  
    Given que existe uma conta vinculada a uma movimentação
    When tento excluir essa conta
    Then o sistema deve exibir uma mensagem de erro informando que a conta está vinculada a uma movimentação

  @CT-07
  Scenario: Adicionar conta com nome já existente
    Given que acesso a tela de listagem de contas
    When tento adicionar uma conta que já existe
    Then o sistema deve exibir mensagem de erro de conta duplicada