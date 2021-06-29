import { ICommandProps } from ".";
import cheerio from 'cheerio'
import { getLeaderBoard } from "../utils";
import { client } from "..";

const findUserInLeaderboard = (html: string): [string, string, string, number] | null => {
    const $ = cheerio.load(html)
    let result: [string, string, string, number] | null = null
    const rows = $('tr').toArray()
    rows.forEach((item, index) => {
        if (result === null) {
            let userFound = false
            $(item)
                .find('td')
                .each(function () {
                    if ($(this).text() === 'MatsDoesGaming') {
                        userFound = true
                    }
                })

            if (userFound) {
                result = $(item)
                    .find('td')
                    .toArray()
                    .map(value => $(value).text()) as [string, string, string, number]
                if (index === 0) {
                    result[3] = 0
                } else {
                    const nextKills = $($(rows[index - 1]).find('td').toArray()[2]).text()
                    result[3] = Number(nextKills) - Number(result[2])
                }
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

    const [position, name, kills, nextKills] = result

    client.say(channel, `${name} is currently in position ${position} with ${kills} kills! He needs ${nextKills} more kills to rank up! If you wan't to look at the rankings, you can find them here: https://tinyurl.com/4ayvakk3`)
}
