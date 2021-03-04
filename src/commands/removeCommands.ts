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
