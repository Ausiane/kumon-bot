const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-lourdes'
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

client.on('qr', (qr) => {
    console.log('QR Code recebido (Render)');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('WhatsApp autenticado ✅');
});

client.on('ready', () => {
    console.log('BOT CONECTADO 🚀');
});

client.on('auth_failure', (msg) => {
    console.error('Falha na autenticação:', msg);
});

client.on('disconnected', (reason) => {
    console.error('Desconectado:', reason);
});

client.initialize()
    .then(() => {
        console.log('Inicialização iniciada...');
    })
    .catch((err) => {
        console.error('Erro ao iniciar client:', err);
    });