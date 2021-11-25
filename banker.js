const Discord = require('discord.js');
const config = require('./config.json')
const request = require('request');
const { MessageEmbed } = require('discord.js')
 
// evet arkadaşlar fayikcim takliti diyenler için eco configle uğraşmak istemediğim için böyle bişe yaptım teşekkürler
const roleg = require("discord.js");
const channelg = require("discord.js");
const serverg = require("discord.js");
const memberg = require("discord.js");

const client1 = new roleg.Client();
const client2 = new channelg.Client();
const client3 = new serverg.Client();
const client4 = new memberg.Client();
// ----------------------------------------------- Role Guard ----------------------------------------------- \\

client1.on('roleDelete',async role => {
let guild = client1.guilds.cache.get(config.ServerID)
let channel = guild.channels.cache.get(config.RoleGuardLog)
let member = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
Karar1(member.executor.id, "ban");
KorumaAc1(config.ServerID)
let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()

if(!channel) return client1.users.cache.get(config.BotOwner).send(` <@${member.executor.id}> \`${member.executor.id}\` tarafından ${role.name} \`${role.id}\` Rolü Silindi Üye ${Member.bannable ? "Banlandı" : "Banlanamadı"}`)
channel.send(`@everyone  <@${member.executor.id}> \`${member.executor.id}\` tarafından ${role.name} \`${role.id}\` Rolü Silindi Üye ${Member.bannable ? "Banlandı" : "Banlanamadı"}`)
});

client1.on('roleUpdate',async (oldRole, newRole) => {
let member = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
let guild = client1.guilds.cache.get(config.ServerID)
let channel = guild.channels.cache.get(config.RoleGuardLog)

Karar1(member.executor.id, "ban");
KorumaAc1(config.ServerID)

newRole.edit({ ...oldRole })
let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()

if(!channel) return client1.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${oldRole.name} \`${oldRole.id}\` Rolü Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
channel.send(`@everyone  <@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${oldRole.name} \`${oldRole.id}\` Rolü Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)

})
    
client1.on('roleCreate',async role => {
let member = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised1(member.executor.id)) return;
let guild = client1.guilds.cache.get(config.ServerID)
let channel = guild.channels.cache.get(config.RoleGuardLog)
Karar1(member.executor.id, "ban");
await role.delete({ reason: 'Banker Guard System!'})
KorumaAc1(config.ServerID)
let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()
if(!channel) return client1.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${role.name} \`${role.id}\` Rolü Açıldı Rolü Sildim Üye ${member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
channel.send(`@everyone <@${member.executor.id}> \`${member.executor.id}>\` Tarafından ${role.name} \`${role.id}\` Rolü Açıldı Rolü Sildim Üye ${member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client1.on("ready",async () => {
client1.user.setPresence({ activity: { name: config.roleGuardActivity }, status: "online" });
client1.channels.cache.get(config.voiceChannel).join()
console.log(`[Role Guard] Başarılı Bir Şekile Sese Giriş Yaptı`)
});

client1.login(config.RoleToken).then(() => console.log(`[Role Guard] ${client1.user.tag} olarak giriş yaptı!`)).catch(() => console.log(`[Role Guard] Bot giriş yapamadı!`));


function whitelised1(kisiID) {
let Member = client1.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
let whitelistedmember = config.WhiteList || [];
if (!Member || Member.id === client1.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
else return false;
};

function Karar1(UserID, tur) {
let uye = client1.guilds.cache.get(config.ServerID).members.cache.get(UserID);
if (!uye) return;
if (tur == "ban") return uye.ban({ reason: "Banker Guard System!" }).catch();
};
function KorumaAc1(ServerID) {
let sunucu = client1.guilds.cache.get(ServerID);
if (!sunucu) return;
sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") ||r.permissions.has("MANAGE_CHANNELS")|| r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
  await r.setPermissions(0);
});
}
// ----------------------------------------------- Channel Guard ----------------------------------------------- \\ 

client2.on('channelCreate',async channel => {
  let guild = client2.guilds.cache.get(config.ServerID)
  let logger = guild.channels.cache.get(config.ChannelGuardLog)  
  let member = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;

 Karar2(member.executor.id, "ban");

 await channel.delete().catch();
KorumaAc2(config.ServerID);

let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client2.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Açıldı Üye ${member.bannable ? 'Banlandı': 'Banlanamadı'}`)
logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Açıldı Üye ${member.bannable ? 'Banlandı': 'Banlanamadı'}`)
})



client2.on('channelUpdate',async (oldChannel , newChannel) => {
let member = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;
let guild = client2.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ChannelGuardLog) 
 Karar2(member.executor.id, "ban");
KorumaAc2(config.ServerID);


newChannel.edit({ ...oldChannel })
let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client2.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${newChannel.name} \`${oldChannel.id}\` Kanalı Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${newChannel.name} \`${oldChannel.id}\` Kanalı Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
});



client2.on('channelDelete',async channel => {
let member = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised2(member.executor.id)) return;
let guild = client2.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ChannelGuardLog) 
 Karar2(member.executor.id, "ban");
await channel.clone();
KorumaAc2(config.ServerID);
 let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()  
if(logger) return client2.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${channel.name} \`${channel.id}\` Kanalı Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})


client2.on("ready",async () => {
client2.user.setPresence({ activity: { name: config.channelGuardActivity }, status: "online" });
client2.channels.cache.get(config.voiceChannel).join()
console.log(`[Channel Guard] Başarılı Bir Şekile Sese Giriş Yaptı`)
});
    
client2.login(config.ChannelToken).then(() => console.log(`[Channel Guard] ${client2.user.tag} olarak giriş yaptı!`)).catch(() => console.log(`[Channel Guard] Bot giriş yapamadı!`));
    
    
function whitelised2(kisiID) {
let Member = client2.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
let whitelistedmember = config.WhiteList || [];
if (!Member || Member.id === client2.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
else return false;
};
    
function Karar2(UserID, tur) {
let uye = client2.guilds.cache.get(config.ServerID).members.cache.get(UserID);
if (!uye) return;
if (tur == "ban") return uye.ban({ reason: "Banker Guard System!" }).catch();
};
    

function KorumaAc2(ServerID) {
  let sunucu = client2.guilds.cache.get(ServerID);
  if (!sunucu) return;
  sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD")|| r.permissions.has("MANAGE_CHANNELS") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
    await r.setPermissions(0);

  });
}


// ----------------------------------------------- Server Guard ----------------------------------------------- \\

client3.on('guildUpdate',async (oldGuild , newGuild) => {
let guild = client3.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog) 
let member = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised3(member.executor.id)) return;
if(newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
Karar3(member.executor.id, 'ban');
 KorumaAc3(config.ServerID);
let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()  
await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
if(!logger) return client3.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından Sunucu Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından Sunucu Güncellendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client3.on('guildUpdate', async (oldGuild, newGuild) => {
let guild = client3.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog) 
let member = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
if (!member || !member.executor || Date.now()-member.createdTimestamp > 5000 || whitelised3(member.executor.id)) return;
if(newGuild.vanityURLCode === null) return;
if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;  
 Karar3(member.executor.id, 'ban');
KorumaAc3(config.ServerID);

let Member = guild.member(member.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client3.users.cache.get(config.BotOwner).send(`<@${member.executor.id}> \`${member.executor.id}\` Tarafından ${config.ServerURL} Olan Sunucu URL si Değişti Üye ${Member.bannable ? 'Banlandı': 'Banlanamadı'}`)
logger.send(`@everyone <@${member.executor.id}> \`${member.executor.id}\` Tarafından ${config.ServerURL} Olan Sunucu URL si Değişti Üye ${Member.bannable ? 'Banlandı': 'Banlanamadı'}`)
  
request({  
method: 'PATCH',
url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`, // url guardı deneyemedim ama çalışması lazım
body: {
code: config.ServerURL},
json: true,
headers: {
"Authorization": `Bot ${config.ServerToken}`}
}, 
(err) => {
if (err) {
return console.log(err);
}
});
});

client3.on("ready",async () => {
client3.user.setPresence({ activity: { name: config.serverGuardActivity }, status: "online" });
client3.channels.cache.get(config.voiceChannel).join()
console.log(`[Server Guard] Başarılı Bir Şekile Sese Giriş Yaptı`)
});
    
client3.login(config.ServerToken).then(() => console.log(`[Server Guard] ${client3.user.tag} olarak giriş yaptı!`)).catch(() => console.log(`[Server Guard] Bot giriş yapamadı!`));
    
    
function whitelised3(kisiID) {
let Member = client3.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
let whitelistedmember = config.WhiteList || [];
if (!Member || Member.id === client3.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
else return false;
};
    
function Karar3(UserID, tur) {
let uye = client3.guilds.cache.get(config.ServerID).members.cache.get(UserID);
if (!uye) return;
if (tur == "ban") return uye.ban({ reason: "Banker Guard System!" }).catch();
};

function KorumaAc3(ServerID) {
let sunucu = client3.guilds.cache.get(ServerID);
if (!sunucu) return;
sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") ||r.permissions.has("MANAGE_CHANNELS")|| r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
await r.setPermissions(0);

});
}


// ----------------------------------------------- Member Guard ----------------------------------------------- \\



client4.on("guildMemberAdd", async member => {
let guild = client4.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog) 
let yapan = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
if (!member.user.bot || !yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return;
Karar4(yapan.executor.id, "ban");
KorumaAc4(config.ServerID);
Karar4(member.id, "ban");
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Botu Sunucuya Eklendi! Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@everyone <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Botu Sunucuya Eklendi! Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client4.on('guildMemberRemove',async member => {
let guild = client4.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog)
let yapan = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return;
Karar4(yapan.executor.id, "ban" )
KorumaAc4(config.ServerID);
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}> Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Kicklendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}>\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Kicklendi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client4.on('guildBanAdd',async member => {
let guild = client4.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog) 
let yapan = await member.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
Karar4(yapan.executor.id, 'ban');
KorumaAc4(config.ServerID);
await member.guilds.unban(member.id)
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Banlandı Yapan ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından <@${member.id}> \`${member.id}\` Üyesi Sağ Tık Banlandı Yapan ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client4.on("webhookUpdate", async channel => {
 let guild = client4.guilds.cache.get(config.ServerID)
 let logger = guild.channels.cache.get(config.ServerGuardLog) 
 let yapan = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_DELETE'}).then(audit => audit.entries.first());
 if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
Karar4(yapan.executor.id, 'ban');
KorumaAc4(config.ServerID);
const webhooks = await channel.fetchWebhooks()
await webhooks.array().forEach(x=>x.delete({reason:"webhookacildi"}).catch())
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)   
});



client4.on("webhookUpdate", async channel => {
 let guild = client4.guilds.cache.get(config.ServerID)
 let logger = guild.channels.cache.get(config.ServerGuardLog) 
 let yapan = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
 if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
const webhook = yapan.target;
Karar4(yapan.executor.id, 'ban');
await webhook.delete()  
KorumaAc4(config.ServerID);
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Açıldı Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından Webhook Açıldı Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)   
});

client4.on("emojiDelete", async emoji => {
const yapan = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
if (!yapan || !yapan.executor || Date.now()-yapan.createdTimestamp > 5000 || whitelised4(yapan.executor.id)) return; 
let guild = client4.guilds.cache.get(config.ServerID)
let logger = guild.channels.cache.get(config.ServerGuardLog) 
Karar4(yapan.executor.id, 'ban');
KorumaAc4(config.ServerID)
await emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
let Member = guild.member(yapan.executor.id);
if(Member && Member.bannable) Member.ban()  
if(!logger) return client4.users.cache.get(config.BotOwner).send(`<@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından ${emoji.name} Emojisi Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
logger.send(`@here <@${yapan.executor.id}> \`${yapan.executor.id}\` Tarafından ${emoji.name} Emojisi Silindi Üye ${Member.bannable ? 'Banlandı' : 'Banlanamadı'}`)
})

client4.on("ready",async () => {
client4.user.setPresence({ activity: { name: config.MemberGuardActivity }, status: "online" });
client4.channels.cache.get(config.voiceChannel).join()
console.log(`[Member Guard] Başarılı Bir Şekile Sese Giriş Yaptı`)
});
      
client4.login(config.MemberToken).then(() => console.log(`[Member Guard] ${client4.user.tag} olarak giriş yaptı!`)).catch(() => console.log(`[Member Guard] Bot giriş yapamadı!`));
      
function whitelised4(kisiID) {
let Member = client4.guilds.cache.get(config.ServerID).members.cache.get(kisiID);
let whitelistedmember = config.WhiteList || [];
if (!Member || Member.id === client4.user.id || Member.id === config.BotOwner || Member.id === Member.guild.owner.id || whitelistedmember.some(g => Member.id === g.slice(1) || Member.roles.cache.has(g.slice(1)))) return true
else return false;
};      
function Karar4(UserID, tur) {
let uye = client4.guilds.cache.get(config.ServerID).members.cache.get(UserID);
if (!uye) return;
if (tur == "ban") return uye.ban({ reason: "Banker Guard System!" }).catch();
};

function KorumaAc4(ServerID) {
let sunucu = client4.guilds.cache.get(ServerID);
let logger = client4.guild.cache.get(config.MemberGuardLog)
if (!sunucu) return;
sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR")||r.permissions.has("MANAGE_CHANNELS") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
await r.setPermissions(0);
});
}
      

// ----------------------------------------------- SON ----------------------------------------------- \\
