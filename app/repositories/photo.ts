import { Photo } from "@prisma/client";
import { Response } from "~/models";

export async function getPhotoUrlById(id: string): Promise<Response<string>> {
  return new Promise((resolve) => resolve({
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: null
  }));
}

export async function createPhoto(photo: any): Promise<Response<Photo>> {
  return new Promise((resolve) => resolve({
    message: "All good!",
    success: true,
    messageType: "INFO",
    data: null
  }));
}