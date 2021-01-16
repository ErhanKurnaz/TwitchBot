require('dotenv').config()
const tmi = require('tmi.js')

const { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN } = process.env

// Define configuration options
const opts = {
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN,
    },
    channels: [CHANNEL_NAME],
}

// Create a client with our options
const client = new tmi.Client(opts)

module.exports = { client }

const commandHandler = require('./commandHandler')

// Register our event handlers
client.on('message', commandHandler)

client.on('connected', () => {
    console.log('bot connected')
})

// Connect to Twitch:
client.connect()
