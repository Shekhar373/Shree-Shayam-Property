type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  index?: number;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  index = 0,
}: StatCardProps) {
  const progressWidths = ["85%", "35%", "65%", "45%"];
  const isHighlighted = index === 1;

  return (
    <article className="rounded-2xl border border-[#e8eae4] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.03]">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div
          className={`grid size-11 place-items-center rounded-xl text-xl ${
            isHighlighted
              ? "bg-amber-50 text-amber-700"
              : "bg-[#edf2e9] text-[#36533e]"
          }`}
        >
          {icon}
        </div>
      </div>

      <h3 className="mt-6 text-3xl font-semibold tracking-tight">{value}</h3>

      <p className="mt-2 text-xs text-gray-400">{description}</p>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#f0f1ed]">
        <div
          className={`h-full rounded-full ${
            isHighlighted ? "bg-amber-600" : "bg-[#829b7c]"
          }`}
          style={{ width: progressWidths[index] ?? "50%" }}
        />
      </div>
    </article>
  );
}
