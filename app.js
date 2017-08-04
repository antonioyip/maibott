var restify = require('restify')
var builder = require('botbuilder')
var cards = require('./cards')

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

// Listen for messages from users 
server.post('/api/messages', connector.listen())

var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.beginDialog('start', session.userData.profile)
    },
    function (session, results) {}
])

bot.dialog('start', function (session, args) {
    var savedAddress = session.message.address

    console.log(savedAddress)

    var message = 'Thanks for registering!'
    session.send(message)

    setTimeout(sendReminder, 2000, savedAddress)
})

function sendReminder(address) {
    if (address) {
        console.log('Sending reminder to user')
        //delete address.conversation
        bot.beginDialog(address, 'reminder')
    } else {
        console.log('Invalid address found')
    }
}

bot.dialog('reminder', [
    function (session) {
        var msg = new builder.Message(session)
            .addAttachment({
                contentType: "application/vnd.microsoft.card.adaptive",
                content: cards.reminderCard
            })
        session.send(msg)
    }
])