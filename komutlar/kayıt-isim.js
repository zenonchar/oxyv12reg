const Discord = require('discord.js')
const db = require('quick.db')
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');

exports.run = async (client, message, args) => {
    let isim = args[1];
    let yas = args[2];
    let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
    let oxy = message.guild.member(member)
    let tag_isim = config.tag + " " + isim + config.tırnak + yas
    let oxy_isim = config.tag2 + " " + isim + config.tırnak + yas
const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)

if (message.author.bot || message.channel.type === "dm") return;
if(!message.member.roles.cache.has(roles.registerCommander) && (!message.member.roles.cache.has(roles.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
return message.channel.send(oxyemb.setDescription(`**Ops** Yeterli Yetkiye Sahip Değilsin.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!isim) return message.channel.send(oxyemb.setDescription(`**Ops** İsim Girmeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!yas) return message.channel.send(oxyemb.setDescription(`**Ops** Yaş Girmeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));

if(!oxy.user.username.includes(config.tag)) 
return await oxy.setNickname(oxy_isim); 
else {await oxy.setNickname(oxy_isim)};

//=================DATA BASE=================//
let isimler = db.get(`isimler_${oxy.id}`)
let liste = ""
var sayı = 0
if(isimler){sayı = isimler.lenght
for(let i = 0;i<isimler.length;i++){liste+=`\n\`${i+1}.\` ${isimler[i]}`}
} else {liste=`\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`}
//=================DATA BASE=================//

await message.react(emoji.tik_emoji);
message.channel.send(oxyemb.setDescription(`**<@${member.id}>** **adlı kullanıcının ismi başarıyla değiştirildi.** \n ${liste}`).setColor(config.renk_yesil))

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['isim','nick','i'],
    permLevel: 0
};

exports.help = {
    name: 'isim',
};