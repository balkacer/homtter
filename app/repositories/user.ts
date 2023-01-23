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
    name: user.name,
    lastName: user.lastName,
    email: user.email,
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


