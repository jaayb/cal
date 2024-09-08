import nextAppSession from "next-app-session";

// Your session data type
type MySessionData = {
  grantId?: string;
  email?: string;
};

export const session = nextAppSession<MySessionData>({
  name: "virtualvisit_session",
  secret: process.env.SECRET,
  cookie: {
    httpOnly: false,
  },
});
