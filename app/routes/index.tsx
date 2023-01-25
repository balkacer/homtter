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
  return await AuthService.isAuthenticated(request);
};

export const action: ActionFunction = async ({ request }) => {
  return await AuthService.logout(request, {
    redirectTo: "/sign-in"
  });
};