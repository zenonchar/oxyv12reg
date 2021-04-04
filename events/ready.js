
const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const config = require('../oxy/config.json');

module.exports = client => {
console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`);
console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
console.log(`Zeynep Aşkım Çok Seviyorum Seni Beeeeee`);
client.user.setPresence({activity:{name:config.durum},status: 'idle'})
};
