import { Currency } from "@prisma/client";

type CurrencyClient = Omit<Currency, "id" | "createdAt" | "updatedAt" | "isActive">

export default CurrencyClient;