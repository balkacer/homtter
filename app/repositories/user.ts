import { Credentials, User as UserClient, Response } from "~/models";
import USERS from "~/mocks/users";
import asyncExecute from "~/utils/delay";
import { createPhoto, getPhotoUrlById } from "./photo";
import { User } from "@prisma/client";
import { NewUser } from "~/models/User";

export async function createUser(userData: NewUser): Promise<Response<UserClient>> {
  const photoResponse = await createPhoto(userData.profilePicture);

  if (!photoResponse.success) {
    return { ...photoResponse, data: null };
  }

  const now = new Date();

  const newUser: User = {
    ...userData,
    createdAt: now,
    isActive: true,
    isLogged: true,
    updatedAt: now,
    id: "" + (USERS.length + 1),
    photoId: photoResponse.data?.id || null
  };

  const itemsCreatedCount = await asyncExecute(() => USERS.push(newUser), 1000);

  if (itemsCreatedCount > 0) {
    return {
      message: "User created",
      success: true,
      messageType: "SUCCESS",
      data: {
        ...newUser,
        profilePicture: photoResponse.data?.url
      }
    }
  }

  return {
    message: "User not created",
    success: false,
    messageType: "SUCCESS",
    data: null
  }
}

export async function getUserById() {

}

export async function checkUserIsLogged(userId: string): Promise<Response<Boolean>> {
  const user = await asyncExecute(() => USERS.find(({ id, isActive }) => id === userId && isActive), 1000);

  if (!user) {
    return {
      message: "User doesn't exist",
      success: false,
      messageType: "WARNING",
      data: null
    }
  }

  return {
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: user.isLogged
  }
}

export async function changeUserLoginStatusByEmail(email: string): Promise<Response<Boolean>> {
  const user = await asyncExecute(() => USERS.find(({ email: email_, isActive }) => email_ === email && isActive), 1000);

  if (!user) {
    return {
      message: "User doesn't exist",
      success: false,
      messageType: "WARNING",
      data: null
    }
  }

  const updatedUser = { ...user, isLogged: !user.isLogged };

  try {
    const index = await asyncExecute(() => USERS.findIndex(({ id }) => id === updatedUser.id), 1000);
    USERS[index] = updatedUser;

    return {
      message: "Done! user " + updatedUser.isLogged ? "logged correctly." : "is loggout",
      success: true,
      messageType: "SUCCESS",
      data: updatedUser.isLogged
    }
  } catch {
    return {
      message: "Something went wrong, try again.",
      success: false,
      messageType: "DANGER",
      data: null
    }
  }
}

export async function getUserByCredentials(credentials: Credentials): Promise<Response<UserClient>> {
  const user = await asyncExecute(() => USERS.find(({ email, password, isActive }) => email === credentials.email && password === credentials.password && isActive), 1000);

  if (!user) {
    return {
      message: "Credentials wrong",
      success: false,
      messageType: "WARNING",
      data: null
    }
  }

  const profilePictureResponse = user.photoId ? await getPhotoUrlById(user.photoId) : undefined

  const userForClientView: UserClient = {
    ...user,
    profilePicture: profilePictureResponse?.data
  }

  return {
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: userForClientView
  }
}

export async function checkUserExists() {

}

export async function updateUserData() {

}

export async function inactiveUser() {

}

export async function getUserEstates() {

}


