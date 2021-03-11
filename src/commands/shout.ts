import { ICommandProps } from '.'
import { client } from '../index'

export const description =
    'ever needed to shout at someone, why not let me do it for you! I will be as mean as I can be! Just specify the name and I will do the rest'
export default ({ channel, args }: ICommandProps) => {
    if (args.length) {
        client.say(channel, `${args.join(' ')} IS LOVELY!!!!`)
    } else {
        client.say(channel, 'EVERYONE IS LOVELY!!!!')
    }
}
