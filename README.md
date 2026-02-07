# 🎮 Game Collection App

Uma aplicação moderna e elegante para gerenciar e visualizar sua coleção de jogos, desenvolvida com Next.js 14, React, TypeScript e Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🎨 **Interface Moderna**: Design responsivo e elegante com tema escuro
- 🔍 **Busca Inteligente**: Pesquisa rápida por nome de jogo
- 🎯 **Filtros Avançados**: Filtre por plataforma, gênero e classificação (AAA/AA/Indie)
- 📱 **Mobile First**: Layout totalmente responsivo para desktop e mobile
- ♾️ **Scroll Infinito**: Carregamento progressivo de jogos para melhor performance
- 🖼️ **Capas Locais**: Integração com API IGDB para download automático de capas
- ⚡ **Performance**: Otimizado com lazy loading e caching inteligente
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

3. **Configure as variáveis de ambiente** (opcional - apenas se for usar a API IGDB)
```bash
# Crie um arquivo .env.local na raiz do projeto
cp .env.example .env.local
```

Adicione suas credenciais da IGDB:
```env
IGDB_CLIENT_ID=seu_client_id
IGDB_CLIENT_SECRET=seu_client_secret
```

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
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/               # Componentes React
│   ├── ui/                  # Componentes UI (Radix)
│   ├── filter-bar.tsx       # Barra de filtros
│   ├── game-card.tsx        # Card de jogo
│   ├── game-library.tsx     # Biblioteca principal
│   ├── game-modal.tsx       # Modal de detalhes
│   ├── header.tsx           # Cabeçalho
│   ├── platform-icons.tsx   # Ícones de plataformas
│   └── theme-provider.tsx   # Provedor de tema
├── data/
│   └── games.json           # Base de dados de jogos
├── hooks/                   # Custom hooks
│   ├── use-mobile.tsx       # Hook para detecção mobile
│   └── use-toast.ts         # Hook para notificações
├── lib/                     # Utilitários
│   ├── games.ts            # Funções de manipulação de jogos
│   ├── types.ts            # Definições de tipos
│   └── utils.ts            # Utilitários gerais
├── public/
│   ├── covers/             # Capas dos jogos (699 imagens)
│   └── logos/              # Logos das plataformas
├── scripts/                # Scripts de automação
│   ├── check-missing-covers.js
│   ├── convert-covers.js
│   ├── convert-png-covers.js
│   ├── create-placeholder-covers.js
│   ├── download-covers.js
│   └── rename-covers.js
└── styles/
    └── globals.css         # Estilos globais adicionais
```

## 🎯 Funcionalidades

### 🔍 Sistema de Busca
- Pesquisa em tempo real por nome do jogo
- Suporte a acentos e caracteres especiais
- Busca case-insensitive

### 🎮 Filtros
- **Plataformas**: Steam, Epic Games, GOG, Xbox, PlayStation, EA, Ubisoft, Amazon
- **Classificação**: AAA, AA, Indie
- **Gêneros**: 50+ gêneros diferentes (Action, Adventure, RPG, Strategy, etc.)
- Combinação múltipla de filtros
- Contadores dinâmicos de jogos por filtro

### 📱 Interface Responsiva
- **Desktop**: Sidebar de filtros à esquerda, grid de 4-6 colunas
- **Mobile**: Botão flutuante com menu hamburger, grid de 2-3 colunas
- Scroll infinito para carregamento progressivo
- Lazy loading de imagens

### 🎴 Cartões de Jogos
- Capas em alta resolução (264x352px)
- Badges de classificação (AAA/AA/Indie)
- Ícones de plataformas
- Animações de hover
- Modal com detalhes completos

### 📊 Estatísticas
- Contador de jogos filtrados vs total
- Indicador de filtros ativos
- Feedback visual de carregamento

## 🎨 Temas e Cores

O aplicativo utiliza um tema escuro elegante com:
- **Primária**: Purple (#8b5cf6)
- **Secundária**: Blue (#3b82f6)
- **Terciária**: Amber (#f59e0b)
- **Background**: Dark slate
- Suporte a modo claro/escuro (configurável)

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
- Ajustar comportamento dos acordeões

### Modificar Grid de Jogos

Edite `components/game-library.tsx`:
- Altere `GAMES_PER_PAGE` para mudar quantidade inicial
- Ajuste classes Tailwind do grid para mudar colunas
- Modifique lógica de scroll infinito

## 📈 Performance

- **First Load JS**: ~250KB gzipped
- **Lazy Loading**: Imagens carregadas sob demanda
- **Code Splitting**: Componentes divididos automaticamente
- **Static Generation**: Páginas pré-renderizadas
- **Image Optimization**: Next.js Image component
- **Caching**: Cache de API e assets

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

- [IGDB](https://www.igdb.com/) - API de dados de jogos
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Lucide Icons](https://lucide.dev/) - Ícones

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:
- Abra uma [issue](https://github.com/ProfLucasSousa/game-collection-app/issues)
- Entre em contato via GitHub

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
