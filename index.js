const Discord = require('discord.js');
const client = new Discord.Client();
const color = 'BLACK';
const token = process.env.token;
const prefix = '!';
const db = require('quick.db');
// Made By !                     Alo.#0001
client.on('ready', () => {
  console.log(`login ${client.user.tag}`);
client.user.setStatus("dnd");
client.user.setActivity(`${client.guilds.cache.size} Server`, { type: "PLAYING" });
});

client.on('message', msg => {
  if(msg.content.startsWith(prefix + "set-log")){
    if(!msg.guild) return;
    if(msg.author.bot) return;
    if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('**Dont Have Prems \`ADMINISTRATOR\`**')
    let log = msg.mentions.channels.first()
    if(!log) return msg.channel.send('**Please Mention This Room**')
    db.set(`log-${msg.guild.id}`, log)
    msg.channel.send(`**Done Select This Room ${log}**`)

    client.on('channelCreate', nc => {
  let embed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(`**New Channel**`)
  .setDescription(`**New Channel : \`\`\`${nc.name} \`\`\`**`)      
     .setAuthor(nc.guild.name, nc.guild.iconURL())
     .setTimestamp()
  log.send(embed)
  });

client.on('channelDelete', dc => {  let embed1 = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(`**Delete Channel **`)
  .setDescription(`**Name : \`\`\`${dc.name} \`\`\`**`)       .setAuthor(dc.guild.name, dc.guild.iconURL())
 .setTimestamp()
  log.send(embed1)
  });
 client.on('channelUpdate', (or,nr) => {
   if (or.name != nr.name) {
 
  let embed2 = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(`**Edit Channel**`)
  .addField(`Old Room Name`,`\`\`\`${or.name}\`\`\``,true)
  .addField(`New Room Name` ,`\`\`\`${nr.name}\`\`\``,true)
  .setAuthor(or.guild.name, or.guild.iconURL())
 .setTimestamp()
  log.send(embed2)
   }
  }); 
 client.on('messageDelete', message => {
    if(message.deleted === true) { 
      if(message.content.length === 0) return;
            let embed3 = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setColor(color)
  .addField(`Message :`,` \`\`\`${message.content} \`\`\``,true)       
   .addField(`Message By`,` ${message.author.username}`, true)
 log.send(embed3)
    }
  }); 
  }
});



  // create by ali 
require('./server')();
client.login(token);