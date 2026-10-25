import { stats } from "@/data/DashBoardData";

type Stat = {
  title: string;
  value: string;
  description: string;
  icon: string;
};

type StateCardProps = {
  stat: Stat;
  index: number;
};

function StateCard({ stat, index }: StateCardProps) {
  const progressWidths = ["85%", "35%", "65%", "45%"];

  return (
    <article className="rounded-2xl border border-[#e8eae4] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.03]">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500">{stat.title}</p>

        <div
          className={`grid size-11 place-items-center rounded-xl text-xl ${
            index === 1
              ? "bg-amber-50 text-amber-700"
              : "bg-[#edf2e9] text-[#36533e]"
          }`}
        >
          {stat.icon}
        </div>
      </div>

      <h3 className="mt-6 text-3xl font-semibold tracking-tight">
        {stat.value}
      </h3>

      <p className="mt-2 text-xs text-gray-400">
        {stat.description}
      </p>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#f0f1ed]">
        <div
          className={`h-full rounded-full ${
            index === 1 ? "bg-amber-600" : "bg-[#829b7c]"
          }`}
          style={{ width: progressWidths[index] }}
        />
      </div>
    </article>
  );
}

export default function StatsSection() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-base font-semibold">Overview</h2>

        <p className="mt-1 text-xs text-gray-500">
          Your property portfolio at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StateCard
            key={stat.title}
            stat={stat}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}