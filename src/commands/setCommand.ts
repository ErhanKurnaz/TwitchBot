import { client } from '../index'
import { isOp } from '../utils'
import db from '../db'
import dbCommands from '../dbCommands'
import { ICommandProps } from '.'

export default async ({ channel, context, args }: ICommandProps) => {
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
