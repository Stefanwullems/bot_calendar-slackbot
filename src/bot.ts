import connectToGoogleCalendar from "./google-calendar";
import * as request from "superagent";

function startBot() {
  setInterval(function() {
    const date = new Date();
    if (date.getHours() === 20 && date.getMinutes() === 0) {
      connectToGoogleCalendar(checkIfThereAreEventsPlanned);
    }
  }, 5000);
}

export function checkIfThereAreEventsPlanned(events: any[]) {
  if (events.length) {
    sendMessageToSlack(
      "you don't have anything planned for the next 24 hours. Click this link to plan something: https://calendar.google.com/calendar/r/week"
    );
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
