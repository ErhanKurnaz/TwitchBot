import { client } from '../index.js'

export default (channel, context) => {
    let size
    if (context.username.length < 8) {
        size = "you have a small pp, don't be embarrassed 🤖"
    } else if (context.username.length < 12) {
        size = 'you have an average pp, what an achievement 👏'
    } else {
        size = '🎉 you have an HUUUGGGEEE pp, congratulations 🎉'
    }

    client.say(channel, `@${context.username} ${size}`)
}
