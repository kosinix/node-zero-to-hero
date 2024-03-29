(async () => {

    /**
     * Insert default users.
     * Usage: node install-users.js
     */
    //// Core modules
    const fs = require('fs');

    //// External modules

    //// Modules
    const passwordMan = require('./data/src/password-man');
    const dbConn = require('./data/src/db-connect');
    let dbInstance = await dbConn.connect()

    try {
        console.log('Clearing users...')

        let User = require('./data/src/models/user')('User', dbInstance)
        await User.drop()
        await User.sync()

        let email = 'developers@example.com'
        let password = 'password123'
        let salt = passwordMan.randomString(20)
        let passwordHash = passwordMan.hashPassword(password, salt)
        let data = {
            passwordHash: passwordHash,
            salt: salt,
            email: email,
        }
        await User.create(data)
        data.password = password
        console.log(data)
    } catch (err) {
        console.error(err)
    } finally {
        dbInstance.close();
    }
})()