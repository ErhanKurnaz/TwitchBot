const commands = require('./commands')

module.exports = (channel, context, msg, self) => {
    const args = msg.trim().split(' ')
    const command = args.shift()
    if ((!self, command.charAt(0) === '!')) {
        try {
            if (commands.hasOwnProperty(command.substr(1))) {
                commands[command.substr(1)](channel, context, args, self)
                console.log(`parsed command: ${command}`)
            } else {
                console.log(`Invalid command ${command}`)
            }
        } catch (e) {
            console.error(e)
        }
    }
}
