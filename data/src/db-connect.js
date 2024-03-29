const { Sequelize } = require('sequelize')

module.exports = {
    connect: async () => {
        try {

            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: __dirname + '/app.db',
                logging: false,
            });

            await sequelize.authenticate()
            console.log(`Database connected.`);

            return  {
                instance: sequelize,
                models: {
                    User: require('./models/user')('User', sequelize),
                },
            }
        } catch (error) {
            console.log('Connection error:', error.message)
        }
    }
}