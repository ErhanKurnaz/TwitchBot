const getVariable = (varName, context, args) => {
    console.log(varName, context, args)
    // special variables
    if (varName === 'args') {
        return args.join(' ')
    }

    if (Object.hasOwnProperty.call(context, varName)) {
        return context[varName]
    }

    return undefined
}

const parseCommand = (command, context, args) => {
    const varStart = command.indexOf('{{')
    const varEnd = varStart > -1 ? command.indexOf('}}', varStart + 2) : -1

    if (varStart === -1 || varEnd === -1) {
        return command
    }

    // removing all occurences of { and }
    const search = command
        .substr(varStart, varEnd)
        .replace(/[^a-zA-Z-]+/g, '')
        .trim()
    const variable = getVariable(search, context, args)
    return command.substr(0, varStart) + variable + parseCommand(command.substr(varEnd + 2), context)
}

export default (channel, client, context, commands, command, args) => {
    console.log('args:', args)
    client.say(channel, parseCommand(commands[command], context, args))
    console.log(`parsed command: ${command}`)
}
