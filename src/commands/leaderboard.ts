import { ICommandProps } from ".";
import cheerio from 'cheerio'
import { getLeaderBoard } from "../utils";
import { client } from "..";

const findUserInLeaderboard = (html: string): [string, string, string] | null => {
    const $ = cheerio.load(html)
    let result: [string, string, string] | null = null
    $('tr').each(function () {
        if (result === null) {
            let userFound = false
            $(this)
                .find('td')
                .each(function () {
                    if ($(this).text() === 'MatsDoesGaming') {
                        userFound = true
                    }
                })

            if (userFound) {
                result = $(this)
                    .find('td')
                    .toArray()
                    .map(value => $(value).text()) as [string, string, string]
            }
        }
    })

    return result
}

export default async ({ channel }: ICommandProps) => {
    const html = await getLeaderBoard()
    const result = findUserInLeaderboard(html)

    if (result === null) {
        client.say(channel, 'It looks like Mats isn\'t in the top hundred. What a noob am i right!!! Kappa')
    }

    const [position, name, kills] = result

    client.say(channel, `${name} is currently in position ${position} with ${kills} kills! If you wan't to look at the rankings, you can find them here: 'https://webtabs.tk:1338/1'`)
}
