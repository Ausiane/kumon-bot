process.env.PUPPETEER_SKIP_DOWNLOAD = "true";

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "kumon-bot"
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

client.on('qr', qr => {
    console.log('QR CODE:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp autenticado ✅');
    console.log('BOT CONECTADO 🚀');
});

client.initialize();