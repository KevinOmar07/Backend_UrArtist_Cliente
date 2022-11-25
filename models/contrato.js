import { getData } from '../database/config.db.js';
import { Sequelize } from 'sequelize';

const contratos = getData.sequelize.define('contratos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: Sequelize.INTEGER,
    id_artista: Sequelize.INTEGER,
    artists_name: Sequelize.STRING,
    photo_profile: Sequelize.STRING
});
    
// cliente.toJSON = function() {
//     const { createdAT, updatedAT, password, ...client } = this.toObject();
//     return client;
// }

export const bdContratos = {
    contratos
}