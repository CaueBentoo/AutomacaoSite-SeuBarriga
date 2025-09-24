Feature: Logout

@CT-21
Scenario: Realizar logout
    Given que estou logado no sistema
    When clico em "Sair"
    Then o usuário deve ser redirecionado para a tela de login
