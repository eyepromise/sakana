var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'c4ad429c-4046-4bf2-8d94-303aea58753c',
    appPassword: 'CLF3jnBrXFryCY3rZRARn27'
});

var bot = new builder.UniversalBot(connector);

// Listen for messages on /api/messages
server.post('/api/messages', connector.listen());

bot.dialog(function (message) {
       if (identity.id === message.address.bot.id){
       var name = message.user ? message.user.name : null;
       var reply = new builder.Message()
       .address(message.address)
       .text("Hello %s. How are you today?", name || 'there');
       bot.send(reply);
       console.log(reply);
       } else {
            //delete their data
       }
       
});
