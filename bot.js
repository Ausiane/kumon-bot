const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Captura erros (IMPORTANTE no Render)
process.on('uncaughtException', (err) => {
    console.log('ERRO NÃO CAPTURADO:', err);
});

process.on('unhandledRejection', (err) => {
    console.log('PROMISE ERROR:', err);
});

// CLIENT CONFIGURADO PARA SERVIDOR (Render / Cloud)
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
    console.log('📲 Escaneie o QR Code com o WhatsApp');
});

// AUTENTICADO
client.on('authenticated', () => {
    console.log('WhatsApp autenticado ✅');
});

// BOT PRONTO
client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

// ERRO DE AUTENTICAÇÃO
client.on('auth_failure', (msg) => {
    console.log('Falha na autenticação:', msg);
});

// DESCONEXÃO
client.on('disconnected', (reason) => {
    console.log('Desconectado:', reason);
});

client.initialize();