const { client } = require('../index')
const { isOp } = require('../utils')
const db = require('../db')
const dbCommands = require('../dbCommands')

module.exports = async (channel, context, args) => {
    if (!isOp(context.badges)) {
        client.say(channel, `@${context['display-name']} For mods only`)
        return
    }

    if (!args.length) {
        client.say(channel, 'I think you forgot to mention wich commands you wanted to delete')
        return
    }

    args.forEach(arg => {
        if (arg in dbCommands) {
            db.unset(`commands.${arg}`).value()
            delete dbCommands[arg]
        }
    })

    db.write()

    client.say(channel, `Deleted the following commands: ${args.join(' ')}`)
}
