const Discord = require('discord.js');
const moment = require("moment");
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');

exports.run = async (client, message, args) => { 
    moment.locale("tr")
    let oxytarih = moment(message.createdAt).format("LLLL")
    let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
    let oxy = message.guild.member(member)
    const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)

    if (message.author.bot || message.channel.type === "dm") return;
    if(!message.member.roles.cache.has(roles.registerCommander) && (!message.member.roles.cache.has(roles.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
    if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!roles.yetki1) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!roles.yetki2) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!roles.yetki3) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));

    await oxy.roles.remove(roles.yetki1); 
    await oxy.roles.remove(roles.yetki2); 
    await oxy.roles.remove(roles.yetki3); 
    message.channel.send(oxyemb.setColor(config.renk_mor).setDescription(`<@!${oxy.id}> ** adlı Kullanıcı <@!${message.author.id}> Tarafından Yetkiden Alındı.**\n\n\`•\` Yetkiden Alan: <@!${message.author.id}> \`${message.author.id}\`\n\`•\` Yetkisi Çekilen : <@!${oxy.id}> \`${oxy.id}\`\n\`•\` Alınma Tarihi  : \`${oxytarih}\``)).then(o => o.delete({timeout: 10000}));
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yetkial"],
    permLevel: 0
  };

exports.help = {
    name: "ytal",
    description: "isim geçmişini gösterir",
    usage: ".yetkial @uye "
  };