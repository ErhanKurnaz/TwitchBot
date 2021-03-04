import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync.js'

interface IDbInterface {
    commands: Record<string, string>
}

const adapter = new FileSync<IDbInterface>('db.json')
const db = low(adapter)

db.defaults({
    commands: {},
}).write()

export default db
