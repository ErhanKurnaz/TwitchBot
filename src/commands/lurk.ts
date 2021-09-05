import { ICommandProps } from '.'
import { client } from '../index'

export const description =
    'Use this command to show that you will be lurking. Imagine being rude enough to not be active in chat Kappa'
export default({ channel, context }: ICommandProps) => {
    client.say(channel, `@${context['display-name']} is now lurking. Hope to see u soon KonCha`)
}
