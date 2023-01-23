import { Photo } from "@prisma/client";
import PHOTOS from "~/mocks/photos";
import { Response } from "~/models";
import asyncExecute from "~/utils/delay";

export async function getPhotoUrlById(id: string): Promise<Response<string>> {
  const photo = await asyncExecute(() => PHOTOS.find(photo_ => photo_.id === id), 1000);

  if (!photo) {
    return {
      message: "This doesn't exist",
      success: false,
      messageType: "WARNING",
      data: null
    }
  }

  return {
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: photo?.url
  }
}

export async function createPhoto(photo: any): Promise<Response<Photo>> {
  return new Promise((resolve) => resolve({
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: null
  }));
}