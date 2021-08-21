import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync.js'

interface IDbInterface {
    // The dynamic commands that can be set with the !setCommand command
    // the key is the command name and the value is the text that the command needs to return
    commands: Record<string, string>
    // the wallet of a specific user, used for 'gambling'. The key is the users id and the value is the amount of bot points
    wallet: Record<string, number>
}

const adapter = new FileSync<IDbInterface>('db.json')
const db = low(adapter)

db.defaults({
    commands: {},
    wallet: {},
}).write()

export default db
