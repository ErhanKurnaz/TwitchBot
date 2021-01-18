const db = require('./db')

module.exports = db.get('commands').values()
