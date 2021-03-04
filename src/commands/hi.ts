import { ICommandProps } from '.'
import { client } from '../index'

export default ({ channel }: ICommandProps) => client.say(channel, 'hello')
