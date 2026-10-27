type RecentPropertyRowProps = {
  id: string;
  name: string;
  location: string;
  price: string;
  type: "sale" | "rent";
  status: string;
  featured: boolean;
  image: string;
};

export default function RecentPropertyRow({
  id,
  name,
  location,
  price,
  type,
  status,
  featured,
  image,
}: RecentPropertyRowProps) {
  const isSale = type === "sale";
  const isAvailable = status === "Available";

  return (
    <tr className="transition hover:bg-[#fafbf9]">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="size-[58px] rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="mt-1 text-xs text-gray-400">{location}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            isSale
              ? "bg-blue-50 text-blue-700"
              : "bg-purple-50 text-purple-700"
          }`}
        >
          For {type}
        </span>
      </td>

      <td className="px-5 py-4 text-sm font-semibold">{price}</td>

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
          {status}
        </span>
      </td>

      <td className="px-5 py-4">
        {featured ? (
          <span className="text-sm text-amber-600">★ Featured</span>
        ) : (
          <span className="text-xs text-gray-400">Standard</span>
        )}
      </td>

      <td className="px-5 py-4">
        <a
          href={`/admin/properties/${id}`}
          aria-label={`View ${name}`}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          ↗
        </a>
      </td>
    </tr>
  );
}
