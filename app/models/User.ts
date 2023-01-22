import { User } from "@prisma/client";

interface UserClient extends Omit<User, "id" | "createdAt" | "updatedAt" | "isActive" | "photoId" | "password" | "isLogged"> {
  profilePicture?: string | null;
}

export interface NewUser extends Omit<User, "id" | "createdAt" | "updatedAt" | "isActive" | "photoId" | "isLogged"> {
  profilePicture?: any | null;
}

export default UserClient;