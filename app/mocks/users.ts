import { User } from "@prisma/client";

const USERS: Omit<User, "createdAt" | "updatedAt">[] = [
  {
    name: "Ana",
    lastName: "Cuevas",
    email: "a.cuevas@gmail.com",
    id: "573f373d-efc5-4d28-bb5b-957082a9cc8c",
    password: "1234",
    photoId: "9615a8fa-cc56-4878-b7e1-0de42da56515",
    isActive: true,
  },
  {
    name: "Jose",
    lastName: "Perez",
    email: "j.perez@gmail.com",
    id: "db01cac4-8d19-4654-b45c-c93da012d347",
    password: "1234",
    photoId: "abd5a1e3-f5f3-4750-a3c8-7c5d7616d5bf",
    isActive: true,
  }
]

export default USERS;