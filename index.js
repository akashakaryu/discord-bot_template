require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const express = require('express')
const PORT = process.env.PORT || 80


const token = process.env.bot_token;

const prefix = '>';

const { readdirSync } = require("fs");
const { sep } = require("path");
const antispam = new Set();

bot.commands = new Discord.Collection();
const load = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}${sep}`).filter(files => files.endsWith(".js"));
        for (const file of commands) {
            const command = require(`${dir}/${file}`);
            bot.commands.set(command.name, command);

        }
    });
};
load();


bot.on('ready', () => {
    console.log('Bot online');
    bot.user.setActivity("Ready to serve you, Goshujin-sama...", { type: "PLAYING" });
})

bot.login(token);


bot.on('message', message => {

    if (antispam.has(message.author.id)) {
        message.reply("Wait for 2.5 seconds");
    } else {

        var args = message.content.slice(prefix.length).split(/ +/);

        var commandName = args.shift().toLowerCase();

        if (!bot.commands.has(commandName)) return;

        const command = bot.commands.get(commandName);

        try {

            if (message.content.startsWith(prefix)) {

                command.execute(message, args, bot);

                antispam.add(message.author.id);

            }

        } catch (error) {
            console.log(error)
        }

        setTimeout(() => {
            antispam.delete(message.author.id);
        }, 2500);
    }

})

express()
    .get('/', (req, res) => res.render(html = "<html></html>"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))