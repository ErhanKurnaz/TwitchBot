const { client } = require('../index')

module.exports = (channel, context, args) => {
    if (args.length) {
        client.say(channel, `${args.join(' ')} IS LOVELY!!!!`)
    } else {
        client.say(channel, `EVERYONE IS LOVELY!!!!`)
    }
}
