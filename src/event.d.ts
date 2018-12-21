interface Event {
  kind: "calendar#event";
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: EventUser;
  organizer: EventUser;
  start: EventDate;
  end: EventDate;
  endTimeUnspecified: boolean;
  recurrence: string[];
  recurringEventId: string;
  originalStartTime: EventDate;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: Attendee[];
  attendeesOmitted: boolean;
  extendedProperties: ExtendedProperties;
  hangoutLink: string;
  conferenceData: ConferenceData;
}

interface EventDate {
  date: string;
  dateTime: string;
  timeZone: string;
}

interface EventUser {
  id: string;
  email: string;
  displayName: string;
  self: boolean;
}

interface Credentials {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: [string, string];
  };
}

interface ListEventsOptions {
  calendarId: string;
  alwaysIncludeEmail?: boolean;
  iCalUID?: string;
  maxAttendees?: number;
  maxResults?: number;
  orderBy?: "startTime" | "updated";
  pageToken?: string;
  privateExtendedProperty?: string;
  q?: string;
  showDeleted?: boolean;
  showHiddenInvitations?: boolean;
  singleEvents?: boolean;
  syncToken?: string;
  timeMax?: string;
  timeMin?: string;
  timeZone?: string;
  updatedMin?: string;
}

interface Gadget {
  type: string;
  title: string;
  link: string;
  iconLink: string;
  width: number;
  height: number;
  display: string;
  preferences: {
    [key: string]: string;
  };
}

interface Attendee {
  id: string;
  email: string;
  displayName: string;
  organizer: boolean;
  self: boolean;
  resource: boolean;
  optional: boolean;
  responseStatus: string;
  comment: string;
  additionalGuests: number;
}

interface Reminder {
  useDefault: boolean;
  overrides: {
    method: string;
    minutes: string;
  };
}

interface Attachment {
  fileUrl: string;
  title: string;
  mimeType: string;
  iconLink: string;
  fileId: string;
}

interface Source {
  url: string;
  title: string;
}

interface ConferenceSolution {
  key: {
    type: string;
  };
  name: string;
  iconUri: string;
}

interface EntryPoint {
  entryPointType: string;
  uri: string;
  label: string;
  pin: string;
  accessCode: string;
  meetingCode: string;
  passcode: string;
  password: string;
}

interface CreateRequest {
  requestId: string;
  conferenceSolutionKey: {
    type: string;
  };
  status: {
    statusCode: string;
  };
}

interface ConferenceData {
  createRequest: CreateRequest;
  entryPoints: EntryPoint[];
  conferenceSolution: ConferenceSolution;
  conferenceId: string;
  signature: string;
  notes: string;
  gadget: Gadget;
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: Reminder[];
  source: Source;
  attachments: Attachment[];
}

interface ExtendedProperties {
  private: {
    [key: string]: string;
  };
  shared: {
    [key: string]: string;
  };
}
