var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'c4ad429c-4046-4bf2-8d94-303aea58753c',
    appPassword: 'CLF3jnBrXFryCY3rZRARn27'
});


// Listen for messages
server.post('/api/messages', connector.listen());

//Setup Bot
var bot = new builder.UniversalBot(connector, [
        //Default Dialog
                function(session){
                     session.endDialog("Hello," + session.userData.name + ". Sakana is a bot that can help with a mulitude of tasks. Currently in Development.");
                      builder.Prompts.choice(session, "Here are some functions being worked on:", "Salesforce|Hubspot|Analytics", builder.ListStyle.button);

                }
]);
