const Discord = require('discord.js')
const db = require('quick.db')
const roles = require('../oxy/roles.json');
const emoji = require('../oxy/emojis.json');
const config = require('../oxy/config.json');
const chnl = require('../oxy/channels.json');

exports.run = async (client, message, args) => {
    let isim = args[1];
    let yas = args[2];
    let member = message.mentions.members.first() || client.users.cache.get(args.join(' '));
    let oxy = message.guild.member(member)
    let tag_isim = config.tag + " " + isim + config.tırnak + yas
    let oxy_isim = config.tag2 + " " + isim + config.tırnak + yas
const oxyemb = new Discord.MessageEmbed().setAuthor(message.member.displayName,message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(config.durum)
let sohbet = message.guild.channels.cache.get(chnl.GenelChat); 

if (message.author.bot || message.channel.type === "dm") return;
if(!message.member.roles.cache.has(roles.registerCommander) && (!message.member.roles.cache.has(roles.botCommander) && !message.member.hasPermission('VIEW_AUDIT_LOG')))
return message.channel.send(oxyemb.setDescription(`**Ops** Yeterli Yetkiye Sahip Değilsin.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!roles.kadın1) return message.channel.send(oxyemb.setDescription('**Ops** Kayıtlı Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!roles.unregister1) return message.channel.send(oxyemb.setDescription('**Ops** Kayıtsız Rolü Ayarlanmamış.').setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!member) return message.channel.send(oxyemb.setDescription(`**Ops** Bir Üye Etiketlemeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if (oxy.roles.cache.get(roles.erkek1)) return message.channel.send(oxyemb.setDescription(`**Ops** Bu Kullanıcı <@&${roles.erkek1}> Olarak Kayıtlı Durumda.`)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if (oxy.roles.cache.get(roles.kadın1)) return message.channel.send(oxyemb.setDescription(`**Ops** Bu Kullanıcı <@&${roles.kadın1}> Olarak Kayıtlı Durumda.`)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!isim) return message.channel.send(oxyemb.setDescription(`**Ops** İsim Girmeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!yas) return message.channel.send(oxyemb.setDescription(`**Ops** Yaş Girmeyi Unutmuşsun.`).setColor(config.renk_kırmızı)).then(o => o.delete({ timeout: 10000 })).catch(err => console.error(error));
if(!chnl.GenelChat) message.channel.send(oxyemb.setDescription(`**Ops** Genel Chat Kanalını Ayarlamayı Unutmuşsun.`).setColor(config.renk_kırmızı)).sten(o => o.delete({timeout: 10000})).catch(err => console.error(error))

if(!oxy.user.username.includes(config.tag)) 
await oxy.setNickname(oxy_isim); 
else {await oxy.setNickname(oxy_isim)};
await oxy.roles.add(roles.kadın1);
await oxy.roles.add(roles.kadın2);
await oxy.roles.add(roles.kadın3);
await oxy.roles.remove(roles.unregister1);
await oxy.roles.remove(roles.unregister2);

//=================DATA BASE=================//
db.add(`kadınKayıt_${message.author.id}`, 1)
db.add(`toplamKayıt_${message.author.id}`, 1)
db.push(`isimler_${oxy.id}`, `${oxy_isim} [**<@&${roles.kadın1}>**]`);
let isimler = db.get(`isimler_${oxy.id}`)
let liste=""
if (isimler) {
var sayı = 0
sayı = isimler.lenght
for(let i = 0;i<isimler.length;i++){liste+=`\n\`${i+1}.\` ${isimler[i]}`}
}
//=================DATA BASE=================//

await message.react(emoji.tik_emoji);
message.channel.send(oxyemb.setDescription(`**<@${member.id}> adlı kullanıcı <@&${roles.kadın1}> olarak kayıt edildi.** ( <#${chnl.rules}> ) **Kuralları Okumayı Unutma.**\n **${liste}**`).setColor(config.renk_yesil))
sohbet.send(`${emoji.hg_emoji} **<@${member.id}> adlı kullanıcı aramıza katıldı. Hoşgeldin.**`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kadın','k','kız','girl'],
    permLevel: 0
};

exports.help = {
    name: 'kız',
};