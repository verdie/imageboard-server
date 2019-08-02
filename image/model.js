const Sequelize = require ('sequelize');
const db = require('../db');
const Image = db.define('images', {
    url: Sequelize.STRING,
    title: Sequelize.STRING,
})

module.exports=Image