// Requires
var irc = require('irc'),
    http = require('https'),
    logger = require('./logger');

var ircServer = 'irc.mozilla.org',
    nick = 'AutomationBot',
    options = {channels: ['#automation'],},
    client = new irc.Client(ircServer, nick, options),
    help = { ":help" : "This is Help! :)",
             ":gist" : "Gives you a link to Pastebin",
            };

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    logger.log({channel:to, from:from, message:message});
    if (message.search(nick) >= 0){
        if (message.search(" hi[ $]?") >= 1){
           client.say(to, "Hi hi " + from);
       }
       if (message.search("damn you") >= 0) {
            client.say(to, "I am so sorry " + from + ", can we hug?");
       }
    }

    if (message.search(":gist") === 0){
        client.say(to, "Please paste >3 lines of text to http://pastebin.mozilla.org");
    }

    if (message.search(":help") === 0){
        for (var item in help){
            client.say(to, item + " : " + help[item]);
        }
    }
});

client.addListener('join', function(channel, who){
    logger.log({channel:channel, action: "join", who: who});
});

client.addListener('part', function(channel, who, reason){
    logger.log({channel:channel, action: "part", who: who, reason:reason})
});

client.addListener('kick', function(channel, who, by, reason) {
    logger.log({who:who, channel:channel, by:by, reason:reason, action:'kick'});
});

client.addListener('invite', function(channel, from){
    logger.log({channel:channel, action:"invite", from:from});
});

client.addListener('nick', function(oldnick, newnick, channel){
    logger.log({channel:channel, action:"nick", oldnick:oldnick, newnick:newnick});
});

client.addListener('error', function(message){
    console.error("message");
});
