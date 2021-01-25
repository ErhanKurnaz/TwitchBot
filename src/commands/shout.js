import { client } from '../index.js'

export default (channel, _, args) => {
    if (args.length) {
        client.say(channel, `${args.join(' ')} IS LOVELY!!!!`)
    } else {
        client.say(channel, 'EVERYONE IS LOVELY!!!!')
    }
}
