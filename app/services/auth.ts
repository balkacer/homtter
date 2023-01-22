import { Response } from "~/models";
import { NewUser } from "~/models/User";
import { changeUserLoginStatusByEmail, checkUserIsLogged, createUser, getUserByCredentials } from "~/repositories/user";
import { getFromStorage, setInStorage } from "./storage";

const AuthService = (function () {
  const signIn = async function (email: string, password: string): Promise<Response<Boolean>> {

    // TODO: Validations for email

    try {
      const response = await checkUserIsLogged(email);
      const { success: isLoggedSuccess, data: isLogged } = response;

      if (!isLoggedSuccess) {
        return response;
      }

      if (isLogged) {
        return {
          message: "User is currently logged",
          data: false,
          success: false,
          messageType: "WARNING"
        }
      }

      const { success: credentialsSuccess, data: user } = await getUserByCredentials({ email, password });

      if (!credentialsSuccess) {
        return {
          message: "Wrong credentials!",
          data: false,
          success: false,
          messageType: "WARNING"
        }
      }

      const loginStatusResponse = user?.email ? await changeUserLoginStatusByEmail(user?.email) : undefined;

      if (!loginStatusResponse?.success) {
        throw (null)
      }

      setInStorage("sessionData", user)

      return {
        message: "User logged correctly!",
        data: true,
        success: true,
        messageType: "INFO"
      }
    } catch {
      return {
        message: "Something went wrong, try again.",
        data: false,
        success: false,
        messageType: "DANGER"
      }
    }
  }

  const signOut = async function (): Promise<Response<Boolean>> {
    try {
      const email = getFromStorage<string>("sessionData", "email");

      if (!email) {
        throw (null)
      }

      const response = await checkUserIsLogged(email);
      const { success: isLoggedSuccess, data: isLogged } = response;

      if (!isLoggedSuccess) {
        return response;
      }

      if (!isLogged) {
        return {
          message: "User didn't logged in",
          data: false,
          success: false,
          messageType: "WARNING"
        }
      }

      const loginStatusResponse = await changeUserLoginStatusByEmail(email);

      if (!loginStatusResponse.success) {
        return loginStatusResponse;
      }

      setInStorage("sessionData", null)

      return {
        message: "User logged out correctly!",
        data: true,
        success: true,
        messageType: "SUCCESS"
      }
    } catch {
      return {
        message: "Something went wrong, try again.",
        data: false,
        success: false,
        messageType: "DANGER"
      }
    }

  }

  const signUp = async function (userData: NewUser): Promise<Response<Boolean>> {

    // TODO: Validations for name, lastName, email, password and profilePicture

    try {
      const { success: createUserResponse, data: user } = await createUser(userData)

      if (!createUserResponse) {
        return {
          message: "User not registered!",
          data: false,
          success: false,
          messageType: "DANGER"
        }
      }

      setInStorage("sessionData", user)

      return {
        message: "User registered correctly!",
        data: true,
        success: true,
        messageType: "INFO"
      }
    } catch {
      return {
        message: "Something went wrong, try again.",
        data: false,
        success: false,
        messageType: "DANGER"
      }
    }
  }
})();

export default AuthService;