const Discord = require('discord.js');
const moment = require("moment");
const role = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');

exports.run = async (client, message, args) => { 
    moment.locale("tr")
    let oxytarih = moment(message.createdAt).format("LLLL")
    let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
    let oxy = message.guild.member(member)
    const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)

    if (message.author.bot || message.channel.type === "dm") return;
    if(!message.member.roles.cache.has(role.registerCommander) && (!message.member.roles.cache.has(role.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
    if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!role.yetki1) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!role.yetki2) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
    if(!role.yetki3) return message.channel.send(oxyemb.setDescription('**Ops** Yetki Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));

    await oxy.roles.add(role.yetki1); 
    await oxy.roles.add(role.yetki2); 
    await oxy.roles.add(role.yetki3); 
    message.channel.send(oxyemb.setColor(config.renk_mor).setDescription(`<@!${oxy.id}> ** adlı Kullanıcı <@!${message.author.id}> Tarafından Yetki Verildi.**\n\n\`•\` Yetki Veren : <@!${message.author.id}> \`${message.author.id}\`\n\`•\` Yetki Verilen : <@!${oxy.id}> \`${oxy.id}\`\n\`•\` Verilme Tarihi  : \`${oxytarih}\``)).then(o => o.delete({timeout: 10000}));
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yetkiver"],
    permLevel: 0
  };

exports.help = {
    name: "ytver",
    description: "isim geçmişini gösterir",
    usage: ".yetkial @uye "
  };