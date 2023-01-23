import UserClient from "~/models/User";
import { getUserByCredentials } from "~/repositories/user";
import SessionStorageService from "./session.server";
import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import validateInput from "~/utils/validator";

const AuthService = new Authenticator<UserClient | Error | null>(SessionStorageService, {
  sessionKey: "__clientSession",
  sessionErrorKey: "__clientSessionError",
});

AuthService.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    console.log({ email, password });


    const validationScope = "Bad Credentials";

    const emailValidation = validateInput("Email", email, ["isString", "isEmail", "isRequired"], validationScope)

    if (!emailValidation.isValid) {
      console.log(emailValidation.message);

      throw new AuthorizationError(emailValidation.message)
    }

    const passwordValidation = validateInput("Password", password, ["isString", "isRequired"], validationScope)

    if (!passwordValidation.isValid) {
      console.log(passwordValidation.message);

      throw new AuthorizationError(passwordValidation.message)
    }

    console.log("hbjbj");


    const { success: credentialsSuccess, data: user, message } = await getUserByCredentials({ email, password });

    if (!credentialsSuccess) {
      console.log(message);

      throw new AuthorizationError("Credentials wrong!")
    }

    console.log("holaaaaa!!");


    return user;
  }),
);

export default AuthService;