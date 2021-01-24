const fs = require('fs')

const commands = {}

fs.readdirSync(__dirname).forEach(file => {
    const commandName = file.replace('.js', '')

    if (commandName === 'index') {
        return
    }

    /* eslint global-require: 0 */
    /* eslint import/no-dynamic-require: 0 */
    const command = require(`./${commandName}`)
    commands[commandName] = command
})

module.exports = commands
