import { getData } from '../database/config.db.js';
import { Sequelize } from 'sequelize';

const favorito = getData.sequelize.define('favoritos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: Sequelize.INTEGER,
    id_artista: Sequelize.INTEGER,
});
    
// cliente.toJSON = function() {
//     const { createdAT, updatedAT, password, ...client } = this.toObject();
//     return client;
// }

export const bdFavorito = {
    favorito
}