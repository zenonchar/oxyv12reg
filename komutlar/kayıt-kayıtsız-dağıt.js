const Discord = require("discord.js");
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');
exports.run =async (message, args) => {

    let oxydagıt = message.guild.members.cache.filter(e => e.roles.cache.size === 1)
    const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)

    if(!message.member.roles.cache.has(roles.ownerCommander) && (!message.member.roles.cache.has(roles.yetkiCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
    return message.channel.send(oxyemb.setDescription(`**Ops** Yeterli Yetkiye Sahip Değilsin.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(args[0] == "dağıt") {oxydagıt.forEach(r => {r.roles.add(roles.unregister1 , roles.unregister2)})
    message.channel.send(oxyemb.setDescription(`Sunucudaki Rolsüz Kişilere Rol Dağıtıldı. `).setColor(config.renk_mavi))
    } else if(!args[0]) {
    message.channel.send(oxyemb.setDescription(`Sunucumuzda **`+ oxydagıt.size +`** adet Kişide Rol Bulunmamakta.`).setColor(config.renk_mavi))
}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rolsüz"],
    permLevel: 0
  };

exports.help = {
    name: "rolsüz",
    description: "isim geçmişini gösterir",
    usage: ".rolsüz dağıt"
  };