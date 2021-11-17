const app = require('./app')

app.listen(8042,'0.0.0.0', () => {
    console.log(
        `⚡️[server]: Movie API is running at http://0.0.0.0:${8042}`
    );
});
