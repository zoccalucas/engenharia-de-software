# PRÁTICA ATDD

## OBJETIVOS

Praticar e analisar como a praticar a estratégia de testes na abordagem agile, que preconiza "testes em todo o ciclo de desenvolvimento" desde a User Story até os testes.

Entender a estratégia de testes: quando, como e o que testar.

A equipe deverá entender a importância do trabalho do pessoal de Business (Cliente, PO, Designer e Usuários) em parceria com DEVs (Testadores e Desenvolvedores).

Entender BDD e TDD no contexto de ATDD.

## ESTUDO DE CASO

### GAMIFICAÇÃO PARA ENGAJAMENTO DE EDUCAÇÃO CONTINUADA

Uma determinada plataforma vende cursos online e EAD no modelo de assinaturas. O aluno paga um valor mensal e tem acesso a um conjunto de cursos para assinatura básica. A cada curso terminado e com média acima de 7,0, o aluno tem direito a realização de mais 3 cursos. O aluno que escrever mais tópicos no fórum e ajudar outros participantes com seus comentários, ganha um curso no final do mês. Quando o aluno conquistar 12 cursos, seu plano de assinatura passa a ser “Premium” e ele passa a receber voucher para participar de projetos reais, durante os cursos, e receber 3 moedas, que podem ser convertidas em conhecimento (novos cursos), acumular ou receber por criptomoeda.

## EXECUÇÃO DO PROJETO COM NPM

1. Instale o [Npm](https://www.npmjs.com/)
2. Instale o [NodeJs](https://nodejs.org/en/)
3. Clone o repositório
4. Acesse a pasta do projeto e execute o comando `npm i` para instalar todas às dependências
5. Execute `npm start` para inicializar o server

## EXECUÇÃO DO PROJETO COM DOCKER

1. Instale o docker [Docker](https://docs.docker.com/?_gl=1*1i2xyt5*_ga*NDQyNjY0Mjg5LjE2ODUwNTEzNzU.*_ga_XJWPQMJYHQ*MTY4NTA1MTM3NS4xLjEuMTY4NTA1MTM3NS42MC4wLjA.)
2. Clone o repositório
3. Execute `docker-compose up

## EXECUÇÃO DOS TESTES

1. Siga os passos de "EXECUÇÃO DO PROJETO COM NPM" para instalação das dependências de teste
2. Execute `npm test` para os testes unitátios
3. Execute `npm test:integration` para os testes de integração
4. Antes de subir um commit, execute `npm run pre-commit` para garantir a formatação do projeto

Observação: Não utilizar yarn neste projeto para evitar conflitos com o npm.

Os comandos de script e as dependências do projeto se encontram na pasta `package.json`.

# DOC

### DESCRIÇÃO

Este endpoint salva o certificado para o estudante com o ID correspondente. As informações incluem `certificateId`, `studentId`, `studentEmail` e `activePlan`.

### URL

http://localhost:5050/api/certificate

### MÉTODO

`POST`

### BODY

```JSON
{
  "studentId": "anyId",
  "studentEmail": "anyEmail@gmail.com",
  "activePlan": "true"
}
```

### Parâmetros de Retorno

Status HTTP: 200 OK

```JSON
{
  "message": "Certificate created"
}
```
