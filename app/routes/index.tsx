import { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import AuthService from "~/services/auth.server";
import { Form, useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";

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
  return await AuthService.isAuthenticated(request, {
    failureRedirect: "/sign-in",
  });
};

export const action: ActionFunction = async ({ request }) => {
  await AuthService.logout(request, { redirectTo: "/sign-in" });
};