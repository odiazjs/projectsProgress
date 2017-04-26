/**
 * Directory paths
 */
const path = require('path')
const webroot = 'target/webroot'

module.exports = {
        outputPath: path.join(__dirname, webroot),
        contentBase: webroot,
        port: 2000
    }