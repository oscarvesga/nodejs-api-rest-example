'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
    if(err) {
        return console.log(`DB connect error ${err}`)
    }
    console.log('DB connect success')

    app.listen(config.port, () => {
        console.log(`Node server running on http://localhost:${config.port}`)
    })
})