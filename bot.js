const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-lourdes'
    }),

    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});