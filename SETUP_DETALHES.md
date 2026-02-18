# Configuração da API RAWG

## Passo 1: Obter a chave da API

1. Acesse [RAWG.io API](https://rawg.io/apidocs)
2. Crie uma conta gratuita
3. Gere sua chave de API

## Passo 2: Configurar no projeto

1. Abra o arquivo `.env.local` na raiz do projeto
2. Cole sua chave da API:

```env
NEXT_PUBLIC_RAWG_API_KEY=sua_chave_aqui
```

## Passo 3: Executar o projeto

```bash
npm run dev
```

## O que foi criado

### 📄 Página de Detalhes do Jogo (`/game/[id]`)

Cada jogo agora tem sua própria página com:

- **Capa grande** - Imagem de fundo do jogo
- **Descrição completa em português** - Texto detalhado sobre o jogo
- **Informações básicas**:
  - Gêneros
  - Plataformas
  - Ano de lançamento
  - Classificação (AAA/AA/Indie)
  - Avaliação (nota de 0-5)
  - Metacritic score
  - Desenvolvedora
  - Publicadora

### 📺 Seções de Conteúdo

As seções estão organizadas verticalmente (uma embaixo da outra):

1. **Descrição** - Descrição completa do jogo em português (traduzida automaticamente da RAWG)
2. **Reviews & Avaliações** - Notas do RAWG e Metacritic com visualização destacada
3. **Mídia** - Trailers do YouTube e vídeos de gameplay
4. **Requisitos do Sistema** - Requisitos mínimos e recomendados para PC
5. **Screenshots** - Capturas de tela do jogo

### 🛠️ Funcionalidades Adicionais

- **Ícones de Plataformas** - As plataformas na sidebar usam ícones visuais (Steam, Epic, GOG, etc.)
- **Reportar Erros** - Botão no canto superior direito para reportar problemas:
  - Trailer incorreto ou ausente
  - Descrição incorreta
  - Imagens/Screenshots incorretas
  - Link da loja quebrado
  - Requisitos incorretos
  - Outros problemas
- **Integração com Google Sheets** - Erros reportados são salvos automaticamente em uma planilha (veja [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md))

### 🔗 Integração com APIs

- **RAWG API** - Para screenshots, trailers, requisitos de sistema e informações adicionais
- **Google Translate** - Tradução automática das descrições da RAWG do inglês para português
- Os dados são buscados dinamicamente quando você abre a página de um jogo
- As descrições são traduzidas automaticamente em tempo real

### 🎯 Como usar

1. Clique em qualquer card de jogo na biblioteca
2. Um **modal** será aberto com informações básicas
3. Clique no botão **"Ver Mais Detalhes"** no final do modal
4. Você será redirecionado para a página completa de detalhes
5. Role para baixo para ver todas as seções: descrição, mídia, requisitos e screenshots
6. Use o botão "Voltar para a biblioteca" para retornar

## Estrutura de arquivos criados

```text
app/
  ├── api/
  │   └── rawg/
  │       └── route.ts          # API route para integração com RAWG
  └── game/
      └── [id]/
          └── page.tsx           # Página dinâmica de detalhes

components/
  ├── game-detail-view.tsx       # Componente principal de visualização
  └── game-modal.tsx             # Modal com botão para detalhes

.env.local                       # Suas chaves de API (não commitado)
.env.local.example              # Exemplo de configuração
```

## Notas importantes

- A API RAWG tem limite de **20.000 requisições por mês** no plano gratuito
- Os dados são carregados dinamicamente (não armazenados localmente)
- Alguns jogos podem não ter todas as informações disponíveis
- Screenshots e vídeos dependem da disponibilidade na RAWG
- **As descrições da RAWG são traduzidas automaticamente** do inglês para português usando Google Translate
- Se a tradução falhar ou a RAWG não tiver descrição, será usada a descrição do arquivo `games.json`
