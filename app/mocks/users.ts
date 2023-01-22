import { User } from "@prisma/client";

const USERS: Omit<User, "createdAt" | "updatedAt">[] = [
  {
    name: "Ana",
    lastName: "Cuevas",
    email: "a.cuevas@gmail.com",
    id: "1",
    password: "1234",
    photoId: "1",
    isActive: true,
    isLogged: false
  },
  {
    name: "Jose",
    lastName: "Perez",
    email: "j.perez@gmail.com",
    id: "2",
    password: "1234",
    photoId: "2",
    isActive: true,
    isLogged: false
  }
]

export default USERS;