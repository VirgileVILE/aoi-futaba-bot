const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("/");
var persoPref = {};

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
        .addField("Liste des commandes disponibles :"," /aide : envoi la liste des commandes (MP) \n /data : données d'utilisateur (MP) \n /knuckles (suivi d'une phrase) : ajoute un & Knuckles \n /perso (suivi d'un nom) : enregistre le nom de votre personnage préféré \n /perso_de (suivi ou non d'un utilisateur) : révèle le nom du personnage préféré par l'utilisateur ciblé \n /robotnik (suivi d'une phrase) : RRRRRRRRRRRobotnik! \n /trap : affiche une surprise")  
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
        .addField("Tag :", message.author.tag, true)
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
    
    var cmd_matcher = message.content.match(/^\/([^ ]*)(?:[ ]+(.*))?[ ]*$/);
    if (cmd_matcher) {
        var cmd = cmd_matcher[1];
        var arg = cmd_matcher[2];
        if (cmd === "perso") {
            if (arg) {
                persoPref[message.author.id] = arg;
            }
        }
        if (cmd === "perso_de") {
            var found = false;
            for (let [id, user] of message.mentions.users) {
                if (user.tag === "Aoi Futaba#5587") {
                    message.reply(decodeURIComponent("mais c'est toi mon chou !"));
                }
                else {
                    perso = persoPref[id];
                    if (perso) {
                        message.reply("le personnage fétiche de " + user.username + " est " + perso);
                    }
                    else {
                        message.reply("je ne sais pas qui est le personnage fétiche de " + user.username + " !");
                    }
                }
                found = true;
            }
            if(!found) {
                perso = persoPref[message.author.id];
                if (perso) {
                    message.reply("votre personnage fétiche est " + perso);
                }
                else {
                    message.reply("vous ne n'avez pas raconté qui est votre personnage fétiche.");
                }
            }
        }

        if (cmd === "robotnik") {
            message.reply(arg.replace(/r/ig,"RRRRRRRRRRR"));
            var image_url = "https://i.imgur.com/NxE8LNU.gif";
            var embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setImage(image_url);
            message.channel.send(embed);
        }
        if (cmd === "knuckles") {
            if (arg) {
                message.reply(arg + " & Knuckles");
            }  
        }
    }
});
