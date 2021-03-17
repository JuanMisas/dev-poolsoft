const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');

module.exports = {
    
    async findPoolType(id) {
        const PoolType = await PT.findByPk(id);
        return PoolType;
    }
};