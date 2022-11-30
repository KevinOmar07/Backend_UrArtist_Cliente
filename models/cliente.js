import { getData } from '../database/config.db.js';
import { Sequelize } from 'sequelize';

const cliente = getData.sequelize.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    lastname: Sequelize.STRING,
    mail: Sequelize.STRING,
    password: Sequelize.STRING,
    photo_profile: Sequelize.STRING,
    number_phone: Sequelize.STRING,
    question_one: Sequelize.STRING,
    question_two: Sequelize.STRING,
},{
    Sequelize,
    paranoid: true,
    deletedAt: 'EliminaciónTemporal'
});
    
// cliente.toJSON = function() {
//     const { createdAT, updatedAT, password, ...client } = this.toObject();
//     return client;
// }

export const bdCliente = {
    cliente
}