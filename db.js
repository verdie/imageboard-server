const Sequelize = require('sequelize');
const databaseUrl = 'postgres://postgres:password@localhost:5432/postgres';
const db = new Sequelize(databaseUrl || DATABASE_URL);
db.sync()
    .then(() => console.log('Database connected'))
    .catch(console.error)

module.exports=db