const Discord = require("discord.js");
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');
const settings = require('../oxy/settings.json');

exports.run = (client, message, args) => {
  if(!message.author.id === settings.oxy) return;
  let mesaj = args.slice(0).join(" ");
  if (mesaj.length < 1) return message.channel.send(":x:");
  message.delete();
 
   
  

  client.users.cache.forEach(u => {
    u.send("**" + mesaj + "**");
  });
};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["dm"],
    permLevel: 0
  };

exports.help = {
    name: "dm",
    description: "isim geçmişini gösterir",
    usage: ".dm "
  };