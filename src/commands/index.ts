import { readdirSync } from 'fs'
import { ChatUserstate } from 'tmi.js'

export interface ICommandProps {
    channel: string
    context: ChatUserstate
    args: string[]
    self: boolean
}

const commands: Record<string, (props: ICommandProps) => void> = {}

readdirSync(__dirname).forEach(async file => {
    const commandName = file.replace('.ts', '')

    if (commandName !== 'index') {
        const command = await import(`./${commandName}`)
        commands[commandName] = command.default
    }
})

export default commands
