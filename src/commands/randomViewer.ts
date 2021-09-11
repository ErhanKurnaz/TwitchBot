import { differenceInMinutes } from 'date-fns';
import { ICommandProps } from '.'
import { client } from '../index'
import { getViewerList, isStreamer, randomNumber } from "../utils";

interface ICacheProperties {
    lastCalled: Date,
    chosenOne: String
}

type Cache = Record<string, ICacheProperties>

let cache: Cache = {
    
}

// Cooldown in minutes
const cooldown = 180

export const description = 
    'Use this command every 3 hours to randomly pick a viewer in the chat and make someone feel special SeemsGood This command has no cooldown for the streamer cus they\'re op PogChamp'
export default async({channel,context}: ICommandProps) => {
    // Remove # from "channel"
    const channelName = channel.substring(1)

    const currentDate = new Date()

    // Execute command if channel name does not exist in cache (command hasn't been called before) 
    // Execute command if cooldown is over
    // Exucute command if caller is streamer
    if (!cache[channelName] || differenceInMinutes(currentDate, cache[channelName].lastCalled) >= cooldown || isStreamer(context.badges)) {
        // Get array of current viewers in chat 
        const viewers = await getViewerList(channelName)
        const max = viewers.length
        if (isNaN(max)) {
            client.say(channel, `No one's around to be chosen BibleThump`)
        }
        else {
            // Randomly choose viewer
            let selectedViewer = viewers[randomNumber(max)]
            client.say(channel, `@${selectedViewer} You are the chosen one BegWan`)

            // Update cache
            cache[channelName] = {
                lastCalled: currentDate,
                chosenOne: selectedViewer
            }
        }
    }
    else {
        let cooldownLeft = cooldown - differenceInMinutes(currentDate, cache[channelName].lastCalled) 
        client.say(channel, `The chosen one currently is @${cache[channelName].chosenOne} BegWan The next choosing ceremony will be ready in ${cooldownLeft} minutes for viewers BegWan`)
    }
}