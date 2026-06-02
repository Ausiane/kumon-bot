const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// captura erros reais
process.on('uncaughtException', (err) => {
    console.log('ERRO:', err);
});

process.on('unhandledRejection', (err) => {
    console.log('PROMISE ERROR:', err);
});

// CLIENT (FUNCIONA LOCAL + RENDER)
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-bot'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// QR CODE (primeira vez login)
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📲 Escaneie o QR Code');
});

// AUTENTICADO
client.on('authenticated', () => {
    console.log('WhatsApp autenticado ✅');
});

// PRONTO
client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

// ERRO AUTH
client.on('auth_failure', (msg) => {
    console.log('Falha autenticação:', msg);
});

// DESCONECTADO
client.on('disconnected', (reason) => {
    console.log('Desconectado:', reason);
});

// INICIA BOT
client.initialize();