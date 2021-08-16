import { ICommandProps } from '.'
import { client } from '../index'

export const description = 'existence is pain! you can use this command to express your inner emotions'
export default ({ channel }: ICommandProps) => client.say(channel, 'AAAAAAHHHHHHHH!!!!!!!!')
