var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.beginDialog('reminder', session.userData.profile);
    },
    function (session, results) {}
]);

bot.dialog('reminder', [
    function (session) {
        var msg = new builder.Message(session)
            .addAttachment({
                contentType: "application/vnd.microsoft.card.adaptive",
                content: {
                    type: "AdaptiveCard",
                    body: [{
                            "type": "TextBlock",
                            "text": "Reminder",
                            "size": "large",
                            "weight": "bolder"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Today is your day!"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Set reminder?"
                        },
                        {
                            "type": "Input.ChoiceSet",
                            "id": "reminderTime",
                            "style": "compact",
                            "choices": [{
                                    "title": "3:00 PM",
                                    "value": "15",
                                    "isSelected": true
                                },
                                {
                                    "title": "4:00 PM",
                                    "value": "16"
                                },
                                {
                                    "title": "5:00 PM",
                                    "value": "17"
                                }
                            ]
                        }
                    ],
                    "actions": [
                    ]
                }
            });
        session.send(msg)
    }
]);