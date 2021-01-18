const { client } = require('.')
const staticCommands = require('./commands')
const dynamicCommands = require('./dbCommands')

module.exports = (channel, context, msg, self) => {
    const args = msg.trim().split(' ')
    const command = args.shift()
    if ((!self, command.charAt(0) === '!')) {
        try {
            if (command.substr(1) in staticCommands) {
                staticCommands[command.substr(1)](channel, context, args, self)
                console.log(`parsed command: ${command}`)
            } else if (command.substr(1) in dynamicCommands) {
                client.say(channel, dynamicCommands[command.substr(1)])
                console.log(`parsed command: ${command}`)
            } else {
                console.log(`Invalid command ${command}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
