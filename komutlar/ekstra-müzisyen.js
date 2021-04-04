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
    if(!roles.muzisyen) return message.channel.send(oxyemb.setDescription(`**Ops** Müzisyen Rolü Ayarlanmamış.`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 10000})).catch(err => console.error(error));
    
    if(oxy.roles.cache.has(roles.muzisyen)) {
        await oxy.roles.remove(roles.muzisyen)  
        message.channel.send(oxyemb.setDescription(`**Başarıyla <@${oxy.id}> adlı kullanıcıdan <@&${roles.muzisyen}> alındı.**`).setColor(config.renk_pembe))
    } else {
        await oxy.roles.add(roles.muzisyen)
        message.channel.send(oxyemb.setDescription(`**Başarıyla <@${oxy.id}> adlı kullanıcıya <@&${roles.muzisyen}> verildi.**`).setColor(config.renk_pembe))
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["müzisyen"],
    permLevel: 0
  };

exports.help = {
    name: "vocal",
    description: "isim geçmişini gösterir",
    usage: ".vocal @uye"
  };