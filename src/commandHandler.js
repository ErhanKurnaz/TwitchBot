const { client } = require('.')
const staticCommands = require('./commands')
const dynamicCommands = require('./dbCommands')
const dynamicCommandHandler = require('./dynamicCommandHandler')

module.exports = (channel, context, msg, self) => {
    const args = msg.trim().split(' ')
    const command = args.shift()
    if ((!self, command.charAt(0) === '!')) {
        try {
            if (Object.hasOwnProperty.call(staticCommands, command.substr(1))) {
                staticCommands[command.substr(1)](channel, context, args, self)
                console.log(`parsed command: ${command}`)
            } else if (Object.hasOwnProperty.call(dynamicCommands, command.substr(1))) {
                dynamicCommandHandler(channel, client, context, dynamicCommands, command.substr(1))
            } else {
                console.log(`Invalid command ${command}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
