const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'kumon-lourdes'
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