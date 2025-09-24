Feature: Login no sistema

  @CT-02
  Scenario: Login falha para usuário não cadastrado
    Given que eu preencho os campos "Email" e "senha" com dados que não foram cadastrados anteriormente
    When clico no botão "Entrar"
    Then o sistema deve exibir mensagem de erro

  @CT-03
  Scenario: Login com usuário já cadastrado
    Given que tento logar com informações de um usuário válido
    When clico no botão “Entrar”
    Then devo acessar a página inicial do site