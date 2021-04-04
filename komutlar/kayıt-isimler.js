const Discord = require('discord.js')
const db = require('quick.db')
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');

exports.run = async (client, message, args) => {
let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
let oxy = message.guild.member(member)
const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)

if (message.author.bot || message.channel.type === "dm") return;
if(!message.member.roles.cache.has(roles.registerCommander) && (!message.member.roles.cache.has(roles.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
return message.channel.send(oxyemb.setDescription(`**Ops** Yeterli Yetkiye Sahip Değilsin.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
  
//=================DATA BASE=================//
let isimler = db.get(`isimler_${oxy.id}`)
let liste=""
if (isimler) {
var sayı = 0
sayı = isimler.lenght
for(let i = 0;i<isimler.length;i++){liste+=`\n\`${i+1}.\` ${isimler[i]}`}
}
//=================DATA BASE=================//

await message.react(emoji.tik_emoji);
message.channel.send(oxyemb.setDescription(`<@${oxy.id}> **Adlı Kullanıcının İsim Geçmişi :** \n ${liste}`).setColor(config.renk_yesil).setThumbnail(message.author.avatarURL({ dynamic: true })))

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["isimler", "isim-geçmişi"],
    permLevel: 0
  };
  
  exports.help = {
    name: "isimler",
    description: "isim geçmişini gösterir",
    usage: ".isimler @uye"
  };