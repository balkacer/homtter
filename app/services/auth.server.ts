import { getUserByCredentials } from "~/repositories/user";
import SessionStorageService from "~/sessions";
import validateInput from "~/utils/validator";
import { json, redirect, SessionStorage } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User } from "~/models";

class AuthService {
  private sessionStorage: SessionStorage;
  sessionKey: string;
  sessionErrorKey: string;

  constructor() {
    this.sessionStorage = SessionStorageService;
    this.sessionKey = "sessionDataClient";
    this.sessionErrorKey = "sessionDataClient";
  }

  async authenticate(request: Request) {
    const session = await this.sessionStorage.getSession(request.headers.get("Cookie"));
    const form = await request.formData();

    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const validationScope = "Bad Credentials";

    const emailValidation = validateInput("Email", email, ["isRequired"], validationScope)

    if (!emailValidation.isValid) {
      session.flash(this.sessionErrorKey, emailValidation.message);

      return redirect("/sign-in", {
        headers: {
          "Set-Cookie": await this.sessionStorage.commitSession(session),
        },
      });
    }

    const passwordValidation = validateInput("Password", password, ["isRequired"], validationScope)

    if (!passwordValidation.isValid) {
      session.flash(this.sessionErrorKey, passwordValidation.message);

      return redirect("/sign-in", {
        headers: {
          "Set-Cookie": await this.sessionStorage.commitSession(session),
        },
      });
    }

    const { success: credentialsSuccess, data: user, message } = await getUserByCredentials({ email, password });

    if (!credentialsSuccess) {
      session.flash(this.sessionErrorKey, message);

      return redirect("/sign-in", {
        headers: {
          "Set-Cookie": await this.sessionStorage.commitSession(session),
        },
      });
    }

    session.set(this.sessionKey, user);

    return redirect("/", {
      headers: {
        "Set-Cookie": await this.sessionStorage.commitSession(session),
      },
    });
  }

  async isAuthenticated(request: Request) {
    const session = await this.sessionStorage.getSession(
      request.headers.get("Cookie")
    );

    if (session.has(this.sessionKey)) {
      return redirect("/");
    }

    const data = { error: session.get(this.sessionErrorKey) };

    return json(data, {
      headers: {
        "Set-Cookie": await this.sessionStorage.commitSession(session),
      },
    });
  }

  async logOut(request: Request) {
    const session = await this.sessionStorage.getSession(
      request.headers.get("Cookie")
    );

    return redirect("/sign-in", {
      headers: {
        "Set-Cookie": await this.sessionStorage.destroySession(session),
      },
    });
  }
}

export default new AuthService();
