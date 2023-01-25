import { createCookieSessionStorage } from "@remix-run/node";
import { SESSION_SECRET } from "~/env";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === "production"
  },
});

export default sessionStorage;
export const { getSession, commitSession, destroySession } = sessionStorage;