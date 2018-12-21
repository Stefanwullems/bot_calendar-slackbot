import startBot from "./bot";
import connectTpGoogleCalendar from "./google-calendar";

function main() {
  connectTpGoogleCalendar();
  startBot();
}

main();
