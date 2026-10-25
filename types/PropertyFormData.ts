export type PropertyFormData = {
    title: string;
    slug: string;
    description: string;
  
    listingType: "sale" | "rent" | "";
    propertyType:
      | "apartment"
      | "house"
      | "villa"
      | "plot"
      | "commercial"
      | "office"
      | "";
  
    price: string;
    priceUnit: "total" | "monthly" | "";
  
    address: {
      street: string;
      locality: string;
      city: string;
      state: string;
      pincode: string;
    };
  
    specifications: {
      bedrooms: string;
      bathrooms: string;
      area: string;
      parking: string;
      areaUnit: "sqft" | "sqm" | "sqyd";
      furnishing: "unfurnished" | "semi-furnished" | "furnished";
    };
  
    images: {
      url: string;
      publicId: string;
      alt: string;
    }[];

    publishedAt: String,
  
    status: "draft" | "published" | "sold" | "rented" | "archived";
    featured: boolean;
  };