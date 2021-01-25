import fs from 'fs'

const commands = {}

const files = fs.readdirSync(new URL('./', import.meta.url))

for (const file of files) {
    const commandName = file.replace('.js', '')

    if (commandName === 'index') {
        continue
    }

    import(`./${file}`).then(command => {
        commands[commandName] = command.default
    })
}

export default commands
