export const randomNumber = max => Math.floor(Math.random() * max)

export const isStreamer = badges => badges.broadcaster === '1'

export const isMod = badges => badges.moderator === '1'

export const isOp = badges => isStreamer(badges) || isMod(badges)
