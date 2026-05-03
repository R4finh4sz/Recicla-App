# 📱 Recicla App — Mobile

> Aplicativo mobile do projeto **Recicla Online**, desenvolvido com [Expo](https://expo.dev/) e React Native. Interface principal do munícipe para autenticação, acompanhamento de eco-coins, reciclagem e gestão de perfil.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Segurança no Cliente](#segurança-no-cliente)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Equipe](#equipe)

---

## Sobre o Projeto

O **Recicla App** é a interface mobile do sistema Recicla Online, permitindo que munícipes realizem cadastro, login com autenticação em dois fatores, acompanhem seu saldo de eco-coins (moeda de recompensa por reciclagem), visualizem o histórico de transações e gerenciem seu perfil.

Este repositório é parte do Projeto Integrador de Segurança da Informação do curso de Bacharelado em Engenharia de Software da Universidade de Mogi das Cruzes (UMC).

---

## Tecnologias

| Tecnologia | Finalidade |
|---|---|
| Expo / React Native | Framework mobile multiplataforma |
| Expo Router | Navegação baseada em sistema de arquivos |
| TypeScript | Tipagem estática |
| NativeWind + TailwindCSS | Estilização |
| TanStack Query | Cache e gerenciamento de estado assíncrono |
| Zustand | Gerenciamento de estado global |
| React Hook Form + Zod | Formulários e validação |
| Axios | Cliente HTTP |
| Expo Secure Store | Armazenamento seguro do token JWT |
| date-fns | Manipulação de datas |
| lucide-react-native | Ícones |

---

## Funcionalidades

- Cadastro de munícipe em múltiplas etapas (6 steps) com validação de CPF, consulta automática de endereço por CEP (ViaCEP) e aceite de termos de uso
- Login com e-mail e senha
- Autenticação em dois fatores (2FA) via código enviado por e-mail
- Recuperação de senha em 3 etapas: solicitação de código, validação e redefinição
- Dashboard com saldo de eco-coins, transações recentes e carrossel de trocas disponíveis
- Loja para resgate de eco-coins
- Perfil com edição de dados pessoais e foto
- Notificações e preferências de notificação
- Logout seguro com invalidação do token no backend

---

## Arquitetura

O app utiliza o Expo Router com roteamento baseado em sistema de arquivos, separando as rotas em dois grupos:

```
src/app/
├── index.tsx              # Entrada da aplicação
├── _layout.tsx            # Layout raiz com providers globais
├── (auth)/                # Rotas não autenticadas
│   ├── Intro/             # Tela de introdução
│   ├── login/             # Login
│   ├── Signup/            # Cadastro multi-step
│   └── forgotpassword/    # Recuperação de senha
└── (main)/                # Rotas autenticadas
    ├── home/              # Dashboard principal
    ├── shop/              # Loja de eco-coins
    ├── profile/           # Perfil e dados pessoais
    └── notifications/     # Notificações
```

### Camadas da Aplicação

```
src/
├── app/           # Rotas e telas (Expo Router)
├── components/    # Componentes reutilizáveis
│   ├── ui/        # Componentes base (Button, Input, Modal, etc.)
│   └── Screens/   # Componentes específicos de cada tela
├── services/      # Comunicação com a API
│   ├── http.ts    # Instância Axios com interceptors de segurança
│   └── api/       # Serviços por domínio (auth, cep)
├── contexts/      # Contextos React (AuthContext)
├── hooks/         # Hooks customizados
├── store/         # Estado global (Zustand)
├── validation/    # Schemas Zod de validação
├── types/         # Tipagens TypeScript
├── utils/         # Funções utilitárias (formatação, validação de CPF)
├── constants/     # Constantes e query keys
└── global/        # Tokens de design (cores, fontes, sombras)
```

---

## Segurança no Cliente

### Armazenamento Seguro do Token

O JWT de autenticação é armazenado exclusivamente via **Expo Secure Store**, que utiliza o Keychain no iOS e o Keystore no Android, sem uso de AsyncStorage ou qualquer armazenamento não criptografado.

### Mascaramento de Dados Sensíveis nos Logs

O interceptor HTTP mascara automaticamente campos como `password` e `token` antes de imprimir nos logs de desenvolvimento, substituindo os valores por `********`.

### Validação Client-Side com Zod

Todos os formulários possuem validação antes de enviar requisições à API, incluindo políticas de senha forte e validação de CPF.

### Fluxo de Autenticação 2FA

```
Login com e-mail e senha
         ↓
  Recebe challengeId
         ↓
  Modal de código OTP (6 dígitos enviados por e-mail)
         ↓
  Backend valida código e emite JWT
         ↓
  Token salvo no Secure Store
         ↓
  Redirecionamento para área autenticada
```

---

## Pré-requisitos

- Node.js >= 18.x
- npm >= 8.x ou Yarn
- Expo Go instalado no dispositivo físico, ou emulador Android/iOS configurado

---

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd Recicla-App

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com a URL da API

# 4. Inicie o servidor de desenvolvimento
npx expo start

# Pressione 'a' para abrir no emulador Android
# Pressione 'i' para abrir no simulador iOS (somente macOS)
# Escaneie o QR Code com o app Expo Go no dispositivo físico
```

### Build para Produção (EAS Build)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login na conta Expo
eas login

# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL base da API backend
EXPO_PUBLIC_API_URL=https://reciclaonline.com.br/api
```

> Variáveis prefixadas com `EXPO_PUBLIC_` ficam visíveis no bundle do app. Nunca inclua chaves secretas aqui.

---

## Estrutura de Pastas

```
Recicla-App/
├── @types/                      # Declarações de tipos globais
├── assets/
│   ├── images/                  # Imagens da aplicação
│   └── icons/                   # Ícones customizados
├── src/
│   ├── app/                     # Rotas e telas (Expo Router)
│   │   ├── (auth)/              # Telas não autenticadas
│   │   └── (main)/              # Telas autenticadas
│   ├── components/
│   │   ├── ui/                  # Componentes base reutilizáveis
│   │   └── Screens/             # Componentes específicos de tela
│   ├── contexts/                # AuthContext e outros providers
│   ├── hooks/                   # Hooks customizados
│   ├── services/                # Cliente HTTP e serviços de API
│   ├── store/                   # Estado global com Zustand
│   ├── types/                   # Tipos TypeScript
│   ├── utils/                   # Funções utilitárias
│   ├── validation/              # Schemas Zod de validação
│   ├── constants/               # Query keys e constantes
│   └── global/                  # Tokens de design (cores, fontes, sombras)
├── app.json                     # Configuração do Expo
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Equipe

| Nome | RGM |
|---|---|
| Gustavo Di Risio | 11231101211 |
| Graziela Pereira de Oliveira | 11231103878 |
| Rayane da Luz Barbosa | 11221103247 |
| Rafael Souza Santana | 11231100972 |

**Disciplina:** Segurança da Informação — Bacharelado em Engenharia de Software
**Instituição:** Universidade de Mogi das Cruzes (UMC)
**Professor:** Fabiano Menegidio

---

> Backend: [RECICLA_BACKEND](https://github.com/R4finh4sz/RECICLA_BACKEND) | Produção: [reciclaonline.com.br](https://reciclaonline.com.br)
