import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';
import { ICommandProps } from '.'
import { client } from '../index'
import { getViewerList, randomNumber } from "../utils";


export const description = 
    'Use this command to randomly pick a viewer in the chat and make them feel special SeemsGood'
export default async({channel}: ICommandProps) => {
    // Remove # from channel name
    let channelName = channel.substring(1)

    // Get array of current viewers in chat 
    let viewers = await getViewerList(channelName)
    viewers = JSON.parse(viewers)
    
    // Generate random index/viewer
    const max = viewers.length

    client.say(channel, `@${viewers[randomNumber(max)]} You are the chosen one BegWan`)
}