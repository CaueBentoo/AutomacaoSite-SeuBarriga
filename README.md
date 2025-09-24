# Testes Automatizados - Seu Barriga

Este repositório contém a automação de testes do sistema [Seu Barriga](http://seubarriga.wcaquino.me/), desenvolvido em **Cypress** utilizando o padrão **BDD (Behavior Driven Development)** com o **Cucumber Preprocessor**.

---

## 📌 Pré-requisitos

- [Node.js](https://nodejs.org/) (>= 16.x)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🚀 Instalação

1. Clone este repositório:

No terminal coloque: git clone https://github.com/CaueBentoo/AutomacaoSite-SeuBarriga.git

2. 📦 Instalação de dependências

Antes de rodar os testes, instale as dependências do projeto.  
Você pode escolher entre **npm** ou **yarn**:

# Usando npm
npm install

# Usando yarn
yarn install

3. ▶️ Executando os testes

Existem três formas principais de rodar os testes:

No terminal:

- Primeira forma: Rodar todos os testes de uma vez (modo headless): 

"npx cypress run" 
 ou 
"yarn cypress run"


- Segunda forma: Abrir a interface interativa do Cypress: 

"npx cypress open"
 ou 
"yarn cypress open" 

(Os comandos acima abrirão o Cypress Test Runner, onde você pode escolher qual cenário ou feature executar).


- Terceira forma: Rodar cenários individuais por tags: 

Os cenários estão configurados com tags no arquivo .feature (exemplo: @CT-11, @CT-12, etc).

- Você pode executar apenas um cenário específico usando a flag --env tags:

"npx cypress run --env tags=@CT-13"
 ou
"yarn cypress run --env tags=@CT-13"


4. 📝 Visualizando o relatório de testes

- Após executar todos os testes no modo headless: "npx cypress run" ou "yarn cypress run", o Cypress gerará os relatórios na pasta: cypress/reports/html/index.html

- Para visualizar o relatório:

  Abra o arquivo index.html contido nesta pasta no seu navegador.

- O relatório exibirá:

    -Todos os cenários executados (passados ou falhos)
    -Screenshots dos testes que falharam
    -Gráficos de estatísticas de execução

💡 Dica: você pode abrir o relatório clicando duas vezes no arquivo index.html ou utilizando o comando do seu sistema operacional:

- Windows: start cypress/reports/html/index.html
- Mac: open cypress/reports/html/index.html
- Linux: xdg-open cypress/reports/html/index.html

5. 🛠️ Tecnologias utilizadas

Cypress
 - Framework de testes E2E

JavaScript
 - Linguagem utilizada no projeto 

Cucumber (cypress-cucumber-preprocessor)
 - Suporte ao BDD com Gherkin

Mochawesome
 - Relatórios de execução


6. ✅ Observações importantes

- Cada conta criada nos testes é gerada dinamicamente para evitar conflitos.
- Os cenários foram organizados para manter clareza entre Given / When / Then, seguindo boas práticas do BDD.
- É possível criar novos comandos dentro de cypress/support/commands para manter os step definitions mais limpos.
