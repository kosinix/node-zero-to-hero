const { DataTypes } = require('sequelize')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        email: {
            type: DataTypes.STRING
        },
        passwordHash: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.STRING
        }
    }, {
        // Other model options go here
    })
}