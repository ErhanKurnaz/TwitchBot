import { differenceInDays } from 'date-fns'
import { ICommandProps } from '.'
import { client } from '../index'
import { getFollower } from '../utils'

export default async ({ channel, context }: ICommandProps) => {
    const follower = await getFollower(context['user-id'])

    if (follower === null) {
        client.say(channel, `${context.username} has not followed this channel (yet 😉).`)
        return
    }

    const followedAt = new Date(follower.followed_at)
    const now = new Date()
    const difference = differenceInDays(now, followedAt)

    client.say(
        channel,
        `${context.username} has followed this channel for ${difference} day${difference !== 1 ? 's' : ''}.`,
    )
}
