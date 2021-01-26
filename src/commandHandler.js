import { client } from './index.js'
import staticCommands from './commands/index.js'
import dynamicCommands from './dbCommands.js'
import dynamicCommandHandler from './dynamicCommandHandler.js'

export default (channel, context, msg, self) => {
    const args = msg.trim().split(' ')
    const command = args.shift()
    if ((!self, command.charAt(0) === '!')) {
        try {
            if (Object.hasOwnProperty.call(staticCommands, command.substr(1))) {
                staticCommands[command.substr(1)](channel, context, args, self)
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
