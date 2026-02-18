# 🎮 Game Collection App

Uma aplicação moderna e elegante para gerenciar e visualizar sua coleção de jogos, desenvolvida com Next.js 14, React, TypeScript e Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🎨 **Interface Moderna**: Design responsivo e elegante com tema escuro
- 🏆 **Cabeçalho Destacado**: Título, descrição e badges das plataformas disponíveis
- ✨ **Seção de Destaques**: Jogos AAA e Clássicos Imperdíveis que mudam diariamente
- 🔍 **Busca Inteligente**: Pesquisa rápida por nome de jogo sem perder foco
- 🎯 **Filtros Avançados**: Filtre por plataforma, gênero, classificação (AAA/AA/Indie) e ano de lançamento
- 📅 **Filtro por Ano**: Navegue pela coleção por ano de lançamento com contadores
- 📱 **Mobile First**: Layout totalmente responsivo para desktop e mobile com sidebar recolhível
- ♾️ **Scroll Infinito**: Carregamento progressivo de jogos para melhor performance
- 🖼️ **Capas Locais**: 699 capas em alta qualidade baixadas via API IGDB
- 📄 **Páginas de Detalhes**: Informações completas de cada jogo com:
  - 🌐 Descrição traduzida automaticamente para português
  - ⭐ Reviews & Avaliações (RAWG e Metacritic)
  - 🎬 Trailers e vídeos de gameplay embutidos
  - 💻 Requisitos de sistema (mínimos e recomendados)
  - 🖼️ Screenshots em alta qualidade
  - 🏷️ Ícones visuais das plataformas
- 🐛 **Sistema de Reportar Erros**: Usuários podem reportar problemas que são salvos automaticamente em Google Sheets
- 🎬 **Links de Trailers**: Acesso direto aos trailers no YouTube
- 🛒 **Links de Lojas**: Redirecionamento para Steam, Epic, GOG, Xbox e outras plataformas
- 🎮 **Favicon Personalizado**: Ícone de gamepad no estilo do cabeçalho
- 📲 **Preview Social**: Imagem rica ao compartilhar links (Open Graph + Twitter Cards)
- ⚡ **Performance**: Otimizado com lazy loading, SSR e caching inteligente
- 🎭 **Animações Suaves**: Transições elegantes com Framer Motion
- 🌐 **639 Jogos**: Coleção completa com metadados e capas em alta qualidade

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework de CSS utilitário
- **Framer Motion** - Biblioteca de animações

### UI Components
- **Radix UI** - Componentes acessíveis e não-estilizados
  - Accordion (filtros recolhíveis)
  - Sheet (menu mobile)
  - Dialog (modais)
  - Select, Checkbox, Radio Group, etc.

### Ferramentas
- **Sharp** - Processamento de imagens
- **IGDB API** - Banco de dados de jogos
- **RAWG API** - Informações detalhadas, screenshots e vídeos
- **Google Translate API** - Tradução automática de descrições
- **Google Sheets** - Armazenamento de erros reportados (via webhook)
- **ESLint** - Linter para qualidade de código
- **pnpm** - Gerenciador de pacotes rápido

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: versão LTS)
- pnpm 8+ (ou npm/yarn)
- Git

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ProfLucasSousa/game-collection-app.git
cd game-collection-app
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
# Crie um arquivo .env.local na raiz do projeto
cp .env.local.example .env.local
```

Adicione suas chaves de API:

```env
# RAWG API (obrigatória para páginas de detalhes)
NEXT_PUBLIC_RAWG_API_KEY=sua_chave_rawg_aqui

# Google Sheets Webhook (opcional - para sistema de reportar erros)
GOOGLE_SHEETS_WEBHOOK_URL=sua_webhook_url_aqui
```

**Obter chave RAWG API:**
- Acesse [RAWG.io API](https://rawg.io/apidocs)
- Crie uma conta gratuita
- Gere sua chave de API

**Configurar Google Sheets (opcional):**
- Veja o guia completo em [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md)

4. **Execute o servidor de desenvolvimento**

```bash
pnpm dev
# ou
npm run dev
```

5. **Abra o navegador**
```
http://localhost:3000
```

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Cria build de produção
pnpm start        # Inicia servidor de produção
pnpm lint         # Executa linter
```

### Gerenciamento de Capas
```bash
pnpm download-covers    # Baixa capas da API IGDB para todos os jogos
pnpm check-covers       # Verifica quais jogos estão sem capas
pnpm create-placeholders # Cria placeholders para jogos sem capa
pnpm convert-covers     # Converte imagens WEBP/AVIF para JPG
pnpm rename-covers      # Renomeia capas para IDs corretos
pnpm convert-png        # Converte imagens PNG para JPG
```

## 📁 Estrutura do Projeto

```
game-collection-app/
├── app/                      # App Router do Next.js
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal com meta tags SEO
│   ├── page.tsx             # Página inicial
│   ├── icon.svg             # Ícone do app (favicon SVG)
│   ├── opengraph-image.tsx  # Imagem de preview social (Open Graph)
│   ├── api/                 # API Routes
│   │   ├── igdb-cover/
│   │   │   └── route.ts     # Endpoint para download de capas IGDB
│   │   ├── rawg/
│   │   │   └── route.ts     # Proxy RAWG API com traduções
│   │   └── report-error/
│   │       └── route.ts     # Endpoint para reportar erros
│   └── game/
│       └── [id]/
│           └── page.tsx     # Página dinâmica de detalhes do jogo
├── components/               # Componentes React
│   ├── ui/                  # Componentes UI (Radix)
│   │   ├── accordion.tsx   # Accordion (filtros recolhíveis)
│   │   ├── sheet.tsx       # Sheet (drawer mobile)
│   │   ├── dialog.tsx      # Dialog (modais)
│   │   └── ...             # Outros componentes Radix
│   ├── featured-games.tsx   # Seção de destaques (rotação diária)
│   ├── filter-bar.tsx       # Barra de filtros (sidebar + mobile)
│   ├── game-card.tsx        # Card de jogo com lazy loading
│   ├── game-detail-view.tsx # View completa de detalhes do jogo
│   ├── game-library.tsx     # Biblioteca principal com state
│   ├── game-modal.tsx       # Modal de preview rápido
│   ├── header.tsx           # Cabeçalho com plataformas
│   ├── platform-icons.tsx   # Ícones de plataformas (Next Image)
│   ├── report-error-dialog.tsx # Dialog para reportar erros
│   └── theme-provider.tsx   # Provedor de tema
├── data/
│   └── games.json           # Base de dados (639 jogos)
├── hooks/                   # Custom hooks
│   ├── use-mobile.tsx       # Hook para detecção mobile
│   └── use-toast.ts         # Hook para notificações
├── lib/                     # Utilitários
│   ├── games.ts            # Funções: parseGames, filterGames, getAllYears, etc.
│   ├── types.ts            # TypeScript interfaces (Game, GameRaw, etc.)
│   └── utils.ts            # Utilitários gerais (cn, etc.)
├── public/
│   ├── covers/             # Capas dos jogos (699 imagens JPG, 68MB)
│   ├── logos/              # Logos das plataformas (8 imagens)
│   └── favicon.svg         # Favicon principal (ícone de gamepad)
├── scripts/                # Scripts de automação Node.js
│   ├── check-missing-covers.js      # Verifica jogos sem capa
│   ├── convert-covers.js            # WEBP/AVIF → JPG
│   ├── convert-png-covers.js        # PNG → JPG com mapeamento
│   ├── create-placeholder-covers.js # Cria placeholders
│   ├── download-covers.js           # Baixa da IGDB com OAuth
│   └── rename-covers.js             # Renomeia para IDs corretos
├── styles/
│   └── globals.css         # Estilos globais adicionais
├── .env.local              # Variáveis de ambiente (não commitado)
├── .env.local.example      # Template de variáveis de ambiente
├── GOOGLE_SHEETS_SETUP.md  # Guia de configuração Google Sheets
├── SETUP_DETALHES.md       # Guia de implementação da página de detalhes
├── next.config.mjs         # Configuração do Next.js
├── tailwind.config.ts      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## 🗂️ Estrutura dos Dados

### Formato do games.json

```json
{
  "Name": "Nome do Jogo",
  "Description": "Descrição completa...",
  "ReleaseYear": 2024,
  "Genres": ["Action", "Adventure", "RPG"],
  "Source": "Steam" | ["Steam", "Epic"],
  "Classification": "AAA" | "AA" | "Indie",
  "TrailerYoutube": "https://www.youtube.com/watch?v=...",
  "StoreLinks": {
    "Steam": "https://store.steampowered.com/app/...",
    "Epic": "https://store.epicgames.com/...",
    "GOG": "https://www.gog.com/game/...",
    "Xbox PC": "https://www.xbox.com/...",
    "Xbox Console": "https://www.xbox.com/...",
    "Ubisoft": "https://store.ubi.com/...",
    "EA": "https://www.ea.com/...",
    "Amazon": "https://www.amazon.com/..."
  }
}
```

### Campos
- **Name** (string): Nome do jogo
- **Description** (string): Descrição/sinopse
- **ReleaseYear** (number): Ano de lançamento (ex: 2024)
- **Genres** (string[]): Array de gêneros
- **Source** (string | string[]): Plataforma(s) de origem
- **Classification** (string): "AAA", "AA" ou "Indie"
- **TrailerYoutube** (string, opcional): URL do trailer no YouTube
- **StoreLinks** (object, opcional): Objeto com links para lojas

### Plataformas Suportadas
- Steam, Epic, GOG, Xbox PC, Xbox Console, Ubisoft, EA, Amazon

### Gêneros Comuns
Action, Adventure, RPG, Strategy, Simulation, Sports, Racing, Fighting, Platformer, Puzzle, Horror, Shooter, etc.

## 🎯 Funcionalidades

### 🏠 Cabeçalho
- Logo animada do GameVault
- Título e descrição da coleção
- Contador total de jogos com animação
- Badges das 8 plataformas disponíveis:
  - Steam, Epic Games, Xbox, Xbox PC, GOG, Ubisoft, EA, Amazon
- Design responsivo com gradiente suave

### ✨ Seção de Destaques
- **Rotação Diária Automática**: Jogos em destaque mudam a cada dia às 00:00
- **Jogos AAA**: 6 jogos AAA selecionados aleatoriamente por dia
- **Clássicos Imperdíveis**: 6 jogos clássicos (lançados há mais de 3 anos)
- **Sem Duplicatas**: Algoritmo garante que não há jogos repetidos entre as seções
- **Ícones de Plataforma**: Exibição visual das plataformas disponíveis
- **Grid Responsivo**: Layout adaptável para desktop e mobile
- **Aparece Apenas na Home**: Seção oculta quando há filtros ou busca ativos

### 🔍 Sistema de Busca
- Pesquisa em tempo real por nome do jogo
- Busca também na descrição dos jogos
- Suporte a acentos e caracteres especiais
- Busca case-insensitive
- Input mantém foco durante digitação (sem perda de foco)
- Botão de limpar busca quando há texto

### 🎮 Filtros
- **Plataformas/Origem**: Steam, Epic Games, GOG, Xbox PC, Xbox Console, EA, Ubisoft, Amazon
- **Classificação**: AAA, AA, Indie (com badges coloridos)
- **Gêneros**: 50+ gêneros diferentes (Action, Adventure, RPG, Strategy, etc.)
- **Ano de Lançamento**: Filtro por ano com contadores (ordem decrescente)
- Filtros recolhíveis em Accordion (Classification, Genres, Years)
- Combinação múltipla de filtros
- Contadores dinâmicos de jogos por filtro
- Botão "Limpar filtros" quando há filtros ativos
- Sidebar fixa à esquerda no desktop
- Menu hamburger flutuante no mobile

### 📱 Interface Responsiva
- **Desktop**: Sidebar de filtros à esquerda (fixa), grid de 4-6 colunas
- **Mobile**: Botão flutuante com Sheet drawer, grid de 2-3 colunas
- Scroll infinito para carregamento progressivo (24 jogos por vez)
- Lazy loading de imagens (primeiros 24 com eager loading)
- SSR otimizado para evitar erros de hidratação

### 🎴 Cartões de Jogos
- Capas em alta resolução (264x352px)
- Badges de classificação coloridos (AAA/AA/Indie)
- Ano de lançamento em badge monoespaçado
- Ícones de plataformas
- Animações de hover suaves
- Modal com detalhes completos ao clicar

### 🎬 Modal de Detalhes (Preview Rápido)
- Capa em destaque no topo (aspect ratio video)
- Título, classificação e ano destacados
- Lista de plataformas com ícones
- Lista de gêneros em badges
- Descrição completa do jogo
- **Link para trailer no YouTube** com ícone animado
- **Links para comprar nas lojas** (Steam, Epic, GOG, Xbox, etc.) com ícones das plataformas
- **Botão "Ver Mais Detalhes"**: Acessa a página completa do jogo
- Animações suaves de entrada/saída
- Scroll vertical para conteúdo longo

### 📄 Página de Detalhes do Jogo
**Rota dinâmica**: `/game/[id]` - Páginas estáticas geradas no build

**Integração RAWG API**:
- Busca automática de dados complementares por nome do jogo
- **Tradução automática** de descrições para português (via Google Translate API)
- Screenshots em alta resolução
- Vídeos e trailers oficiais
- Requisitos de sistema (mínimos e recomendados)
- Fallback para dados locais se API não retornar resultados

**Layout da Página**:
- **Hero Image**: Imagem principal em tela cheia
- **Sidebar (1/4 largura)**:
  - Informações básicas: nome, ano, classificação
  - Gêneros em badges
  - Ícones de plataformas disponíveis
  - Links para compra/download nas lojas
  - Link para trailer no YouTube
- **Conteúdo Principal (3/4 largura)**:
  - **Descrição**: Texto completo traduzido automaticamente
  - **Reviews & Avaliações**: 
    - Pontuação RAWG (comunidade)
    - Pontuação Metacritic (crítica especializada)
    - Sistema de reportar erros
  - **Requisitos de Sistema**: 
    - Mínimos e recomendados lado a lado
    - Formatação clara de specs (CPU, GPU, RAM, Storage)
  - **Capturas de Tela**: Grid responsivo de screenshots oficiais
  - **Vídeos**: Player embarcado de trailers e gameplay

### 📊 Sistema de Reviews & Avaliações
- **Pontuação RAWG**: Rating da comunidade (0-5 estrelas), número de avaliações
- **Metacritic Score**: Nota da crítica especializada (0-100)
- **Indicador Visual**: Barras de progresso coloridas (verde para boas notas, amarelo/vermelho para baixas)
- **Sistema de Reportar Erros**:
  - Dialog modal para reportar problemas nos dados
  - Tipos de erro: Informações incorretas, capa errada, links quebrados, dados incompletos, outros
  - Seleção múltipla de categorias de erro
  - Campo de descrição livre
  - **Timestamp brasileiro**: Formato DD/MM/YYYY HH:mm:ss (fuso horário America/São_Paulo)
  - **Integração Google Sheets**: Dados enviados via webhook para planilha
  - Notificação toast de confirmação
  - Guia de configuração: [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md)

### 🔍 SEO e Meta Tags
- **Favicon**: Ícone de gamepad SVG no estilo do logo do cabeçalho
- **Open Graph**: Preview rico para Facebook, LinkedIn, WhatsApp, Discord
- **Twitter Cards**: Preview especial para Twitter/X com imagens grandes
- **Meta Tags**: Keywords, descriptions, canonical URLs, robots
- **Imagem de Preview Social**: Gerada dinamicamente (1200x630px) com:
  - Logo do GameVault com fundo roxo
  - Título com gradiente purple/blue
  - Descrição da coleção (600+ jogos)
  - Badges das 7 plataformas disponíveis
  - Fundo dark com gradiente elegante
- Preview funciona em todas as plataformas sociais ao compartilhar links

## � Integrações de API

### RAWG API
**O que faz**: Busca dados complementares de jogos (descrições, screenshots, vídeos, requisitos)

**Configuração**:
1. Obtenha uma chave grátis em [RAWG.io API](https://rawg.io/apidocs)
2. Adicione ao `.env.local`: `NEXT_PUBLIC_RAWG_API_KEY=sua_chave_aqui`
3. Limite: 20.000 requisições/mês (tier gratuito)

**Endpoints criados**:
- `GET /api/rawg?name=NomeDoJogo&type=details` - Detalhes do jogo
- `GET /api/rawg?name=NomeDoJogo&type=screenshots` - Screenshots
- `GET /api/rawg?name=NomeDoJogo&type=movies` - Trailers e vídeos

**Tradução automática**: Descrições em inglês são traduzidas para português automaticamente usando Google Translate API ([@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api))

### Google Sheets (Reportar Erros)
**O que faz**: Salva relatórios de erro dos usuários em uma planilha Google

**Configuração opcional**:
1. Veja o guia completo: [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md)
2. Adicione ao `.env.local`: `GOOGLE_SHEETS_WEBHOOK_URL=sua_webhook_url_aqui`
3. Se não configurado, erros são apenas logados no console

**Dados salvos**: Timestamp (BR), nome do jogo, ID, tipos de erro, descrição, URL da página

## 🔧 Configuração Avançada

### Adicionar Novos Jogos

1. Edite `data/games.json`:
```json
{
  "Name": "Nome do Jogo",
  "Description": "Descrição do jogo",
  "ReleaseYear": 2024,
  "Genres": ["Action", "Adventure"],
  "Source": "Steam",
  "Classification": "AAA"
}
```

2. Adicione a capa em `public/covers/` com o nome slugificado:
   - Exemplo: "The Witcher 3" → `the-witcher-3.jpg`

3. Ou use o script de download:
```bash
pnpm download-covers
```

### Personalizar Seção de Destaques

Edite `components/featured-games.tsx`:
- Altere número de jogos AAA/Clássicos (padrão: 6 cada)
- Modifique critério de "clássico" (padrão: 3+ anos de lançamento)
- Ajuste algoritmo de rotação (baseado em seed de data YYYYMMDD)
- Mude layout do grid (padrão: 3 colunas desktop, 2 mobile)

2. Adicione a capa em `public/covers/` com o nome slugificado:
   - Exemplo: "The Witcher 3" → `the-witcher-3.jpg`
   - Formato: JPG, 264x352px (ou maior mantendo proporção)

3. Ou use o script de download automático da IGDB:

```bash
pnpm download-covers
```

## 🎨 Temas e Cores

O aplicativo utiliza um tema escuro elegante baseado em purple/slate com:
- **Primária**: Purple (#8b5cf6) - Usado em botões, badges AAA e destaques
- **Secundária**: Blue (#3b82f6) - Badges AA e elementos secundários
- **Terciária**: Amber (#f59e0b) - Badges Indie
- **Background**: Dark slate (#0f172a) com gradientes suaves
- **Cards**: Background semi-transparente com backdrop-blur
- **Borders**: Bordas sutis com primary/20 opacity
- Suporte a modo claro/escuro via Tailwind (configurável)

## 🔧 Configuração Avançada

### Adicionar Novos Jogos

1. Edite `data/games.json`:
```json
{
  "Name": "Nome do Jogo",
  "Description": "Descrição do jogo",
  "ReleaseYear": 2024,
  "Genres": ["Action", "Adventure"],
  "Source": "Steam",
  "Classification": "AAA"
}
```

2. Adicione a capa em `public/covers/` com o nome slugificado:
   - Exemplo: "The Witcher 3" → `the-witcher-3.jpg`

3. Ou use o script de download:
```bash
pnpm download-covers
```

### Personalizar Filtros

Edite `components/filter-bar.tsx` para:
- Adicionar novos tipos de filtro
- Modificar layout dos filtros
- Ajustar comportamento dos acordeões (Accordion)
- Customizar contadores e badges
- Alterar posição da sidebar (esquerda/direita)
- Modificar breakpoints do mobile (lg:hidden)

**Nota**: O componente usa `React.memo` e `useEffect` p (padrão: 24)
- Ajuste classes Tailwind do grid para mudar colunas:
  - Desktop: `lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`
  - Mobile: `grid-cols-2 sm:grid-cols-3`
- Modifique lógica de scroll infinito
- Ajuste threshold do IntersectionObserver
- Personalize animações de entrada dos cards

**Otimizações implementadas**:
- Primeiros 24 jogos carregam com `loading="eager"`
- Restante usa `loading="lazy"` para economia de banda
- `useCallback` e `useMemo` para evitar re-renders
- Detecção automática se imagem já está carregada

Edite `components/game-library.tsx`:
- Altere `GAMES_PER_PAGE` para mudar quantidade inicial
- Ajuste classes Tailwind do grid para mudar colunas
- Modifique lógica de scroll infinito

## 📈 Performance

- **First Load JS**: ~250KB gzipped
- **Lazy Loading**: Imagens carregadas sob demanda (exceto primeiras 24)
- **Code Splitting**: Componentes divididos automaticamente pelo Next.js
- **Static Generation**: Páginas pré-renderizadas no build
- **SSR Otimizado**: Hidratação sem erros com mounted state
- **Image Optimization**: Next.js Image component com Sharp
- **Caching**: Cache de API e assets estáticos
- **React.memo**: Componentes memorizados para evitar re-renders
- **useCallback/useMemo**: Hooks otimizados para performance
- **Infinite Scroll**: Carregamento progressivo de 24 jogos por vez

## 🐛 Troubleshooting

### Erro de Hidratação (React Hydration Error)
**Problema**: IDs dinâmicos do Radix UI causam diferenças entre servidor e cliente.

**Solução**: O componente `FilterBar` usa um estado `mounted` que:
1. Renderiza apenas o skeleton no servidor
2. Monta os componentes Radix apenas no cliente
3. Evita discrepâncias de IDs entre SSR e cliente

### Input de Busca Perde o Foco
**Problema**: Re-renderizações causavam recriação do componente e perda de foco.

**Solução**: `FiltersContent` foi movido para fora do componente principal e envolvido em `React.memo` para evitar recriações desnecessárias.

### Imagens Não Carregam
Verifique:
1. Arquivos existem em `public/covers/`
2. Nomes seguem o padrão slugificado (lowercase, hífens)
3. Formato é JPG (não WEBP, PNG ou AVIF)
4. Use os scripts de conversão se necessário:
```bash
pnpm convert-covers    # WEBP/AVIF → JPG
pnpm convert-png       # PNG → JPG
```

### RAWG API não retorna dados
**Problema**: Página de detalhes não carrega informações complementares.

**Verificações**:
1. Confirme que `.env.local` tem `NEXT_PUBLIC_RAWG_API_KEY` configurado
2. Verifique se a chave é válida em [RAWG.io](https://rawg.io/apidocs)
3. Check console do navegador para erros de CORS ou rate limit
4. Teste diretamente: `/api/rawg?name=Cyberpunk 2077&type=details`

**Fallback**: Se RAWG não retornar dados, a página usa apenas informações do `games.json` local.

### Traduções não funcionam
**Problema**: Descrições permanecem em inglês.

**Causas comuns**:
1. Google Translate API pode estar bloqueado temporariamente
2. Rate limit atingido (muitas requisições em pouco tempo)
3. Conexão instável com servidores do Google

**Solução**: As descrições têm fallback automático para texto original em inglês se a tradução falhar.

### Relatórios de erro não salvam no Google Sheets
**Problema**: Webhook não recebe dados.

**Verificações**:
1. Confirme que `GOOGLE_SHEETS_WEBHOOK_URL` está configurado no `.env.local`
2. Teste o webhook diretamente com curl/Postman
3. Verifique permissões do Apps Script (deve aceitar requisições anônimas)
4. Veja logs no Apps Script: Extensions > Apps Script > Executions

**Fallback**: Se webhook não está configurado, erros são logados no console do servidor (terminal Next.js).

### Jogos em destaque não mudam
**Problema**: Mesmos jogos aparecem sempre na seção de destaques.

**Explicação**: Jogos mudam automaticamente à meia-noite (00:00) usando seed baseado na data (YYYYMMDD).

**Forçar atualização**: Aguarde até o próximo dia ou limpe cache do navegador e recarregue.

### Filtros Não Funcionam
1. Verifique o console para erros de TypeScript
2. Confirme que `games.json` tem os campos corretos:
   - `Name`, `Genres`, `Source`, `Classification`, `ReleaseYear`
3. Limpe cache do navegador e reinicie o servidor

### Performance Lenta
1. Reduza `GAMES_PER_PAGE` em `game-library.tsx`
2. Otimize imagens (comprima JPGs)
3. Verifique se está usando `pnpm dev` (modo desenvolvimento é mais lento)
4. Use `pnpm build` && `pnpm start` para testar em produção

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Prof. Lucas Sousa**
- GitHub: [@ProfLucasSousa](https://github.com/ProfLucasSousa)

## 🙏 Agradecimentos

- [IGDB](https://www.igdb.com/) - API de capas e dados de jogos
- [RAWG](https://rawg.io/) - API de detalhes, screenshots e vídeos
- [Google Translate API](https://www.npmjs.com/package/@vitalets/google-translate-api) - Traduções automáticas
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Lucide Icons](https://lucide.dev/) - Ícones
- [Sonner](https://sonner.emilkowal.ski/) - Notificações toast

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:
- Abra uma [issue](https://github.com/ProfLucasSousa/game-collection-app/issues)
- Entre em contato via GitHub

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
