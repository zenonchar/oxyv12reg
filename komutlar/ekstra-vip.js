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
    if(!roles.vip) return message.channel.send(oxyemb.setDescription(`**Ops** Vip Rolü Ayarlanmamış.`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 10000})).catch(err => console.error(error));
    
    if(oxy.roles.cache.has(roles.vip)) {
        await oxy.roles.remove(roles.vip)  
        message.channel.send(oxyemb.setDescription(`**Başarıyla <@${oxy.id}> adlı kullanıcıdan <@&${roles.vip}> alındı.**`).setColor(config.renk_sarı))
    } else {
        await oxy.roles.add(roles.vip)
        message.channel.send(oxyemb.setDescription(`**Başarıyla <@${oxy.id}> adlı kullanıcıya <@&${roles.vip}> verildi.**`).setColor(config.renk_sarı))
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["vip"],
    permLevel: 0
  };

exports.help = {
    name: "vip",
    description: "isim geçmişini gösterir",
    usage: ".vip @uye"
  };