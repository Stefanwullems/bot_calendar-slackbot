import connectToGoogleCalendar from "./google-calendar";
import * as request from "superagent";

function startBot() {
  setInterval(function() {
    // const date = new Date();
    // if (date.getHours() === 20 && date.getMinutes() === 0) {
    connectToGoogleCalendar();
    // }
  }, 2000);
}

export default startBot;
