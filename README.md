# Engenharia de Software II - Prática ATDD

# Descrição:

API em NodeJs utilizando Typescript, TDD, Clean Architecture, Design Patterns e SOLID principles

# Objetivos:

- Praticar e analisar como a praticar a estratégia de testes na abordagem agile, que preconiza "testes em todo o ciclo de desenvolvimento" desde a User Story até os testes.

- Entender a estratégia de testes: quando, como e o que testar.

- A equipe deverá entender a importância do trabalho do pessoal de Business (Cliente, PO, Designer e Usuários) em parceria com DEVs (Testadores e Desenvolvedores).

# Estudo de Caso:

## Gamificação para engajamento de educação continuada

Uma determinada plataforma vende cursos online e EAD no modelo de assinaturas. O aluno paga um valor mensal e tem acesso a um conjunto de cursos para assinatura básica. A cada curso terminado e com média acima de 7,0, o aluno tem direito a realização de mais 3 cursos. O aluno que escrever mais tópicos no fórum e ajudar outros participantes com seus comentários, ganha um curso no final do mês. Quando o aluno conquistar 12 cursos, seu plano de assinatura passa a ser “Premium” e ele passa a receber voucher para participar de projetos reais, durante os cursos, e receber 3 moedas, que podem ser convertidas em conhecimento (novos cursos), acumular ou receber por criptomoeda.

# Execução do projeto:

## NPM:

- Instale o [Npm](https://www.npmjs.com/);
- Instale o [NodeJs](https://nodejs.org/en/);
- Clone o repositório;
- Acesse a pasta do projeto e execute o comando `npm i` para instalar todas às dependências
- Execute `npm start` para inicializar o server.

---

## DOCKER:

- Instale o docker [Docker](https://docs.docker.com/?_gl=1*1i2xyt5*_ga*NDQyNjY0Mjg5LjE2ODUwNTEzNzU.*_ga_XJWPQMJYHQ*MTY4NTA1MTM3NS4xLjEuMTY4NTA1MTM3NS42MC4wLjA.);
- Clone o repositório;
- Execute `docker compose up` para inicializar o server.

---

- Não utilizar yarn neste projeto para evitar conflitos com o npm;

- Antes de subir um commit, execute `npm run pre-commit` para garantir a formatação do projeto;

- Os comandos de script e as dependências do projeto se encontram na pasta `package.json`.

# EXECUÇÃO DOS TESTES

## Testes Automatizados

```bash
npm run test
```

## Testes Automatizados Verboso

```bash
npm run test:verbose
```

## Testes Unitários

```bash
npm run test:unit
```

## Cobertura de Integração

```bash
npm run test:integration
```

## Teste CI (rodar antes de realizar um pull no projeto)

```bash
npm run test:ci
```

## Cobertura de Testes

```
npm run test:coveralls
```

# ENDPOINT

## Descrição

Este endpoint salva o certificado para o estudante com o ID correspondente. As informações incluem `certificateId`, `studentId`, `studentEmail` e `activePlan`.

## URL

http://localhost:5050/api/certificate

## Método

`POST`

## Body

```JSON
{
  "studentId": "anyId",
  "studentEmail": "anyEmail@gmail.com",
  "activePlan": "true"
}
```

## Retorno

Status HTTP: 200 OK

```JSON
{
  "message": "Certificate created"
}
```
