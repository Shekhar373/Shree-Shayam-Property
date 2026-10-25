import PropertyRow from "./PropertyRow";

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

const NUM_RANDOM_PROPERTIES = 6;
const randomProperties: Property[] = Array.from(
  { length: NUM_RANDOM_PROPERTIES },
  () => getRandomProperty()
);

export default function RecentProperties() {
  return (
    <section className="mt-9 overflow-hidden rounded-2xl border border-[#e8eae4] bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-semibold">Recent Properties</h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick look at your latest listings.
          </p>
        </div>

        <a
          href="/admin/properties"
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
        >
          View All Properties →
        </a>
      </div>

      {/* Properties table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-y border-[#eceee8] bg-[#fafbf9]">
            <tr className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-5 py-4 font-medium">Listing Type</th>
              <th className="px-5 py-4 font-medium">Price</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Featured</th>
              <th className="px-5 py-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eff0ec]">
            {randomProperties.map((property) => (
              <PropertyRow
                key={property.id}
                property={property}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eceee8] px-6 py-4">
        <p className="text-xs text-gray-400">
          Showing {randomProperties.length} recent properties
        </p>

        <a
          href="/admin/properties"
          className="text-xs font-medium text-[#36533e] hover:underline"
        >
          Manage listings →
        </a>
      </div>
    </section>
  );
}