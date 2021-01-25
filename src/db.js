import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    commands: {},
}).write()

export default db
