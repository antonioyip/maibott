var reminderCard = {
    "type": "AdaptiveCard",
    "body": [{
            "type": "TextBlock",
            "text": "Reminder",
            "size": "large",
            "weight": "bolder"
        },
        {
            "type": "TextBlock",
            "text": "Today is your day!"
        }
    ],
    "actions": [{
        "type": "Action.ShowCard",
        "title": "Remind me in...",
        "card": {
            "type": "AdaptiveCard",
            "body": [],
            "actions": [{
                    "type": "Action.Submit",
                    "title": "1",
                    "data": {
                        "type": "1"
                    }
                },
                {
                    "type": "Action.Submit",
                    "title": "2",
                    "data": {
                        "type": "2"
                    }
                }
            ]
        }
    }]
}

module.exports = {
    reminderCard: reminderCard
}