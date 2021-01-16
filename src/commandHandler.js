const { randomNumber, eightBallResponses } = require('./utils');
const { client } = require('./index');

const commands = {
    'hi': (channel) => client.say(channel, 'hello'),
    'aah': (channel) => client.say(channel, 'AAAAAAHHHHHHHH!!!!!!!!'),
    'shout': (channel, context, args) => {
        if (args.length) {
            client.say(channel, `${args.join(" ")} IS LOVELY!!!!`)
        } else {
            client.say(channel, `EVERYONE IS LOVELY!!!!`)
        }
    },
    'roll': (channel, context, args) => {
        if (args.length && !isNaN(args[0])) {
            const max = Math.floor(Number(args[0]));
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

module.exports = (channel, context, msg, self) => {
    const args = msg.trim().split(" ");
    const command = args.shift();
    if (!self, command.charAt(0) === '!') {
        try {
            if (commands.hasOwnProperty(command.substr(1))) {
                commands[command.substr(1)](channel, context, args, self);
                console.log(`parsed command: ${command}`);
            } else {
                console.log(`Invalid command ${command}`);
            }
        } catch (e) {
            console.error(e);
        }
    }
};