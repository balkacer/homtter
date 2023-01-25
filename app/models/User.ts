import { User } from "@prisma/client";

export interface NewUser extends Omit<User, "id" | "createdAt" | "updatedAt" | "isActive" | "photoId"> {
  profilePicture?: any | null;
}

interface UserClient extends Omit<NewUser, "password"> {
  profilePicture?: string | null;
}

export default UserClient;