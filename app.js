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

// Listen for messages from users
server.post('/api/messages', connector.listen())

// Receive messages from the user and respond by echoing each message
// back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
                                   function (session, args, next) {
                                               if (!session.userData.name){
                                               session.beginDialog('profile');
                                               } else {
                                               next();
                                               }
                                               },
                                               function (session,results){
                                               session.sendTyping();
                                               setTimeout(function () {
                                              session.send('Hello %s', session.userData.name);
                                              }, 3000);
                                               }
]);
