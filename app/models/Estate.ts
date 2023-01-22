import { Photo, User, Location, ContractType, Currency } from "."
import { Estate } from '@prisma/client';

interface EstateClient extends Omit<Estate, "id" | "createdAt" | "updatedAt" | "isActive" | "contractTypeId" | "currencyId" | "userId"> {
  contractType: ContractType;
  currency: Currency;
  publisher: User;
  location: Location;
  photos: Photo[];
}

export default EstateClient