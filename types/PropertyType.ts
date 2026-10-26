export type PropertyTypeData = {
    _id: string;
    title: string;
    slug: string;
    description: String;
    listingType: "sale" | "rent";
    propertyType: string;
    price: number | string;
    priceUnit: "total" | "monthly";
    address: {
      locality: string;
      city: string;
      state: string;
    };
    specifications: {
      bedrooms: number;
      bathrooms: number;
      area: number;
      areaUnit: string;
    };
    images: {
      url: string;
      publicId: string;
      alt?: string;
    }[];
    status: "draft" | "published" | "sold" | "rented" | "archived";
    featured: boolean;
    createdAt: string;
  };