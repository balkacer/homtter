import { Photo } from "@prisma/client"

const PHOTOS: Omit<Photo, "createdAt" | "updatedAt">[] = [
  {
    id: "1",
    url: "https://i.ibb.co/Gdhc7cm/user-1.webp",
    detailsUrl: "https://ibb.co/3TJB1BK",
    fileName: "user-1.webp",
    isActive: true
  },
  {
    id: "2",
    url: "https://i.ibb.co/dK2ns3s/user-2.jpg",
    detailsUrl: "https://ibb.co/nkchqVq",
    fileName: "user-2.jpg",
    isActive: true
  },

]

export default PHOTOS;