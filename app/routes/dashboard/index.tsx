import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AuthService from "~/services/auth.server";
import Navbar from "~/components/Navbar";
import { User } from "~/models";

export default function Dashboard() {
  const loggedUser = useLoaderData<User | null>();

  return (
    <>
      <Navbar loggedUser={loggedUser} />
      <main>
        <h1>Hola, {loggedUser?.name}</h1>
      </main>
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return await AuthService.isAuthenticated(request, {
    failureRedirect: "/sign-in"
  });
};

export const action: ActionFunction = async ({ request }) => {
  return await AuthService.logout(request, {
    redirectTo: "/sign-in"
  });
};