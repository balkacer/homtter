import { ActionArgs, LoaderArgs } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { checkIfUserIsLogged, signIn } from "~/services/auth";
import stylesUrl from "~/styles/sign-in.css";

export default function SignIn() {
  return (
    <main>
      <Form method="post" action="/sign-in">
        <label>
          Email: <input type="email" name="email" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit" className="button">
          Add
        </button>
      </Form>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export async function loader({ request }: LoaderArgs) {
  return await checkIfUserIsLogged(request.headers.get("Cookies"))
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  const email = form.get("email");
  const password = form.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  return await signIn({ email, password }, request.headers.get("Cookies"))
}
