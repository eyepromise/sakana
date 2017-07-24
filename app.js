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


// Receive messages from the user and respond by echoing each message
// back (prefixed with 'You said:')
bot.dialog('/', function (session, args) {
                if (!session.userData.greeting){
                    session.send("Hello. What is your name?");
                    session.userData.greeting = true;
                        } else if (!session.userData.name){
                        getName(session);
                        } else {
                        session.userData = null;
                    }

            function getName(session){
            //send bot is typing message
           name = session.message.text;
           session.userData.name=name;
           session.send("Hello, " + name + ".");
           
           //session.sendTyping();
           //setTimeout(function () {
           //session.send('Hello %s. How can I help you?', session.userData.name);
           //}, 3000);
            }
           });

//bot.dialog('profile', [
//        function (session){
//                builder.Prompts.text(session, 'Hello. What is your name?');
//                },
//                function (session, results){
//                        session.userData.name=results.response;
//                        session.endDialog();
//                }
]);

//Invoke Sakana
bot.dialog('sakana', function (session, args, next) {
           session.endDialog("Hello," + session.userData.name + ". Sakana is a bot that can help with a mulitude of tasks. Currently in Development.");
           builder.Prompts.choice(session, "Here are some functions being worked on:", "Salesforce|Hubspot|Analytics", builder.ListStyle.button);

           })
.triggerAction({
               matches: /^sakana$/i,
               onSelectAction: (session, args, next) => {
               session.beginDialog(args.action, args);
               }
               });

//Button Test
bot.dialog('product', function (session, args, next) {
           builder.Prompts.choice(session, "Which product?", "Restore|EZ Tears|Zeaxanthin", builder.ListStyle.button);

           })
.triggerAction({
               matches: /^product$/i,
               onSelectAction: (session, args, next) => {
               session.beginDialog(args.action, args);
               }
            });
