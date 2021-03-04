import { ICommandProps } from '.'
import { client } from '../index'

export default ({ channel, args }: ICommandProps) => {
    if (args.length) {
        client.say(channel, `${args.join(' ')} IS LOVELY!!!!`)
    } else {
        client.say(channel, 'EVERYONE IS LOVELY!!!!')
    }
}
