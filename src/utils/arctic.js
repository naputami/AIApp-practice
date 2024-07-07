import { Google } from "arctic";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

export const google = new Google(googleClientId, googleClientSecret, googleRedirectUri);