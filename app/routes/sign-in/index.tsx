import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { AuthService, SessionStorageService } from "~/services";
import stylesUrl from "~/styles/sign-in.css";

export default function SignIn() {
  const loaderData = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix-Auth Example</h1>
      <p>
        Based on the Form Strategy From{" "}
        <a href="https://github.com/sergiodxa/remix-auth" target={"_window"}>
          Remix-Auth Project
        </a>
      </p>
      <Form method="post">
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <button>Sign In</button>
      </Form>
      <div>
        {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
      </div>
    </div>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  await AuthService.isAuthenticated(request, {
    successRedirect: "/"
  });

  const session = await SessionStorageService.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("__clientSession");
  return json<any>({ error });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("hola");

  const result = await AuthService.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  });

  console.log(result);

  return result;
};
