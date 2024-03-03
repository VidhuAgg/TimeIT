// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");
const cron = require("node-cron");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(
  "xoxb-5133325616753-5207395393319-9bcA1Ih0Ch1E4vVQqJ16nyNB",
  {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG,
  }
);

// IDs of all the members of the channel
member_ids = [];

const { App } = require("@slack/bolt");

const app = new App({
  token: "xoxb-5133325616753-5207395393319-9bcA1Ih0Ch1E4vVQqJ16nyNB",
  appToken:
    "xapp-1-A056LCHK5N0-5222004234530-939f28031de7e612e6f91aaeb38fb2a9ea17b09536446ec561d2c4a8c4933725",
  socketMode: true,
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes

app.event("app_mention", async ({ event, context, client, say }) => {
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Hey, <@${event.user}> how many hours did you work today?*`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "I worked 8 hours today",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "8-hours",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "I worked other amount of hours",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "not-8-hour",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "I did not work today",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "not-work",
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("8-hours", async ({ body, ack, say }) => {
  await ack();
  // post 8 hours to database
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Thanks for the reponse, have a good day!*`,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("not-8-hour", async ({ body, ack, say }) => {
  await ack();
  // do nothing
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          dispatch_action: true,
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "other-time",
          },
          label: {
            type: "plain_text",
            text: "Enter the amount of hours you worked today",
            emoji: true,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("not-work", async ({ body, ack, say }) => {
  await ack();
  // do nothing
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: "Was it a paid or unpaid leave?",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Paid Leave",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "paid-leave",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Unpaid Leave",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "unpaid-leave",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Sick leave",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "sickness-input",
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("paid-leave", async ({ body, ack, say }) => {
  await ack();
  // post piad leave to db
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Thanks for the reponse, have a good day!*`,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("sickness-input", async ({ body, ack, say }) => {
  await ack();
  // post piad leave to db
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          dispatch_action: true,
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "sickness",
          },
          label: {
            type: "plain_text",
            text: "Please state the reason for sickness",
            emoji: true,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("sickness", async ({ body, action, ack, say }) => {
  await ack();
  // post worrked hours on db
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }

    try {
      // Call the chat.delete method using the WebClient
      const result = await client.chat.delete({
        channel: body.container.channel_id,
        ts: body.container.message_ts,
      });
    } catch (error) {
      console.error(error);
    }
    console.log("reason: " + action.value) // value contains reason to put in database
    try {
      await say({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Thanks for the reponse, have a good day!*`,
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  
});

app.action("unpaid-leave", async ({ body, ack, say }) => {
  await ack();
  // post unpaid leave to
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Thanks for the reponse, have a good day!*`,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("other-time", async ({ body, action, ack, say }) => {
  await ack();
  // post worrked hours on db
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  if(!isNaN(parseInt(action.value))){
    console.log("value: " + action.value); //value field has the amount of hours in it
    try {
      await say({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Thanks for the reponse, have a good day!*`,
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }else{

    try {
      // Call the chat.delete method using the WebClient
      const result = await client.chat.delete({
        channel: body.container.channel_id,
        ts: body.container.message_ts,
      });
    } catch (error) {
      console.error(error);
    }
    try {
      await say({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Please enter a valid number!`,
            },
          },
          {
            dispatch_action: true,
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "other-time",
            },
            label: {
              type: "plain_text",
              text: "Enter the amount of hours you worked today",
              emoji: true,
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }

  }
  
  
});

app.action("start-date", async ({ body, action, ack, say }) => {
  await ack();
  console.log(action)
  var start_date = action.selected_date
  // post vaccation start date
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Selected start date is " + start_date
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Change",
              emoji: true
            },
            value: start_date,
            action_id: "select-start-date"
          }
        },
        {
			    type: "actions",
			    elements: [
				    {
					    type: "datepicker",
					    placeholder: {
						    type: "plain_text",
						    text: "End date",
						    emoji: true
					    },
					    action_id: "end-date"
				    }
			    ]
		    },
      ],
    });
  } catch (error) {
    console.error(error);
  }
  
});

app.action("end-date", async ({ body, action, ack, say }) => {
  await ack();
  console.log(action)
  var start_date = body.message.blocks[0].accessory?.value
  var end_date = action.selected_date
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  if(start_date >= end_date){
    try {
      await say({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `End date cannot be before Start date`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Selected start date is " + start_date
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Change",
                emoji: true
              },
              value: start_date,
              action_id: "select-start-date"
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "datepicker",
                placeholder: {
                  type: "plain_text",
                  text: "End date",
                  emoji: true
                },
                action_id: "end-date"
              }
            ]
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }else{
    // post start and end days to database
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Thanks for the reponse, have a good day!*`,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
}
});

app.action("select-start-date", async ({ body, ack, say }) => {
  await ack();
  //do nothing
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
		    {
			    type: "section",
			    text: {
				    type: "plain_text",
				    text: "Please enter vaccation days for this week",
				    emoji: true
			    }
		    },
		    {
			    type: "actions",
			    elements: [
				    {
					    type: "datepicker",
					    placeholder: {
						    type: "plain_text",
						    text: "Start date",
						    emoji: true
					    },
					    action_id: "start-date"
				    }
			    ]
		    },
		    {
			    type: "actions",
			    elements: [
				    {
					    type: "button",
					    text: {
						    type: "plain_text",
						    text: "No vaccation days",
						    emoji: true
					    },
					    value: "click_me_123",
					    action_id: "no-vaccation"
				    }
			    ]
		    }
	    ],
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("no-vaccation", async ({ body, ack, say }) => {
  await ack();
  // post no vaccation leave to
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Thanks for the reponse, have a good day!*`,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});


// channel needs to be users ID -> make this dynamic for all users
async function send_reminder(user_id) {
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.conversations.open({
      users : user_id
    });
    const history = await client.conversations.history(
      {
        channel : result.channel.id
      }
    )
    history.messages.forEach(async (message) => {
      if(message.blocks[0].text?.text == `*Hey, how many hours did you work today?*`){
       await client.chat.postMessage({
          channel: user_id,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "you forgot to Log your time yesterday!",
              },
            }, 
          ],
        })
      }
      delete_message(result.channel.id, message.ts)
    })
  } catch (error) {
    console.error(error);
  }
  client.chat
    .postMessage({
      channel: user_id,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Hey, how many hours did you work today?*`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "I worked 8 hours today",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "8-hours",
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "I worked other amount of hours",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "not-8-hour",
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "I did not work today",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "not-work",
              },
            ],
          },
        ],
    })
    .then((res) => {
      // `res` contains information about the posted message
      console.log("Message sent: ", res.ts);
    })
    .catch(console.error);
}

async function delete_message(channel_id, ts){
  try {
    // Call the chat.delete method using the WebClient
    const result = await client.chat.delete({
      channel: channel_id,
      ts: ts,
    });
  } catch (error) {
    console.error(error);
  }
}

async function send_weekly_reminder(user_id) {
  client.chat
    .postMessage({
      channel: user_id,
	    blocks: [
		    {
			    type: "section",
			    text: {
				    type: "plain_text",
				    text: "Please enter vaccation days for this week",
				    emoji: true
			    }
		    },
		    {
			    type: "actions",
			    elements: [
				    {
					    type: "datepicker",
					    placeholder: {
						    type: "plain_text",
						    text: "Start date",
						    emoji: true
					    },
					    action_id: "start-date"
				    }
			    ]
		    },
		    {
			    type: "actions",
			    elements: [
				    {
					    type: "button",
					    text: {
						    type: "plain_text",
						    text: "No vaccation days",
						    emoji: true
					    },
					    value: "click_me_123",
					    action_id: "no-vaccation"
				    }
			    ]
		    }
	    ],
    })
    .then((res) => {
      // `res` contains information about the posted message
      console.log("Message sent: ", res.ts);
    })
    .catch(console.error);
}

// schedule a task to run every day at a particular time
// every day
cron.schedule(
  "51 21 * * 1-6",
  () => {
    console.log("running a task every minute", member_ids);
    const user_ids = member_ids;
    user_ids.forEach((user_id) => {
      send_reminder(user_id);
    });
  },
  {
    scheduled: true,
    timezone: "Europe/Stockholm",
  }
);

//weekly vaccation reminder
cron.schedule(
  "37 18 * * 1",
  () => {
    console.log("running a task every minute", member_ids);
    const user_ids = member_ids;
    user_ids.forEach((user_id) => {
      send_weekly_reminder(user_id);
    });
  },
  {
    scheduled: true,
    timezone: "Europe/Stockholm",
  }
);


// get all the members of the channel and store their ids in member_ids
async function get_channel_member_ids(channel_id) {
  try {
    const result = await client.conversations.members({
      channel: channel_id,
    });
    return result.members;
  } catch (error) {
    console.error(error);
  }
}

// gets members of general channel and adds them to member_ids -> if everyone is not getting reminders, check this function
get_channel_member_ids("C053JGWHXT5").then((ids) => {
  member_ids.push(...ids);
});
