const fs = require('fs')

const commands = {}

fs.readdirSync(__dirname).forEach(file => {
    const commandName = file.replace('.js', '')

    if (commandName === 'index') {
        return
    }

    const command = require('./' + commandName)
    commands[commandName] = command
})

module.exports = commands
