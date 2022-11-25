import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DBNAME, process.env.USERNAMEDB, process.env.PASS, {
    host: process.env.HOST, 
    dialect: 'mysql'
})

sequelize.sync({ force: true})
.then(() => {
    console.log(' Tablas sincronizadas')
}).catch((err) => {
    console.log('No se conecto', err)
});

export const getData = { sequelize };