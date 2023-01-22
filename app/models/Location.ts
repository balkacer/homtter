import { Address } from ".";
import { Location } from "@prisma/client";

interface LocationClient extends Omit<Location, "id" | "createdAt" | "updatedAt" | "isActive" | "cityId" | "estateId"> {
  address: Address;
}

export default LocationClient