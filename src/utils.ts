import fetch from 'node-fetch'
import { Badges } from 'tmi.js'

let authToken: string | null = null

export const randomNumber = (max: number) => Math.floor(Math.random() * max)

export const isStreamer = (badges: Badges) => badges.broadcaster === '1'

export const isMod = (badges: Badges) => badges.moderator === '1'

export const isOp = (badges: Badges) => isStreamer(badges) || isMod(badges)

export const getAuthToken = async (): Promise<string> => {
    if (authToken != null) {
        return authToken
    }

    const { CLIENT_ID, CLIENT_SECRET } = process.env

    const baseTwitchOauthUrl = 'https://id.twitch.tv/oauth2'

    const authResponse = await fetch(`${baseTwitchOauthUrl}/token`, {
        method: 'POST',
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const auth = await authResponse.json()
    authToken = auth.access_token

    return authToken
}

export const getStreamInfo = async () => {
    const token = await getAuthToken()
    const { CLIENT_ID, CHANNEL_ID } = process.env

    const response = await fetch(`https://api.twitch.tv/helix/streams?first=1&user_id=${CHANNEL_ID}`, {
        headers: {
            'client-id': CLIENT_ID,
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.ok && response.status !== 401) {
        const streams = await response.json()

        return streams.data[0]
    }

    // token expired
    authToken = null
    return getStreamInfo()
}

export const getFollower = async userId => {
    const token = await getAuthToken()
    const { CLIENT_ID, CHANNEL_ID } = process.env

    const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&to_id=${CHANNEL_ID}`, {
        headers: {
            'client-id': CLIENT_ID,
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.ok && response.status !== 401) {
        const follows = await response.json()
        if (!follows.data.length) {
            return null
        }

        return follows.data[0]
    }

    // token expired
    authToken = null
    return getStreamInfo()
}

export const getLeaderBoard = async (): Promise<string> => {
    // @ts-ignore
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    const response = await fetch('https://webtabs.tk:1338/1', {
        headers: {
            'Content-Type': 'text/html',
        }
    })

    // @ts-ignore
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1
    return await response.text()
}
