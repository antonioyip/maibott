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
                            "time": "1",
                            "type": "snooze"
                        }
                    },
                    {
                        "type": "Action.Submit",
                        "title": "2",
                        "data": {
                            "time": "1",
                            "type": "snooze"
                        }
                    }
                ]
            }
        },
        {
            "type": "Action.Submit",
            "title": "Acknowledge",
            "data": {
                "type": "acknowledge"
            }
        }
    ]
}

module.exports = {
    reminderCard: reminderCard
}