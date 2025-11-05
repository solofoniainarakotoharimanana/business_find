// const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"


dotenv.config();
//const TOKEN = "61ee572e8ef08e81abc9df82c0b2dc6a";
const TOKEN = "640604882a0612570f352ee8760cf7f0";
//const ENDPOINT = "https://send.api.mailtrap.io"//https://send.api.mailtrap.io/api/send
const ENDPOINT = "https://send.api.mailtrap.io/api/send"

export const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
  // email: "hello@demomailtrap.com",hello@example.com, hello@study.com
  // email: "hello@example.com",
  email: "hello@demomailtrap.co",
  name: "Aina",
};
