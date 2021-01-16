const { client } = require('../index')

module.exports = channel => client.say(channel, 'hello')
