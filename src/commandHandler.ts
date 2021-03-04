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
            if (Object.hasOwnProperty.call(staticCommands, command.substr(1))) {
                staticCommands[command.substr(1)]({ channel, context, args, self })
                console.log(`parsed command: ${command}`)
            } else if (Object.hasOwnProperty.call(dynamicCommands, command.substr(1))) {
                console.log('args:', args)
                dynamicCommandHandler(channel, client, context, dynamicCommands, command.substr(1), args)
            } else {
                console.log(`Invalid command ${command}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
