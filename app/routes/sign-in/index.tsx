import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { v4 as uuid } from 'uuid';
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { AuthService, SessionStorageService } from "~/services";
import NavbarLogo from "~/components/Image/navbarLogo";
import { useEffect, useState } from "react";
import NotificationCorner, { Notifications } from "~/components/Notification/Notifications";

export default function SignIn() {
  const [notifications, setNotifications] = useState<Notifications[]>([])

  const loaderData = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (loaderData?.error) {
      const newNotification: Notifications = {
        id: uuid(),
        type: "danger",
        content: loaderData?.error ? loaderData.error.message : ""
      }

      setNotifications(prev => [...prev, newNotification])
    }
  }, [loaderData])

  useEffect(() => {
    if (actionData?.error) {
      const newNotification: Notifications = {
        id: uuid(),
        type: "warning",
        content: actionData?.error ? actionData.error.message : "Something went wrong..."
      }

      setNotifications(prev => [...prev, newNotification])
    }
  }, [actionData])

  const removeNotification = (id: string) => {
    const tmp = [...notifications];
    setNotifications(tmp.filter((not) => not.id !== id))
  }

  return (
    <>
      <main className="container is-max-desktop" style={{ padding: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
        <header style={{ paddingTop: 30, marginBottom: 30 }}>
          <NavbarLogo />
        </header>
        <section style={{ maxWidth: 400, width: "100%" }}>
          <Form method="post">
            <div className="field">
              <p className="control">
                <input className="input" type="email" placeholder="Email" name="email" />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" type="password" placeholder="Password" name="password" />
              </p>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <Link to="/sign-up" className="button is-light">
                  Sign Up
                </Link>
              </p>
              <p className="control">
                <button type="submit" className="button is-primary">
                  Sing In
                </button>
              </p>
            </div>
          </Form>
        </section>
      </main>
      <NotificationCorner notifications={notifications} onCloseOne={removeNotification} />
    </>
  );
}

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
  try {
    await AuthService.authenticate("form", request, {
      successRedirect: "/",
      failureRedirect: "/sign-in"
    });

    return undefined;
  } catch (err) {
    const session = await SessionStorageService.getSession(
      request.headers.get("Cookie")
    );

    const error = session.get("__clientSession");
    return json<any>({ error });
  }
};
