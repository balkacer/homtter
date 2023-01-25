import { getUserByCredentials } from "~/repositories/user";
import SessionStorageService from "~/sessions";
import validateInput from "~/utils/validator";
import { json, redirect, SessionStorage } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User } from "~/models";

const AuthService = new Authenticator<User | Error | null>(SessionStorageService);

AuthService.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const validationScope = "Bad Credentials";

    const emailValidation = validateInput("Email", email, ["isRequired"], validationScope)

    if (!emailValidation.isValid)
      throw new AuthorizationError(emailValidation.message)

    const passwordValidation = validateInput("Password", password, ["isRequired"], validationScope)

    if (!passwordValidation.isValid)
      throw new AuthorizationError(passwordValidation.message)

    const { success: credentialsSuccess, data: user, message } = await getUserByCredentials({ email, password });

    if (!credentialsSuccess)
      throw new AuthorizationError(message);

    return user;
  })
);

export default AuthService;
