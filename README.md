# API Node SOLID

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-5.6.0-black?logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.16.1-2D3748?logo=prisma&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?logo=vitest&logoColor=white)

![Build](https://img.shields.io/badge/Build-Passing-brightgreen?logo=github-actions&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-9%20passed-brightgreen?logo=vitest&logoColor=white)
![Coverage](https://img.shields.io/badge/Coverage-59.88%25-orange?logo=vitest&logoColor=white)
![Code Quality](https://img.shields.io/badge/Code%20Quality-A-brightgreen?logo=biome&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-blue?logo=opensourceinitiative&logoColor=white)
</div>

🚧 **Projeto em Desenvolvimento** 🚧

Uma API REST construída com Node.js, TypeScript e Fastify seguindo os princípios SOLID e Clean Architecture. Este projeto implementa um sistema de gerenciamento de academia com funcionalidades de autenticação de usuários e check-ins.

## 🚀 Tecnologias

### Core

- **Node.js** (22.x) - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para TypeScript

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional

### Autenticação & Segurança

- **Argon2** - Hash de senhas seguro

### Validação

- **Zod** - Validação de schemas TypeScript-first

### Desenvolvimento & Testes

- **Vitest** - Framework de testes rápido
- **Biome** - Linter e formatter
- **tsx** - Execução de TypeScript
- **tsup** - Bundler para TypeScript

## 📋 Funcionalidades Implementadas

### Autenticação

- ✅ Registro de usuários
- ✅ Autenticação com email/senha
- ✅ Perfil do usuário

### Check-ins

- ✅ Criação de check-ins em academias
- 🚧 Validação de check-ins (em desenvolvimento)

## 🏗️ Arquitetura

O projeto segue os princípios **SOLID** e **Clean Architecture**:

### Estrutura de Pastas

```
src/
├── app.ts                          # Configuração do Fastify
├── server.ts                       # Servidor HTTP
├── config/
│   └── env.ts                      # Configurações de ambiente
├── http/
│   ├── routes.ts                   # Definição de rotas
│   └── controllers/                # Controllers HTTP
├── use-cases/                      # Casos de uso (regras de negócio)
│   ├── factories/                  # Factories para injeção de dependência
│   └── erros/                      # Erros customizados
├── repositories/                   # Interfaces e implementações de repositórios
│   ├── prisma/                     # Implementação com Prisma
│   └── in-memory/                  # Implementação em memória (testes)
└── lib/                           # Utilitários e bibliotecas
```

### Camadas da Aplicação

1. **HTTP Layer** - Controllers e rotas
2. **Use Cases** - Regras de negócio
3. **Repository Layer** - Acesso a dados
4. **Database Layer** - Prisma + PostgreSQL

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor em modo desenvolvimento

# Build e Produção
npm run build        # Compila o projeto
npm start           # Inicia servidor em produção

# Qualidade de Código
npm run lint        # Executa linter
npm run lint:fix    # Corrige problemas automaticamente

# Testes
npm test            # Executa todos os testes
npm run test:watch  # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura
npm run test:ui     # Interface visual para testes
```

## 🗄️ Modelo de Dados

### User (Usuário)

- `id` - UUID único
- `name` - Nome do usuário
- `email` - Email único
- `password_hash` - Senha criptografada
- `created_at` - Data de criação

### CheckIn

- `id` - UUID único
- `user_id` - Referência ao usuário
- `gym_id` - Referência à academia
- `created_at` - Data do check-in
- `validated_at` - Data de validação (opcional)

### Gym (Academia)

- `id` - UUID único
- `title` - Nome da academia
- `description` - Descrição (opcional)
- `phone` - Telefone (opcional)
- `latitude` - Coordenada de latitude
- `longitude` - Coordenada de longitude

## 🧪 Testes

O projeto utiliza **Vitest** com estratégia de testes unitários:

- **Use Cases**: Testados com repositórios em memória
- **Repositories**: Implementações específicas para testes
- **Coverage**: Relatórios de cobertura disponíveis

Executar testes:

```bash
npm test                 # Todos os testes
npm run test:watch       # Modo watch
npm run test:coverage    # Com cobertura
npm run test:badges      # Roda testes + atualiza badges
npm run update-badges    # Atualiza apenas os badges
```

### Badges Dinâmicos

Os badges de coverage e testes são atualizados automaticamente:

- **Localmente**: Execute `npm run test:badges` para atualizar
- **CI/CD**: Os badges são atualizados automaticamente no GitHub Actions
- **Coverage real**: Baseado nos resultados do Vitest (atualmente 50.17%)

## 🔧 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3333
DATABASE_URL="postgresql://user:password@localhost:5432/api-node-solid"
```

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 22.x ou superior
- PostgreSQL
- npm ou yarn

### Passos

1. Clone o repositório
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente
4. Execute as migrações do banco:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

## 📝 Padrões de Código

- **ESLint/Biome** para linting
- **Prettier/Biome** para formatação
- **Conventional Commits** para mensagens de commit
- **TypeScript strict mode** habilitado
- **Path mapping** com `@/` para imports absolutos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
