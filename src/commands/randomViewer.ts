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
    
    // Generate random index/viewer
    const max = viewers.length

    client.say(channel, `@${viewers[randomNumber(max)]} You are the chosen one BegWan`)
}