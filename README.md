# 🎓 TCC — Engenharia de Qualidade de Software (EBAC)

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-EA5906?style=for-the-badge&logo=webdriverio&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-EE376D?style=for-the-badge&logo=appium&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-FF6F61?style=for-the-badge&logo=qameta&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Sauce Labs](https://img.shields.io/badge/Sauce_Labs-E2231A?style=for-the-badge&logo=saucelabs&logoColor=white)

> Trabalho de conclusão de curso em **Quality Assurance**: testes de **UI**, **mobile**, **API** (com testes de contrato) e **performance**, cobrindo a Loja EBAC Shop (web e mobile) e o Hub de Leitura Integrado.

---

## 📑 Sumário

- [Branches](#-branches)
- [Objetivos](#-objetivos)
- [O que será testado](#-o-que-será-testado)
- [Stacks utilizadas](#-stacks-utilizadas)
- [Como executar](#-como-executar)

---

## 🌿 Branches

| Branch | Função |
|---|---|
| `main` | Suítes de testes e relatórios gerados localmente |
| `reports` | Relatórios gerados via workflow |

## 🎯 Objetivos

Aplicar todo o conhecimento adquirido durante o curso de Engenharia de Qualidade de Software nas aplicações:

- **Loja EBAC Shop**, nas versões web e mobile
- **Hub de Leitura Integrado**

## 🧪 O que será testado

### 🖥️ Testes de UI

Fluxos padrão e alternativos das principais funcionalidades do sistema:

- Login
- Carrinho de compras
- Cupom
- Perfil de usuário
- Cadastro de usuário
- Checkout

> Um arquivo `docker-compose.yml` é necessário para subir o servidor local, que fica exposto em `http://localhost:80`.

### 📱 Testes Mobile

Utilizam a **Sauce Labs** como ambiente de execução e como repositório do aplicativo. O ambiente pode ser trocado com facilidade alterando alguns parâmetros no workflow (`ENVIRONMENT`).

### 🔌 Testes de API

Por se tratar de outra plataforma, os testes de API não replicam os fluxos de UI. Eles cobrem funcionalidades como:

- Login
- Carrinho de compras
- Perfil de usuário
- Cadastro de usuário
- Checkout

Além das requisições, são executados **testes de contrato**, localizados em `./suites/API/schema/`.

> Um `Dockerfile` é necessário para subir o servidor local, que fica na porta `http://localhost:3000`.

### ⚡ Testes de Performance

Foi realizado um **Load Test** na mesma plataforma usada nos testes de API, avaliando apenas:

- Login
- Carrinho

**Parâmetros utilizados**

| Parâmetro | Valor |
|---|---|
| Usuários virtuais (VUs) | 20 |
| Ramp-up | 20 segundos |
| Duração | 2 minutos |

## 🛠️ Stacks utilizadas

| Tipo de teste | Stack |
|---|---|
| UI | Cypress + mochawesome reporter + Cucumber |
| Mobile | WebdriverIO + Allure reporter + Cucumber + Appium |
| API | Jest + Supertest + Joi + v8 |
| Performance | k6 |

## ▶️ Como executar

### 🖥️ Testes web

**1. Buildar o container e subir o servidor**

```bash
docker compose up -d --build
```

**2. Executar os testes Cypress**

```bash
npm run test:ui
```

Os relatórios ficam em `./suites/reports/UI/mochawesome-reporter`.

### 📱 Testes mobile

**1. Iniciar o Appium** (em um terminal separado)

```bash
appium
```

**2. Executar os testes**

```bash
npm run test:mobile
```

### 🔌 Testes de API

**1. Subir a plataforma Hub de Leitura Integrado** (em um terminal separado)

```bash
cd hub-de-leitura-integrado
npm install
npm run start
```

**2. Executar os testes**

```bash
npm run test:api
```

### ⚡ Teste de carga

Usa o mesmo servidor local dos testes de API.

**Execução com relatório no k6 Cloud**

1. Faça login no k6 Cloud:

```bash
k6 cloud login --token <YOUR_K6_API_TOKEN> --stack <YOUR_STACK_URL_OR_SLUG>
```

2. Execute os cenários (e-mail e senha da plataforma já estão armazenados no k6 Cloud):

```bash
npm run k6:login
npm run k6:carrinho
```

**Execução local (sem k6 Cloud)**

```bash
npm run k6:perf
```

> 🔒 Nunca versione seu token do k6 Cloud nem outras credenciais no repositório.

---

<p align="center">Feito por <a href="https://github.com/ccaiolsa">Caio Araújo</a> • <a href="https://www.linkedin.com/in/ccaiolsa-qa">LinkedIn</a></p>
