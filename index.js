// Required packages
const express = require('express')
const nunjucks = require('nunjucks')

// Constants
const appDir = __dirname // Path to app directory
const dirView = appDir + '/data/view' // Path to app directory
const port = 3000

// Express initialization
const app = express()

// Setup templating engine
// Setup Nunjucks loader. See https://mozilla.github.io/nunjucks/api.html#loader
let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, {
    "noCache": true
})
// Setup Nunjucks environment. See https://mozilla.github.io/nunjucks/api.html#environment
let nunjucksEnv = new nunjucks.Environment(loaderFsNunjucks)
nunjucksEnv.express(app) // Hook up Express and Nunjucks

// Static public files
app.use(express.static(__dirname + '/data/public'));

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/protected', (req, res) => {
    res.render('protected.html')
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})