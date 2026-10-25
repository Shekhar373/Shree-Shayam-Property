// Example with random/fake data generated inside the component for demo/testing

type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  type: "sale" | "rent";
  status: "Available" | "Rented" | "Sold";
  featured: boolean;
  image: string;
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomProperty(): Property {
  const names = [
    "Sunset Villa", "Modern Heights", "Oceanview Residence", "Urban Penthouse"
  ];
  const locations = [
    "Marine Drive, Mumbai", "Shanti Nagar, Bengaluru", "South City, Kolkata", "Connaught Place, Delhi"
  ];
  const prices = [
    "₹1.1 Cr", "₹75,000/mo", "₹2.5 Cr", "₹55,000/mo"
  ];
  const types: Property["type"][] = ["sale", "rent"];
  const statuses: Property["status"][] = ["Available", "Rented", "Sold"];
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
    "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=500",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=500"
  ];

  return {
    id: Math.floor(Math.random() * 100_000).toString(),
    name: getRandomElement(names),
    location: getRandomElement(locations),
    price: getRandomElement(prices),
    type: getRandomElement(types),
    status: getRandomElement(statuses),
    featured: Math.random() > 0.5,
    image: getRandomElement(images),
  };
}

export default function PropertyRow({ property }: { property?: Property }) {
  // If no property is passed, generate random data for demo
  const randomProperty: Property = property ?? getRandomProperty();
  const isSale = randomProperty.type === "sale";
  const isAvailable = randomProperty.status === "Available";

  return (
    <tr className="transition hover:bg-[#fafbf9]">
      {/* Property information */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={randomProperty.image}
            alt={randomProperty.name}
            className="size-[58px] rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-medium">{randomProperty.name}</p>
            <p className="mt-1 text-xs text-gray-400">
              {randomProperty.location}
            </p>
          </div>
        </div>
      </td>

      {/* Listing type */}
      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            isSale
              ? "bg-blue-50 text-blue-700"
              : "bg-purple-50 text-purple-700"
          }`}
        >
          For {randomProperty.type}
        </span>
      </td>

      {/* Price */}
      <td className="px-5 py-4 text-sm font-semibold">
        {randomProperty.price}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-2 text-xs ${
            isAvailable ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              isAvailable ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {randomProperty.status}
        </span>
      </td>

      {/* Featured */}
      <td className="px-5 py-4">
        {randomProperty.featured ? (
          <span className="text-sm text-amber-600">
            ★ Featured
          </span>
        ) : (
          <span className="text-xs text-gray-400">Standard</span>
        )}
      </td>

      {/* Action */}
      <td className="px-5 py-4">
        <a
          href={`/admin/properties/${randomProperty.id}`}
          aria-label={`View ${randomProperty.name}`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          ↗
        </a>
      </td>
    </tr>
  );
}