import * as fs from "fs";
import * as readline from "readline";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { GenerateAuthUrlOpts } from "google-auth-library/build/src/auth/oauth2client";
import { calendarIds } from "./secrets";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

export default function(
  callback: (events: Event[]) => void,
  timeFrame: TimeFrame
) {
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content.toString()), callback, timeFrame);
  });
}

function authorize(
  credentials: Credentials,
  callback: (events: Event[]) => void,
  timeFrame: TimeFrame
): void {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    fetchEvents(oAuth2Client, callback, timeFrame);
  });
}

function getAccessToken(client: OAuth2Client, callback) {
  logAuthUrl(client, { access_type: "offline", scope: SCOPES });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      client.setCredentials(token!);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(client);
    });
  });
}

function logAuthUrl(client: OAuth2Client, options: GenerateAuthUrlOpts): void {
  console.log(
    "Authorize this app by visiting this url:",
    client.generateAuthUrl(options)
  );
}

interface TimeFrame {
  timeMin: string;
  timeMax: string;
}

function fetchEvents(
  client: OAuth2Client,
  callback: (events: Event[]) => void,
  timeFrame: TimeFrame
) {
  const calendar = google.calendar({ version: "v3", auth: client });

  let foundEvents: Event[] = [];
  let i = 0;

  Object.keys(calendarIds).forEach(key => {
    const listEventsOptions: ListEventsOptions = {
      calendarId: calendarIds[key],
      ...timeFrame,
      singleEvents: true,
      orderBy: "startTime"
    };

    calendar.events.list(listEventsOptions, (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items as Event[];
      i++;
      if (events.length) {
        foundEvents = [...foundEvents, ...events];
        if (i === 3) {
          callback(foundEvents);
        }
      }
    });
  });
}

//const start = event.start.dateTime || event.start.date;
//console.log(`${start} - ${event.summary}`);
