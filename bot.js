const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-lourdes'
    }),
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        headless: false
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code com o WhatsApp');
});

client.on('authenticated', () => {
    console.log('WhatsApp autenticado ✅');
});

client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

client.on('auth_failure', (msg) => {
    console.log('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Desconectado:', reason);
});

client.initialize();