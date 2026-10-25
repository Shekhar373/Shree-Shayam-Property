const summaries = [
    {
      title: "Properties for Sale",
      value: "76",
      description: "Residential and commercial",
      icon: "↗",
      background: "bg-[#e9eee5]",
      text: "text-[#5c6e5b]",
    },
    {
      title: "Properties for Rent",
      value: "52",
      description: "Residential and commercial",
      icon: "⌂",
      background: "bg-[#eee9df]",
      text: "text-[#766b59]",
    },
  ];
  
  export default function PropertyStatsSummary() {
    return (
      <section className="mt-8 grid gap-5 sm:grid-cols-2">
        {summaries.map((item) => (
          <article
            key={item.title}
            className={`flex items-center justify-between rounded-2xl p-6 ${item.background}`}
          >
            <div>
              <p className={`text-sm ${item.text}`}>{item.title}</p>
  
              <h3 className="mt-3 text-3xl font-semibold">
                {item.value}
              </h3>
  
              <p className={`mt-2 text-xs ${item.text}`}>
                {item.description}
              </p>
            </div>
  
            <div
              className={`grid size-14 place-items-center rounded-2xl bg-white/80 text-2xl ${item.text}`}
            >
              {item.icon}
            </div>
          </article>
        ))}
      </section>
    );
  }