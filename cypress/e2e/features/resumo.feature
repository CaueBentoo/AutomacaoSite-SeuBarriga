Feature: Resumo Mensal

@CT-19
Scenario: Filtrar movimentações no "Resumo Mensal"
    Given que criei uma conta
    And adiciono algumas movimentações em meses diferentes
    When acesso a aba Resumo Mensal
    Then todas as movimentações exibidas correspondem aos filtros aplicados

@CT-20
Scenario: Excluir movimentação
    Given que adicionei uma conta
    And criei uma movimentação
    When eu acesso a aba Resumo Mensal
    And clico no ícone de "x" para excluir uma movimentação
    Then a movimentação deve ser excluída com sucesso

