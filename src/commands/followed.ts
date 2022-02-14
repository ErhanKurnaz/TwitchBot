import { differenceInDays } from 'date-fns'
import { ICommandProps } from '.'
import { client } from '../index'
import { getFollower } from '../utils'

export const description =
    "want to see how long you have followed for, then this is the command for you! (you'll never beat hopo_art tho)"

export default async ({ channel, context }: ICommandProps) => {
    const follower = await getFollower(context['user-id'])

    if (follower === null) {
        client.say(channel, `${context.username} has not followed this channel (yet 😉).`)
        return
    }

    const followedAt = new Date(follower.followed_at)
    const now = new Date()
    let difference = differenceInDays(now, followedAt)

    if (context.username == "Hopo_Art") {
        difference += 1100
    }

    client.say(
        channel,
        `${context.username} has followed this channel for ${difference} day${difference !== 1 ? 's' : ''}.`,
    )
}
