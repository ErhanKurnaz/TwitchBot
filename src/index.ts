import * as dotenv from 'dotenv'
import * as tmi from 'tmi.js'

dotenv.config()
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
export const client = new tmi.Client(opts)

// eslint-disable-next-line import/first
import commandHandler from './commandHandler'

// Register our event handlers
client.on('message', commandHandler)

client.on('connected', () => {
    console.log('bot connected')
})

// Connect to Twitch:
client.connect()
