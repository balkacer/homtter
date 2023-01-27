import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AuthService from "~/services/auth.server";
import Navbar from "~/components/Navbar";

export default function Index() {
  const loggedUser = useLoaderData();

  return (
    <main className="has-navbar-fixed-top" style={{ height: "100vh", paddingTop: 64 }}>
      <Navbar loggedUser={loggedUser} />
      <main className="hero">

      </main>
    </main>
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