import { ChatUserstate, Client } from 'tmi.js'

const getVariable = (varName: string, context: ChatUserstate, args: string[]): string => {
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

const parseCommand = (command: string, context: ChatUserstate, args: string[]) => {
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
    return command.substr(0, varStart) + variable + parseCommand(command.substr(varEnd + 2), context, args)
}

export default (
    channel: string,
    client: Client,
    context: ChatUserstate,
    commands: Record<string, string>,
    command: string,
    args: string[],
) => {
    console.log('args:', args)
    client.say(channel, parseCommand(commands[command], context, args))
    console.log(`parsed command: ${command}`)
}
