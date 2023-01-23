import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage =
  createCookieSessionStorage({
    cookie: {
      name: "__client_session",
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: process.env.SESSION_SECRET ? [process.env.SESSION_SECRET] : [],
      secure: process.env.NODE_ENV === 'production',
    },
  });

export default sessionStorage;
export const { getSession, commitSession, destroySession } = sessionStorage;