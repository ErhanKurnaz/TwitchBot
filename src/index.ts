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

client.on('giftpaidupgrade', (channel, username) => {
    console.log(`${username} has continued gift sub to channel ${channel}`)
    client.say(channel, `Thank you @${username} for continuing your gift sup`)
})

client.on('raided', (channel, username, viewers) => {
    console.log(`${username} raided ${channel} with ${viewers} viewers`)
    client.say(channel, `Thank you ${username} for RADING WITH ${viewers} VIEWERS!!! Man imagine if this stream was actually entertaining Kappa`)
})

client.on('resub', (channel, username, monthStreak, message, userstate) => {
    console.log(`${username} resubbed to ${channel} for ${monthStreak} saying ${message}`)
    if (!userstate['msg-param-should-share-streak']) {
        client.say(channel, 'Looks like someone has resubbed *whispers* you know who you are *nuzzles* *gets sprayed with water*')
        return
    }

    const cumulativeMonths = ~~userstate['msg-param-cumulative-months']
    client.say(channel, `Thank you ${username} for resubscribing for ${cumulativeMonths}!!!! I would kiss you but I don't have lips, how bout a little hug instead matsdoGhostHug`)
})

client.on('subscription', (channel, username, _, message) => {
    console.log(`${username} has subscribed to ${channel} saying ${message}`)
    client.say(channel, `Ayyyyyyy ma humanoid @${username} out here with the subscription... that might have been the worst mistake of your life. Enjoy Kappa`)
})

// Connect to Twitch:
client.connect()
