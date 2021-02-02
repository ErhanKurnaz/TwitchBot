import { differenceInDays } from 'date-fns'
import { client } from '../index.js'
import { getFollower } from '../utils.js'

export default async (channel, context) => {
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
