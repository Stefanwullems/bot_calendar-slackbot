import connectToGoogleCalendar from "./google-calendar";
import * as request from "superagent";

function startBot() {
  setInterval(function() {
    const date = new Date();
    connectToGoogleCalendar(checkIfEventStartsSoon, {
      timeMin: new Date(Date.now() + 1740000).toISOString(),
      timeMax: new Date(Date.now() + 1800050).toISOString()
    });
    connectToGoogleCalendar(checkIfEventStartsNow, {
      timeMin: new Date(Date.now() - 60000).toISOString(),
      timeMax: new Date(Date.now()).toISOString()
    });

    if (date.getHours() === 20 && date.getMinutes() === 0) {
      connectToGoogleCalendar(checkIfThereAreEventsPlanned, {
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + 86400000).toISOString()
      });
    }
  }, 60000);
}

function checkIfThereAreEventsPlanned(events: Event[]) {
  if (events.length) {
    sendMessageToSlack(
      "You don't have anything planned for the next 24 hours. Click this link to plan something: https://calendar.google.com/calendar/r/week"
    );
  }
}

function checkIfEventStartsSoon(events: Event[]) {
  if (events.length) {
    events.forEach(event => {
      if (Date.now() < Date.parse(event.start.dateTime) - 1800000)
        sendMessageToSlack(`You have ${event.summary} starting in 30 minutes`);
    });
  }
}

function checkIfEventStartsNow(events: Event[]) {
  if (events.length) {
    events.forEach(event => {
      if (Date.now() < Date.parse(event.start.dateTime))
        sendMessageToSlack(`You have ${event.summary} starting now`);
    });
  }
}

function sendMessageToSlack(message: string) {
  request
    .post(
      "https://hooks.slack.com/services/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"
    )
    .set("Content-Type", "application/json")
    .send({ text: message })
    .then(console.log);
}

export default startBot;
