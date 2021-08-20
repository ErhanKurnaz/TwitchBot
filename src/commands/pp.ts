import { ICommandProps } from '.'
import { client } from '../index'

export const description =
    "this command will measure your pp size. You will either feel really confident after using this command, or think that this command is broken (it's not BTW Kappa )."
export default ({ channel, context }: ICommandProps) => {
    let size: string
    if (context.username.length < 8) {
        size = "you have a small pp, don't be embarrassed 🤖"
    } else if (context.username.length < 12) {
        size = 'you have an average pp, what an achievement 👏'
    } else {
        size = '🎉 you have a HUUUGGGEEE pp, congratulations 🎉'
    }

    client.say(channel, `@${context.username} ${size}`)
}
