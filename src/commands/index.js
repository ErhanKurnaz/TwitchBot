import fs from 'fs'

const commands = {}

fs.readdirSync(new URL('./', import.meta.url)).forEach(async file => {
    const commandName = file.replace('.js', '')

    if (file !== 'index') {
        const command = await import(`./${file}`)
        commands[commandName] = command.default
    }
})

export default commands
