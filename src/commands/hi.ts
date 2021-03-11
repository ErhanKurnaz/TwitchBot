import { ICommandProps } from '.'
import { client } from '../index'

export const description = 'says hi'

export default ({ channel }: ICommandProps) => client.say(channel, 'hello')
