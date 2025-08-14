# Bloco de Notas

## 📝 Descrição

O objetivo principal é criar uma página capaz de listar mensagens de texto salvas em um banco de dados **Firestore**, com funcionalidades modernas de interface como lazy loading (carregamento infinito) e atualização otimista da UI.

## ✨ Funcionalidades

- **Listagem de Notas:** Exibe mensagens persistidas no banco de dados em ordem cronológica.
- **Envio de Novas Notas:** Permite ao usuário enviar novas mensagens que são salvas no banco de dados.
- **Lazy Loading (Carregamento Infinito):**
  - Carrega as 10 últimas mensagens salvas no primeiro acesso.
  - Carrega mais 10 mensagens ao rolar a tela para o topo.
  - O carregamento é interrompido ao atingir o limite de 100 mensagens.
  - Exibe um indicador de "Carregando..." durante as buscas por mais mensagens.
- **Interface Otimista:** A nova mensagem enviada aparece na tela instantaneamente para uma melhor experiência do usuário.

## 📂 Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- **/frontend:** Contém a aplicação Vue.js responsável pela interface do usuário.
- **/server:** Contém a API Node.js/Fastify responsável pela lógica de negócio e comunicação com o banco de dados.

## 🛠️ Tecnologias Utilizadas

#### **Backend (Pasta `/server`)**
- **Node.js**
- **Fastify:** Framework web performático.
- **Firestore (Google Cloud):** Banco de dados NoSQL.
- **@fastify/cors:** Plugin para lidar com Cross-Origin Resource Sharing (CORS).
- **dotenv:** Para gerenciamento de variáveis de ambiente.

#### **Frontend (Pasta `/frontend`)**
- **Vue.js 3:** Framework progressivo para construção de interfaces.
- **Axios:** Cliente HTTP para comunicação com a API.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- Uma conta no **Google Cloud** com um projeto e um banco de dados **Firestore** ativos.
- O arquivo de credenciais de serviço (JSON) do seu projeto Firestore.

### 1. Clone o Repositório
```bash
git clone <url-do-seu-repositorio>
cd <pasta-do-projeto>