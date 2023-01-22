import { Photo } from "@prisma/client"

type PhotoClient = Omit<Photo, "id" | "createdAt" | "updatedAt" | "isActive" | "detailsUrl">

export default PhotoClient;