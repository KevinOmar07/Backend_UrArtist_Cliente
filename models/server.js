import express from 'express';
import cors from 'cors';
import cliente from '../routes/cliente.routes.js'
import auth from '../routes/auth.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.clientePath = '/UrArtist/cliente';
        this.authPath = '/UrArtist/auth';

        //Middlewares
        this.middleware();

        //Lectura y parseo del body
        this.app.use(express.json());

        //Rutas del sevidor
        this.routes();
    }

    middleware() {

        //CORS
        this.app.use(cors());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.clientePath, cliente);
        this.app.use(this.authPath, auth);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT);
        });
    }

}

export default Server;