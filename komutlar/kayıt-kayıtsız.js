const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require("moment");
const ms = require('ms')
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');

exports.run = async (client, message, args) => {
  let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
  let oxy = message.guild.member(member)
  let sebep = args.splice(1).join(" ");
  const oxyemb = new MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)
  
  if (message.author.bot || message.channel.type === "dm") return;
  if(!message.member.roles.cache.has(roles.registerCommander) && (!message.member.roles.cache.has(roles.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
  return message.channel.send(oxyemb.setDescription(`**Ops** Yeterli Yetkiye Sahip Değilsin.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
  if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
  if(!roles.unregister1) return message.channel.send(oxyemb.setDescription('**Ops** Kayıtsız Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
  if(!roles.unregister2) return message.channel.send(oxyemb.setDescription('**Ops** Kayıtsız Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
  if(oxy.id === message.author.id) return message.channel.send(oxyemb.setDescription(`**Sen Çok Akıllısın Kanka.**`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 5000}));
  if(member.roles.cache.has(roles.ownerCommander)) return message.channel.send(oxyemb.setDescription(`**Sen Çok Akıllısın Kanka.**`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 5000}));
  if(member.roles.cache.has(roles.ownerCommander)) return message.channel.send(oxyemb.setDescription(`**Sen Çok Akıllısın Kanka.**`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 5000}));
  if(oxy.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(oxyemb.setDescription(`**Kendinle Aynı/Üst Role Ship Üyeleri Kayıtsıza Atamazsın.**`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 5000}));
  if(!sebep) return message.channel.send(oxyemb.setDescription(`**Kişiyi neden kayıtsıza atıcaksın ?**`).setColor(config.renk_kırmızı)).then(o => o.delete({timeout: 5000}));

message.channel.send(oxyemb.setDescription(`**${oxy} Adlı Kullanıcı Başarıyla Kayıtsıza Atıldı.**`).setColor(config.renk_yesil)).then(o => o.delete({timeout: 10000}));
oxy.setNickname(`${config.tag2} ${sebep}`);
oxy.roles.add(roles.unregister1);
oxy.roles.add(roles.unregister2);
oxy.roles.cache.forEach(r => {
oxy.roles.remove(r.id)
});

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unregister'],
    permLevel: 0,
}

exports.help = {
      name: "kayıtsız"  
}