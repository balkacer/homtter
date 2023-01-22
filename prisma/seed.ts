import { PrismaClient, Prisma } from "@prisma/client";
import type {
  City,
  ContractType,
  Country,
  Currency,
  Estate,
  EstatePhoto,
  EstateProp,
  Location,
  Photo,
  Prop,
  State,
  User
} from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const currencies = await Promise.all(
    getCurrencies().map((currency) => {
      return db.currency.create({ data: currency });
    })
  )

  console.log(currencies);
}

seed();

function getCountries(photoId: string): Omit<Country, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "Dominican Republic",
      photoId
    }
  ];
}

function getStates(countryId: string): Omit<State, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "Monseñor Nouel",
      countryId
    },
  ];
}

function getCities(stateId: string): Omit<City, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "Bonao",
      stateId
    },
  ];
}

function getCurrencies(): Omit<Currency, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      code: "DOP",
      symbol: "RD$"
    },
  ];
}

function getContractTypes(): Omit<ContractType, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "SALE_ORDINARY"
    },
    {
      name: "RENT_ORDINARY"
    },
    {
      name: "RENT_FOR_AIRBNB"
    },
  ];
}

function getEstates(currencyId: string, contractTypes: string[], userId: string): Omit<Estate, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      isForRent: true,
      price: 10000,
      currencyId,
      contractTypeId: contractTypes[1],
      userId
    },
    {
      isForRent: false,
      price: 15000000,
      currencyId,
      contractTypeId: contractTypes[1],
      userId
    },
  ];
}

function getLocations(esates: string[], cityId: string): Omit<Location, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      latitude: 18.9211469,
      longitude: -70.4030574,
      estateId: esates[0],
      cityId
    },
    {
      latitude: 18.9308655,
      longitude: -70.3995029,
      estateId: esates[1],
      cityId
    },
  ];
}

function getProps(): Omit<Prop, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "Dog friendly",
      photoId: null
    },
    {
      name: "Disabled Access",
      photoId: null
    },
    {
      name: "Family Friendly",
      photoId: null
    },
    {
      name: "Lakes & Rivers",
      photoId: null
    },
    {
      name: "Pool",
      photoId: null
    },
  ];
}

function getEstateProps(data: { propId: string, estateId: string }[]): Omit<EstateProp, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [...data];
}

function getPhotos(): Omit<Photo, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      url: "https://i.ibb.co/Gdhc7cm/user-1.webp",
      detailsUrl: "https://ibb.co/3TJB1BK",
      fileName: "user-1.webp"
    },
    {
      url: "https://i.ibb.co/dK2ns3s/user-2.jpg",
      detailsUrl: "https://ibb.co/nkchqVq",
      fileName: "user-2.jpg"
    },
    {
      url: "https://i.ibb.co/tD5WVDN/casa-bestue-salon.jpg",
      detailsUrl: "https://ibb.co/m47Mf4Y",
      fileName: "casa-bestue-salon.jpg"
    },
    {
      url: "https://i.ibb.co/L5gsvjN/casa-bestue-habitacion.jpg",
      detailsUrl: "https://ibb.co/sH1XtxW",
      fileName: "casa-bestue-habitacion.jpg"
    },
    {
      url: "https://i.ibb.co/19S2963/casa-bestue-cocina-comedor.jpg",
      detailsUrl: "https://ibb.co/THChHLZ",
      fileName: "casa-bestue-cocina-comedor.jpg"
    },
    {
      url: "https://i.ibb.co/bs0PQGV/casa-bestue-habitacion-2.jpg",
      detailsUrl: "https://ibb.co/c6B1ks9",
      fileName: "casa-bestue-habitacion-2.jpg"
    },
    {
      url: "https://i.ibb.co/WP5smx2/casa-puertolas.jpg",
      detailsUrl: "https://ibb.co/KLhmT0r",
      fileName: "casa-puertolas.jpg"
    },
    {
      url: "https://i.ibb.co/YLQCf22/casa-puertolas-salon.jpg",
      detailsUrl: "https://ibb.co/vjqFL11",
      fileName: "casa-puertolas-salon.jpg"
    },
    {
      url: "https://i.ibb.co/F0B5kTB/casa-puertolas-habitacion.jpg",
      detailsUrl: "https://ibb.co/mXH9rWH",
      fileName: "casa-puertolas-habitacion.jpg"
    },
    {
      url: "https://i.ibb.co/0hkXFk6/casa-puertolas-cocina.jpg",
      detailsUrl: "https://ibb.co/wMTLwTP",
      fileName: "casa-puertolas-cocina.jpg"
    },
    {
      url: "https://i.ibb.co/5sSB5bw/casa-puertolas-habitacion-bano.jpg",
      detailsUrl: "https://ibb.co/Dwv570T",
      fileName: "casa-puertolas-habitacion-bano.jpg"
    },
  ];
}

function getUsers(photos: string[]): Omit<User, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [
    {
      name: "Jose",
      lastName: "Perez",
      email: "j.perez@gmail.com",
      password: "1234",
      photoId: photos[0]
    },
    {
      name: "Ana",
      lastName: "Cuevas",
      email: "a.cuevas@gmail.com",
      password: "1234",
      photoId: photos[1]
    }
  ];
}

function getEstatePhotos(data: { photoId: string, estateId: string }[]): Omit<EstatePhoto, "id" | "createdAt" | "updatedAt" | "isActive">[] {
  return [...data];
}

