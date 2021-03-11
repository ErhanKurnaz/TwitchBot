import { ICommandProps } from '.'
import { client } from '../index'
import { randomNumber } from '../utils'

export const description = 'feeling lucky? use this command to roll a N sided die, where N is the number you filled in.'
export default ({ channel, context, args }: ICommandProps) => {
    if (args.length && !Number.isNaN(args[0])) {
        const max = Math.floor(Number(args[0]))
        if (max > 0) {
            client.say(channel, `@${context['display-name']} rolled: ${randomNumber(max) + 1}`)
        } else {
            client.say(
                channel,
                `@${context['display-name']} i tried to roll ${max}, but i don't know how to roll negative numbers`,
            )
        }
    } else {
        client.say(channel, `You need to enter a number @${context['display-name']}`)
    }
}
