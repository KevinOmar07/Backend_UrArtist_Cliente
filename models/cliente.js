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
})

export const bdCliente = {
    cliente
}