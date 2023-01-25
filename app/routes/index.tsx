import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AuthService from "~/services/auth.server";
import Navbar from "~/components/Navbar";
import sessionStorage from "~/sessions";

export default function Index() {
  const loggedUser = useLoaderData();

  return (
    <>
      <Navbar loggedUser={loggedUser} />
      <main>
        <h1>Esta es la página de inicio</h1>
      </main>
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  await AuthService.isAuthenticated(request);

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  if (session.has(AuthService.sessionKey)) {
    return json(session.get(AuthService.sessionKey))
  }

  const data = { error: session.get(AuthService.sessionErrorKey) };

  return json(data, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  return await AuthService.logout(request, {
    redirectTo: "/sign-in"
  });
};