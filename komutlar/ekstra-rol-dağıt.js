const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../oxy/config.json');
exports.run = async (client, message, args) => {
const oxyemb = new Discord.MessageEmbed()
if (!message.member.hasPermission(8)) return message.channel.send(oxyemb.setDescription("❌ **Bu Komutu Kullanamazsın.**").setColor(config.renk_kırmızı));
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(rol => rol.name === args[0]);
if (!rol)return message.channel.send(oxyemb.setDescription("❌ **Herkese Rol Verebilmem İçin Bir Rol Etiketlemelisin!**").setColor(config.renk_kırmızı));
message.guild.members.cache.forEach(oxy => {oxy.roles.add(rol);});
message.channel.send(oxyemb.setDescription(`✅ **Herkese ${rol} Adlı Rol Verildi!**`).setColor(rol.hexColor));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["toplurolver", "oxyburdakanki"],
  permLevel: 3
};

exports.help = {
  name: "oxyburdakanki",
  description: "Belirlenen Rolü Herkese Verir!",
  usage: "herkese-rol-ver <rol>"
};