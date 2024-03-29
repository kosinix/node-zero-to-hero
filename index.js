(async () => {

    // Required packages
    const express = require('express')
    const nunjucks = require('nunjucks')
    const bodyParser = require('body-parser')


    // Modules
    const db = require('./data/src/db-connect')


    // Constants
    const appDir = __dirname // Path to app directory
    const dirView = appDir + '/data/view' // Path to app directory
    const port = 3000

    // Express initialization
    const app = express()

    // Parse http body
    app.use(bodyParser.json()) // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }))

    // Setup templating engine
    // Setup nunjucks loader. See https://mozilla.github.io/nunjucks/api.html#loader
    let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, {
        "noCache": true
    })
    // Setup nunjucks environment. See https://mozilla.github.io/nunjucks/api.html#environment
    let nunjucksEnv = new nunjucks.Environment(loaderFsNunjucks)
    nunjucksEnv.express(app) // Hook up express and nunjucks

    // Connect to db
    app.locals.db = await db.connect()


    // Use the session middleware
    const session = require('./data/src/session')
    app.use(session(app.locals.db.instance));

    // Static public files
    app.use(express.static(__dirname + '/data/public'));

    app.get('/', (req, res) => {
        res.render('index.html')
    })

    app.get('/login', (req, res) => {
        res.render('login.html')
    })

    app.post('/login', (req, res, next) => {
        try {
            let post = req.body
            if (post.email !== 'developers@example.com') {
                throw new Error('Invalid email or password.')
            }
            if (post.password !== 'password123') {
                throw new Error('Invalid email or password.')
            }
            req.session.login = true
            res.redirect('/protected')
        } catch (err) {
            res.render('login.html', {
                error: err.message
            })
        }
    })

    app.get('/logout', (req, res) => {
        req.session.login = false
        res.redirect('/')
    })

    app.get('/protected', (req, res) => {
        if (!req.session.login) {
            return res.redirect('/login')
        }
        res.render('protected.html')
    })

    app.listen(port, () => {
        console.log(`App running on http://localhost:${port}`)
    })

})()