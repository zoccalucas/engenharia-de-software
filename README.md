# PRÁTICA ATDD

## OBJETIVOS

Praticar e analisar como a praticar a estratégia de testes na abordagem agile, que preconiza "testes em todo o ciclo de desenvolvimento" desde a User Story até os testes.

Entender a estratégia de testes: quando, como e o que testar.

A equipe deverá entender a importância do trabalho do pessoal de Business (Cliente, PO, Designer e Usuários) em parceria com DEVs (Testadores e Desenvolvedores).

Entender BDD e TDD no contexto de ATDD.

## ESTUDO DE CASO

### GAMIFICAÇÃO PARA ENGAJAMENTO DE EDUCAÇÃO CONTINUADA

Uma determinada plataforma vende cursos online e EAD no modelo de assinaturas. O aluno paga um valor mensal e tem acesso a um conjunto de cursos para assinatura básica. A cada curso terminado e com média acima de 7,0, o aluno tem direito a realização de mais 3 cursos. O aluno que escrever mais tópicos no fórum e ajudar outros participantes com seus comentários, ganha um curso no final do mês. Quando o aluno conquistar 12 cursos, seu plano de assinatura passa a ser “Premium” e ele passa a receber voucher para participar de projetos reais, durante os cursos, e receber 3 moedas, que podem ser convertidas em conhecimento (novos cursos), acumular ou receber por criptomoeda.

## EXECUÇÃO DO PROJETO

1. Instale o [Npm](https://www.npmjs.com/)
2. Instale o [NodeJs](https://nodejs.org/en/)
3. Clone o repositório
4. Acesse a pasta do projeto e execute o comando `npm i` para instalar todas às dependências
5. Rode `npm start` para inicializar o server
6. Rode `npm test` para os testes unitátios
7. Rode `npm test:integration` para os testes de integração
8. Antes de subir um commit, rode `npm run pre-commit` para garantir a formatação do projeto

Observação: Não utilizar yarn neste projeto para evitar conflitos com o npm.

Os comandos de script e as dependências do projeto se encontram na pasta `package.json`.

# DOC

### URL

http://localhost:5050/api/certificate

Este endpoint salva o certificado para o estudante com o ID correspondente. As informações incluem `certificateId`, `studentId`, `studentEmail` e `activePlan`.

### MÉTODO

POST

### BODY

```JSON
{
  "certificateId": "anyId",
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
