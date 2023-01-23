import { Photo } from "@prisma/client"

const PHOTOS: Omit<Photo, "createdAt" | "updatedAt">[] = [
  {
    id: "abd5a1e3-f5f3-4750-a3c8-7c5d7616d5bf",
    url: "https://i.ibb.co/Gdhc7cm/user-1.webp",
    detailsUrl: "https://ibb.co/3TJB1BK",
    fileName: "user-1.webp",
    isActive: true
  },
  {
    id: "9615a8fa-cc56-4878-b7e1-0de42da56515",
    url: "https://i.ibb.co/dK2ns3s/user-2.jpg",
    detailsUrl: "https://ibb.co/nkchqVq",
    fileName: "user-2.jpg",
    isActive: true
  },

]

export default PHOTOS;