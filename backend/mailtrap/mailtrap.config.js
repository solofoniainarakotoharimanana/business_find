// const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"


dotenv.config();
const TOKEN = "61ee572e8ef08e81abc9df82c0b2dc6a";
// console.log("MY TOKEN >>> ", process.env.MAILTRAP_TOKEN)

const ENDPOINT = "https://send.api.mailtrap.io"

export const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

export const sender = {
  // email: "hello@demomailtrap.com",
  email: "mailtrap@demomailtrap.com",
  name: "Aina",
};
