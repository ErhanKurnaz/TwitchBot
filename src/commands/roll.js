const { client } = require('../index')
const { randomNumber } = require('../utils')

module.exports = (channel, context, args) => {
    if (args.length && !Number.isNaN(args[0])) {
        const max = Math.floor(Number(args[0]))
        if (max > 0) {
            client.say(channel, `@${context['display-name']} rolled: ${randomNumber(max) + 1}`)
        } else {
            client.say(channel, `@${context['display-name']} i tried to roll ${max}, but i don't know how to roll negative numbers`)
        }
    } else {
        client.say(channel, `You need to enter a number @${context['display-name']}`)
    }
}
