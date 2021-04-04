const Discord = require('discord.js');//
const client = new Discord.Client();//
const chalk = require('chalk');//
const moment = require('moment');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
require('./util/eventLoader.js')(client);//
const snekfetch = require('snekfetch');//

const roles = require('./oxy/roles.json');//
const channels = require('./oxy/channels.json');//
const config = require('./oxy/config.json');//
const settings = require('./oxy/settings.json');//
const emoji = require('./oxy/emojis.json');//

const log = message => {console.log(`${message}`);};//
const prefix = settings.prefix;

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === settings.oxy) permlvl = 4;
    return permlvl;
};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('message', message => {
  if (message.content.toLowerCase() === '.tag' || message.content.toLowerCase() === '!tag' || message.content.toLowerCase() === 'tag') {
    message.channel.send(`\`${config.tag}\``);
  }
});

client.on("guildMemberAdd", member => {
  var userSize = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var uS = userSize.match(/([0-9])/g)
  userSize = userSize.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(uS) {
    userSize = userSize.replace(/([0-9])/g, o => {
      return {
        '0': emoji.emoji_sıfır,
        '1': emoji.emoji_bir,
        '2': emoji.emoji_iki,
        '3': emoji.emoji_üç,
        '4': emoji.emoji_dört,
        '5': emoji.emoji_beş,
        '6': emoji.emoji_altı,
        '7': emoji.emoji_yedi,
        '8': emoji.emoji_sekiz,
        '9': emoji.emoji_dokuz}[o];})
      }
  require("moment-duration-format")
  let replies = ["https://media.discordapp.net/attachments/697505578972348436/806507415268622376/17.gif","https://media.discordapp.net/attachments/697505578972348436/801486319032205382/81f4a429035e1c8faec2078257a2eb7f.gif","https://media.discordapp.net/attachments/697505578972348436/806475926120300575/adf7d5b4c4df14d3638dfa07ba8c62fd.gif","https://media.discordapp.net/attachments/697505578972348436/803617905765777438/72f4b75d0d2a7d2314c25d3a5d687164.gif","https://media.discordapp.net/attachments/697505578972348436/807894209339195402/EL_HERUE_OSCURO.gif","https://media.discordapp.net/attachments/697505578972348436/807894365330472960/You_like_it_when_I_am_Crazy_Kurumi_x_Male_Reader.gif","https://media.discordapp.net/attachments/697505578972348436/807894194143494144/FOREVER_SAILOR_MOON.gif","https://media.discordapp.net/attachments/697505578972348436/807892907927273522/eacadb211638f1552be1a8c17d4680b0-1.gif"];
  let result = Math.floor((Math.random() * replies.length));
  const oxyemb = new Discord.MessageEmbed().setAuthor(client.username , "https://cdn.discordapp.com/avatars/760162970793410580/a_5f61b759f6e083abceda9b52f49af521.gif?size=128").setFooter(config.durum)
  let oxy = client.users.cache.get(member.id);
  let zaman = new Date().getTime() - oxy.createdAt.getTime();  
  const HGzaman = moment.duration(zaman).format(` YY **[Yıl]** MM **[Ay]** DD **[Gün]**`)
  const kanal = member.guild.channels.cache.find(r => r.id === channels.KayıtChat);
  const sKanal = member.guild.channels.cache.find(r => r.id === channels.SuspectLog);
  var kontrol;
  if(member.user.username.includes(config.tag)){member.roles.add(roles.tagRole)}
  moment.locale("tr");
  if (zaman < 1296000000){
    kontrol = `Güvenli Değilsin.`
    member.roles.add(roles.suspect)
    member.setNickname(config.newUsername)
    sKanal.send(`<:athena_tag:826084055988174868> **__ Athena'ya hoş geldin__** <@`+ member + `> \n\n   <:athena_tag:827614361232998480> Hesabın \`` + HGzaman + `\` önce oluşturulmuş. Bence **\`` + kontrol + `\`**\n\n   <:athena_tag:827614361232998480> Sunucu kurallarımız <#${channels.rules}> kanalında bulunmaktadır. Sunucu içerisindeki cezai işlemlerin kuralları okuduğun varsayılarak gerçekleştirilecektir.\n\n<:athena_tag:826084055988174868> Seninle beraber `+userSize+ ` kişiye ulaştık. Maalesef. Hesabın yeni olduğu için kayıt olamıyorsun bir **yetkiliyle iletişime geç.**`).catch(err => console.error(error));
  }else{
    kontrol = `Güvenlisin.`
    member.roles.add(roles.unregister1);
    member.roles.add(roles.unregister2);
    member.setNickname(config.oldUsername) 
    kanal.send(`<:athena_tag:826084055988174868> **__ Athena'ya hoş geldin__** <@`+ member + `> \n\n   <:athena_tag:827614361232998480> Hesabın \`` + HGzaman + `\` önce oluşturulmuş. Bence **\`` + kontrol + `\`**\n\n   <:athena_tag:827614361232998480> Sunucu kurallarımız <#${channels.rules}> kanalında bulunmaktadır. Sunucu içerisindeki cezai işlemlerin kuralları okuduğun varsayılarak gerçekleştirilecektir.\n\n<:athena_tag:826084055988174868> Seninle beraber `+userSize+ ` kişiye ulaştık. Sol tarafta bulunan \`V.Confirmed\` kanallarından birine girerek kayıt işlemini gerçekleştirebilirsin! İyi eğlenceler.`).catch(err => console.error(error));
  }
});

client.on('warn', m => console.log(`[WARN]:${m}`));
client.on('error', m => console.log(`[ERROR]: ${m}`));
process.on('uncaughtException', error => console.log(`[ERROR]: ${error}`));
process.on('unhandledRejection', err => console.log(`[ERROR]: ${err}`));

client.login(settings.token);