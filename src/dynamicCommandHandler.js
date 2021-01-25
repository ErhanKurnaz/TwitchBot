const getVariable = (varName, context) => {
    if (Object.hasOwnProperty.call(context, varName)) {
        return context[varName]
    }

    return undefined
}

const parseCommand = (command, context) => {
    const varStart = command.indexOf('{{')
    const varEnd = varStart > -1 ? command.indexOf('}}', varStart + 2) : -1

    if (varStart === -1 || varEnd === -1) {
        return command
    }

    // removing all occurences of { and }
    const search = command.substr(varStart, varEnd).replace(/[{}]+/g, '').trim()
    const variable = getVariable(search, context)
    return command.substr(0, varStart) + variable + parseCommand(command.substr(varEnd + 2), context)
}

export default (channel, client, context, commands, command) => {
    client.say(channel, parseCommand(commands[command], context))
    console.log(`parsed command: ${command}`)
}
