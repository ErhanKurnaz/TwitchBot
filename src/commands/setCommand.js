import { client } from '../index.js'
import { isOp } from '../utils.js'
import db from '../db.js'
import dbCommands from '../dbCommands.js'

export default async (channel, context, args) => {
    if (!isOp(context.badges)) {
        client.say(channel, `@${context['display-name']} For mods only`)
        return
    }

    if (args.length < 2) {
        client.say(
            channel,
            'Not enough arguments to this command, it is used like this:\n !setCommand <Name of command> <Response of command>',
        )

        return
    }

    const value = args.slice(1).join(' ')
    db.set(`commands.${args[0]}`, value).write()
    dbCommands[args[0]] = value

    client.say(channel, `Command: ${args[0]} is updated`)
}
