import { Credentials } from "~/models";
import { NewUser } from "~/models/User";
import { createUser, getUserByCredentials } from "~/repositories/user";
import { getSession, commitSession, destroySession } from "../sessions";
import { json, redirect, TypedResponse } from "@remix-run/node";

const checkIfUserIsLogged = async function (cookieHeader?: string | null): Promise<TypedResponse<{ error: any }>> {
  const session = await getSession(cookieHeader);
  console.log(session.get("sessionUserData"));

  if (session.has("sessionUserData")) {
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const signIn = async function (credentials: Credentials, cookieHeader?: string | null): Promise<TypedResponse<{ error: any }>> {
  const session = await getSession(cookieHeader);
  console.log(session.get("sessionUserData"));

  try {
    const { email, password } = credentials;

    console.log(credentials);


    // TODO: Validations for email

    const { success: credentialsSuccess, data: user } = await getUserByCredentials({ email, password });

    if (!credentialsSuccess) {
      session.flash("error", "Credentials wrong!");

      return redirect("/sign-in", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    session.set("sessionUserData", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch {
    session.flash("error", "Something went wrong!");

    return redirect("/sign-in", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

const signOut = async function (cookieHeader?: string | null): Promise<TypedResponse<{ error: any }>> {
  const session = await getSession(cookieHeader);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

const signUp = async function (userData: NewUser, cookieHeader?: string | null): Promise<TypedResponse<{ error: any }>> {
  const session = await getSession(cookieHeader);

  try {
    // TODO: Validations for name, lastName, email, password and profilePicture
    const { success: createUserResponse, data: user } = await createUser(userData)

    if (!createUserResponse) {
      session.flash("error", "Something went wrong!");

      return redirect("/sign-up", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    session.set("sessionUserData", user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch {
    session.flash("error", "Something went wrong!");

    return redirect("/sign-up", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export {
  checkIfUserIsLogged,
  signIn,
  signOut,
  signUp
}