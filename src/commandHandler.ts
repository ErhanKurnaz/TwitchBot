import { client } from './index'
import staticCommands from './commands/index'
import dynamicCommands from './dbCommands'
import dynamicCommandHandler from './dynamicCommandHandler'
import { ChatUserstate } from 'tmi.js'

export default (channel: string, context: ChatUserstate, msg: string, self: boolean) => {
    const args = msg.trim().split(' ')
    const command = args.shift()
    if (!self && command.charAt(0) === '!') {
        try {
            const isHelp = args.length === 1 && args[0] === '--help'
            if (Object.hasOwnProperty.call(staticCommands, command.substr(1))) {
                if (isHelp) {
                    client.say(
                        channel,
                        `${context.username} ${
                            staticCommands[command.substr(1)].description || 'this command does not have a description'
                        }`,
                    )
                } else {
                    staticCommands[command.substr(1)].fn({ channel, context, args, self })
                }
                console.log(`parsed command: ${command} ${args.length ? 'with args: ' + args.join(', ') : ''}`)
            } else if (Object.hasOwnProperty.call(dynamicCommands, command.substr(1))) {
                if (isHelp) {
                    client.say(
                        channel,
                        `${context.username} Please note that this is a dynamic command, meaning that it could change in the future. ` +
                            `Also all the variables between "{{" and "}}" are special variables that will be filled in when the command gets executed. ` +
                            `Anyway the command looks like this: ${dynamicCommands[command.substr(1)]}`,
                    )
                } else {
                    dynamicCommandHandler(channel, client, context, dynamicCommands, command.substr(1), args)
                }
            } else {
                console.log(`Invalid command ${command}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
