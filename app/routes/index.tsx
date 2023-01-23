import { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import AuthService from "~/services/auth.server";
import stylesUrl from "~/styles/index.css";
import { Form, useLoaderData } from "@remix-run/react";

export default function Index() {
  const data = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <p>{data?.name} {data?.lastName}</p>
      <p>{data?.email}</p>
      <img width={100} height={100} src={data?.profilePicture} />

      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({ request }) => {
  await AuthService.logout(request, { redirectTo: "/sign-in" });
};

export let loader: LoaderFunction = async ({ request }) => {
  return await AuthService.isAuthenticated(request, {
    failureRedirect: "/sign-in",
  });
};
