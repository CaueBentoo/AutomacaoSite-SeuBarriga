Feature: Cadastro de usuário
  @CT-01  
  Scenario: Criar um novo usuário com sucesso
    Given que clico em "Novo usuário?"
    When preencho as informações
    And clico no botão "Cadastrar"
    Then o usuário deve ser criado com sucesso
