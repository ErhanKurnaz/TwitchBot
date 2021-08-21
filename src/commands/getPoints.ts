import { ICommandProps } from '.'
import { client } from '../index'
import { getBotPoints } from '../utils'

export const description = 'This command will return the amount of bot points you have. Lets see who the poor one is'
export default ({ channel, context }: ICommandProps) => {
    return client.say(channel, `@${context['display-name']} has ${getBotPoints(context.id)} points!`)
}