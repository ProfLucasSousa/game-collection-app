const fs = require('fs');
const path = require('path');
const https = require('https');

// Lê o arquivo .env.local manualmente
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    return {};
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return env;
}

const env = loadEnv();
const IGDB_CLIENT_ID = env.IGDB_CLIENT_ID;
const IGDB_CLIENT_SECRET = env.IGDB_CLIENT_SECRET;

const gamesPath = path.join(__dirname, '../data/games.json');
const coversDir = path.join(__dirname, '../public/covers');

// Cria o diretório de covers se não existir
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

// Função para slugify nome do jogo (igual ao código)
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Cache de token OAuth
let cachedToken = null;

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const url = `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`;
  
  return new Promise((resolve, reject) => {
    https.get(url, { method: 'POST' }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        cachedToken = {
          token: json.access_token,
          expiresAt: Date.now() + (json.expires_in - 300) * 1000
        };
        resolve(cachedToken.token);
      });
    }).on('error', reject);
  });
}

// Busca a capa do jogo na IGDB
async function fetchGameCover(gameName) {
  const token = await getAccessToken();
  
  const body = `search "${gameName}"; fields name, cover.image_id; limit 1;`;
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.igdb.com',
      path: '/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': IGDB_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const games = JSON.parse(data);
          if (games && games.length > 0 && games[0].cover?.image_id) {
            resolve(games[0].cover.image_id);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Faz download da imagem
async function downloadImage(imageId, outputPath) {
  const url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// Função principal
async function main() {
  if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
    console.error('❌ IGDB credentials not found in .env.local');
    process.exit(1);
  }

  console.log('📚 Carregando lista de jogos...');
  const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
  
  console.log(`🎮 Encontrados ${games.length} jogos`);
  console.log('🔍 Buscando capas na IGDB...\n');

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  const failedGames = [];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const slug = slugify(game.Name);
    const outputPath = path.join(coversDir, `${slug}.jpg`);

    // Pula se já existe
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  [${i + 1}/${games.length}] Já existe: ${game.Name}`);
      skipped++;
      continue;
    }

    try {
      console.log(`🔎 [${i + 1}/${games.length}] Buscando: ${game.Name}`);
      const imageId = await fetchGameCover(game.Name);
      
      if (imageId) {
        await downloadImage(imageId, outputPath);
        console.log(`✅ [${i + 1}/${games.length}] Baixado: ${game.Name}`);
        downloaded++;
      } else {
        console.log(`❌ [${i + 1}/${games.length}] Não encontrado: ${game.Name}`);
        failedGames.push({ name: game.Name, reason: 'Não encontrado na IGDB' });
        failed++;
      }
      
      // Delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 250));
    } catch (error) {
      console.error(`❌ [${i + 1}/${games.length}] Erro: ${game.Name} - ${error.message}`);
      failedGames.push({ name: game.Name, reason: error.message });
      failed++;
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Baixadas: ${downloaded}`);
  console.log(`⏭️  Já existiam: ${skipped}`);
  console.log(`❌ Falhas: ${failed}`);
  console.log(`📁 Total de capas: ${downloaded + skipped}`);
  
  if (failedGames.length > 0) {
    console.log('\n❌ Jogos que falharam:');
    console.log('================================');
    failedGames.forEach((game, index) => {
      console.log(`${index + 1}. ${game.name}`);
      console.log(`   Motivo: ${game.reason}`);
    });
    
    // Salva a lista de falhas em um arquivo
    const failedPath = path.join(__dirname, '../failed-covers.json');
    fs.writeFileSync(failedPath, JSON.stringify(failedGames, null, 2));
    console.log(`\n📝 Lista completa salva em: failed-covers.json`);
  }
}

main().catch(console.error);
