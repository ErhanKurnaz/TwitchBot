const randomNumber = max => Math.floor(Math.random() * max)

const isStreamer = badges => badges.broadcaster === '1'

const isMod = badges => badges.moderator === '1'

const isOp = badges => isStreamer(badges) || isMod(badges)

module.exports = { randomNumber, isStreamer, isMod, isOp }
