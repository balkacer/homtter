import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import AuthService from "~/services/auth.server";
import Navbar from "~/components/Dashboard/Navbar";
import Menu from "~/components/Dashboard/Menu";
import Breadcrumb from "~/components/Dashboard/Breadcrumb";

export default function Dashboard() {
  const { loggedUser } = useLoaderData();

  return (
    <main className="hero" style={{ display: "flex", maxHeight: "100vh", minHeight: "100vh" }}>
      <Navbar loggedUser={loggedUser} />
      <section style={{ display: "flex", flex: 1, flexDirection: "row", maxHeight: "100%", minHeight: "100%" }}>
        <Menu />
        <section className="section" style={{ display: "flex", flex: 1, flexDirection: "column", maxHeight: "100%", minHeight: "100%" }}>
          <Breadcrumb />
          <section style={{ flex: 1, overflowY: "auto", maxHeight: "1oo%", minHeight: "100%" }}>
            <Outlet />
          </section>
        </section>
      </section>
    </main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const loggedUser = await AuthService.isAuthenticated(request, {
    failureRedirect: "/sign-in"
  });

  return json({ loggedUser })
};

export const action: ActionFunction = async ({ request }) => {
  return await AuthService.logout(request, {
    redirectTo: "/sign-in"
  });
};