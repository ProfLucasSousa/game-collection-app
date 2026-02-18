# Configuração do Google Sheets para Reportar Erros

Este guia ensina como configurar uma planilha do Google Sheets para receber os erros reportados pelos usuários.

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie-a como "Game Collection - Error Reports"
4. Adicione os seguintes cabeçalhos na primeira linha (A1 até F1):
   - **A1:** Data/Hora
   - **B1:** Nome do Jogo
   - **C1:** ID do Jogo
   - **D1:** Tipos de Erro
   - **E1:** Descrição
   - **F1:** URL

## Passo 2: Criar o Apps Script

1. Na planilha, vá em **Extensions** > **Apps Script**
2. Apague o código padrão e cole o seguinte código:

```javascript
function doPost(e) {
  try {
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Acessar a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Adicionar nova linha com os dados
    sheet.appendRow([
      data.timestamp,
      data.gameName,
      data.gameId,
      data.errorTypes,
      data.description,
      data.url
    ]);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique em **Salvar** (ícone de disquete)
4. Nomeie o projeto como "Game Collection Webhook"

## Passo 3: Fazer Deploy

1. Clique em **Deploy** > **New deployment**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Select type"
3. Selecione **Web app**
4. Configure:
   - **Description:** "Webhook para receber erros reportados"
   - **Execute as:** Me (seu email)
   - **Who has access:** Anyone
5. Clique em **Deploy**
6. **Autorize o acesso** quando solicitado:
   - Clique em "Review permissions"
   - Selecione sua conta Google
   - Clique em "Advanced"
   - Clique em "Go to [nome do projeto] (unsafe)"
   - Clique em "Allow"
7. **Copie a URL do Web App** que aparecerá (algo como: `https://script.google.com/macros/s/AKfycby...`)

## Passo 4: Configurar no Projeto

1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione a URL copiada:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycby...sua_url_aqui
```

3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Testando

1. Acesse a página de detalhes de qualquer jogo
2. Clique em **"Reportar Erro"** no canto superior direito
3. Selecione um ou mais tipos de erro
4. Escreva uma descrição
5. Clique em **"Enviar Reporte"**
6. Verifique se uma nova linha apareceu na planilha do Google Sheets

## Estrutura dos Dados na Planilha

| Data/Hora | Nome do Jogo | ID do Jogo | Tipos de Erro | Descrição | URL |
|-----------|--------------|------------|---------------|-----------|-----|
| 17/02/2026 14:35:22 | The Witcher 3 | the-witcher-3 | Trailer incorreto, Link da loja quebrado | O trailer está em espanhol e o link da Steam não funciona | http://localhost:3000/game/the-witcher-3 |

**Nota:** A data e hora estão no fuso horário de Brasília (GMT-3), formato: DD/MM/YYYY HH:mm:ss

## Opcional: Formatação Automática

Para melhorar a visualização, você pode:

1. **Congelar a primeira linha:** View > Freeze > 1 row
2. **Ajustar largura das colunas:** Clique duas vezes entre os cabeçalhos das colunas
3. **Aplicar cores alternadas:** Format > Alternating colors

**Nota:** A coluna de data/hora já vem formatada como texto no padrão brasileiro (DD/MM/YYYY HH:mm:ss). Não é necessário formatá-la.

## Notificações (Opcional)

Para receber notificações por email quando houver novos reportes:

1. No Apps Script, adicione esta função:

```javascript
function sendEmailNotification(gameName, errorTypes, description) {
  const email = "seu-email@gmail.com"; // Substitua pelo seu email
  const subject = `Novo erro reportado: ${gameName}`;
  const body = `
    Jogo: ${gameName}
    Tipos de erro: ${errorTypes}
    Descrição: ${description}
  `;
  
  MailApp.sendEmail(email, subject, body);
}
```

2. Chame essa função dentro do `doPost`:

```javascript
// Antes do sheet.appendRow, adicione:
sendEmailNotification(data.gameName, data.errorTypes, data.description);
```

## Segurança

⚠️ **Importante:** O webhook está configurado como "Anyone" para permitir que o app envie dados. Isso é seguro porque:

- Apenas aceita requisições POST
- Os dados são validados antes de serem salvos
- Não expõe dados sensíveis da planilha

Se quiser mais segurança, você pode:
- Adicionar um token de autenticação no código
- Limitar por IP (se tiver um servidor fixo)
- Validar campos específicos antes de salvar

## Troubleshooting

**Erro: "Authorization required"**
- Execute novamente o processo de autorização no Apps Script

**Erro: "Script function not found: doPost"**
- Verifique se o código foi salvo corretamente
- Faça um novo deploy

**Dados não aparecem na planilha**
- Verifique se a URL no `.env.local` está correta
- Veja os logs no Apps Script: Executions
- Verifique o console do navegador (F12) para erros
