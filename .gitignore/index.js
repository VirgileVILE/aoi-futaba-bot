const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("/");

bot.on('ready' , () => {
    bot.user.setPresence({ game: { name: '/aide', type: 0} })
    console.log("Bot ready for action!");
})

bot.login(process.env.TOKEN);

bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send('Bienvenue parmi nous ' + member.displayName)
    }).catch(console.error)
})

bot.on('message', message => {
    if (message.content === "ping"){
        message.reply ("pong");
        console.log('ping pong');
    }
    
    if (message.content === prefix + "aide"){
        var aide_embed = new Discord.RichEmbed()
        .setColor('#bec0e8')
        .addField("Liste des commandes disponibles :"," /aide : envoi la liste des commandes (MP) \n /data : données d'utilisateur (MP) \n /trap : affiche une surprise")  
        //message.channel.sendEmbed(aide_embed);
        message.reply("je t'ai envoyée la liste des commandes en MP.")
        message.author.send({embed: aide_embed});
        console.log("Commande Aide demandée !");
    }

        if (message.content === prefix + "data"){
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id

        var data_embed = new Discord.RichEmbed()
        .setColor('#bec0e8')
        .setTitle(`Données d'utilisateur : ${message.author.username}`)
        .addField(`Identifiant :`, msgauthor, true)
        .addField("Date de création :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("je t'ai envoyées tes données d'utilisateur en MP.")
        message.author.send({embed: data_embed});
        console.log("Commande Data demandée !");
    }

    if (message.content.startsWith(prefix + "trap")) {

        var trap = [
            "https://i.imgur.com/soXXmVf.jpg",
            "https://i.imgur.com/EzwVnCN.jpg",
            "https://i.imgur.com/91iTv8D.jpg",
            "https://i.imgur.com/2t7H2cB.jpg",
            "https://i.imgur.com/greggmQ.jpg",
            "https://i.imgur.com/v0b5N4P.jpg",
            "https://i.imgur.com/9cFAedP.jpg",
            "https://i.imgur.com/5yi6zXr.jpg",
            "https://i.imgur.com/JsdjvBO.jpg",
            "https://i.imgur.com/89ap5Vr.jpg"
        ];

        var jpg = trap[Math.floor(Math.random() * trap.length)];

        var trap_embed = new Discord.RichEmbed()
        .setColor('#bec0e8')
        .setImage(jpg)
        //message.reply("Traps are GAY: G-irls A-nd Y-ou should respect them.")
        message.channel.send(trap_embed);
        console.log("Commande Trap demandée !");
    }
});
