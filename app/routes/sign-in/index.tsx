import { useEffect, useState } from "react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { v4 as uuid } from 'uuid';
import { AuthService } from "~/services";
import NavbarLogo from "~/components/Image/navbarLogo";
import NotificationCorner, { Notifications } from "~/components/Notification/Notifications";
import sessionStorage from "~/sessions";

export default function SignIn() {
  const [notifications, setNotifications] = useState<Notifications[]>([])

  const loaderData = useLoaderData();

  useEffect(() => {
    if (loaderData?.error) {
      const newNotification: Notifications = {
        id: uuid(),
        type: "warning",
        content: loaderData?.error ? loaderData.error.message : ""
      }

      setNotifications(prev => [...prev, newNotification])
    }
  }, [loaderData?.error?.message])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter((not) => not.id !== id))
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

export const action: ActionFunction = async ({ request }) => {
  await AuthService.authenticate("form", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/sign-in"
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await AuthService.isAuthenticated(request, {
    successRedirect: "/dashboard"
  });
  
  const session = await sessionStorage.getSession(request.headers.get("Cookie"))
  const error = session.get(AuthService.sessionErrorKey);

  return json({ error })
};
