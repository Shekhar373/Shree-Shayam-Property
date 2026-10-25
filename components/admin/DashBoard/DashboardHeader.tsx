export default function DashboardHeader() {
    return (
      <header className="mb-9 flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="mb-2 text-xs text-gray-500">
            Workspace / Overview
          </p>
  
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard<span className="text-[#8da18a]">.</span>
          </h1>
  
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Here's an overview of your properties.
          </p>
        </div>
  
        <a
          href="/admin/new"
          className="inline-flex items-center gap-3 rounded-xl bg-[#1d3026] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#304b3a]"
        >
          <span className="text-xl leading-none">+</span>
          Add Property
        </a>
      </header>
    );
  }