import { readdirSync } from 'fs'
import { ChatUserstate } from 'tmi.js'

export interface ICommandProps {
    channel: string
    context: ChatUserstate
    args: string[]
    self: boolean
}

export interface ICommand {
    fn: (props: ICommandProps) => void
    description?: string
}

const commands: Record<string, ICommand> = {}

readdirSync(__dirname).forEach(async file => {
    const commandName = file.replace('.ts', '')

    if (commandName !== 'index') {
        const command = await import(`./${commandName}`)
        commands[commandName] = {
            fn: command.default,
            description: command.description,
        }
    }
})

export default commands
