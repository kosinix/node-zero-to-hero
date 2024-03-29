//// Core modules

//// External modules
const session = require('express-session'); // Session engine
const SessionStore = require('express-session-sequelize')(session.Store);

// Use the session middleware
// See options in https://github.com/expressjs/session
module.exports = (database) => {
    return session({
        name: 'gsu_node_zero_hero_app_sid',
        store: new SessionStore({
            db: database,
        }),
        secret: 'eD4qGBVHPjnsFqhNnvwuN9fmWdUFetnv',
        cookie: {
            "httpOnly": false,
            "maxAge": 86400000,
            "secure": false
        },
        resave: false,
        saveUninitialized: false
    });
}