require('dotenv').config();
const tmi = require('tmi.js');
const { randomNumber, eightBallResponses } = require('./utils');

const { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN } = process.env;

// Define configuration options
const opts = {
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN,
    },
    channels: [
        CHANNEL_NAME,
    ]
};

// Create a client with our options
const client = new tmi.Client(opts);

// Define all commands
const commands = {
    'hi': (channel) => client.say(channel, 'hello'),
    'aah': (channel) => client.say(channel, 'AAAAAAHHHHHHHH!!!!!!!!'),
    'shout': (channel, context, msg) => {
        if (msg.length > 1) {
            client.say(channel, `${msg[1]} IS LOVELY!!!!`)
        } else {
            client.say(channel, `EVERYONE IS LOVELY!!!!`)
        }
    },
    'roll': (channel, context, msg) => {
        if (msg.length > 1 && !isNaN(msg[1])) {
            const max = Math.floor(Number(msg[1]));
            if (max > 0) {
                client.say(channel, `@${context['display-name']} rolled: ${randomNumber(max) + 1}`);
            } else {
                client.say(channel, `@${context['display-name']} i tried to roll ${max}, but i don't know how to roll negative numbers`)
            }
        } else {
            client.say(channel, `You need to enter a number @${context['display-name']}`)
        }
    },
    'pp': (channel, context) => {
        let size;
        if (context.username.length < 8) {
            size = 'you have a small pp, don\'t be embarrassed 🤖';
        } else if (context.username.length < 12) {
            size = 'you have an average pp, what an achievement 👏';
        } else {
            size = '🎉 you have an HUUUGGGEEE pp, congratulations 🎉';
        }

        client.say(channel, `@${context.username} ${size}`);
    },
    '8ball': (channel, context) => {
        client.say(channel, `@${context['display-name']} The magic eight ball says: ${eightBallResponses[randomNumber(eightBallResponses.length)]}`);
    }
};

// Register our event handlers 
client.on('message', (channel, context, msg, self) => {
    const commandName = msg.trim();
    if (!self, commandName[0] === '!') {
        // get rid of the ! and trim it to the first word
        try {
            let spaceIndex = commandName.indexOf(' ');
            let parsedCommand;
            if (spaceIndex === -1) {
                parsedCommand = [commandName.substring(1)];
            } else {
                parsedCommand = [commandName.substring(1, spaceIndex), commandName.substring(spaceIndex)];
            }
            if (commands.hasOwnProperty(parsedCommand[0])) {
                commands[parsedCommand[0]](channel, context, parsedCommand, self);
                console.log(`parsed command: ${commandName}`);
            } else {
                console.log(`Invalid command ${commandName}`);
            }
        } catch (e) {
            console.error(e);
        }
    }
});

client.on('connected', () => {
    console.log('bot connected');
})

// Connect to Twitch:
client.connect();