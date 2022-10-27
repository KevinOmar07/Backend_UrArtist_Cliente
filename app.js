import express from 'express';

const app = express();

app.get('/', function (req, res) {
    res.send('Servicio del Cliente');
});

app.listen(8080);