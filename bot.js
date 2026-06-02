const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-bot'
    }),

    puppeteer: {
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--no-zygote'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEBIDO, escaneie:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp autenticado ✅');
    console.log('BOT CONECTADO 🚀');
});

client.on('auth_failure', msg => {
    console.error('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Desconectado:', reason);
});

client.initialize();