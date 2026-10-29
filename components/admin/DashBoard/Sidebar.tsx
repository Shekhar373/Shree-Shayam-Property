import LogoutButton from "./LogoutButton";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: "▦" },
    { name: "Properties", href: "/admin/properties", icon: "⌂" },
    { name: "Inquiries", href: "/admin/inquiries", icon: "✉" },
  ];
  
  export default function Sidebar() {
    return (
      <aside className="flex w-full shrink-0 flex-col bg-[#1d3026] px-5 py-6 text-white md:min-h-screen md:w-[260px]">
        {/* Brand */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="grid size-11 place-items-center rounded-xl bg-[#d6e5c9] text-2xl text-[#1d3026]">
            S
          </div>
  
          <div>
            <h2 className="text-lg font-semibold tracking-[0.15em]">
              ShreeShayam
            </h2>
  
            <p className="mt-1 text-[9px] tracking-[0.25em] text-white/50">
              PROPERTY MANAGEMENT
            </p>
          </div>
        </div>
  
        <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
          Workspace
        </p>
  
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 whitespace-nowrap rounded-xl px-4 py-3.5 text-sm transition ${
                index === 0
                  ? "bg-[#d6e5c9] font-medium text-[#1d3026]"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
  
              {item.name}
  
              {item.name === "Inquiries" && (
                <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-[10px]">
                  08
                </span>
              )}
            </a>
          ))}
        </nav>
  
        {/* Bottom information */}
        <div className="mt-auto hidden rounded-2xl border border-white/10 p-5 md:block">
          <div className="mb-3 grid size-10 place-items-center rounded-xl bg-white/10 text-xl">
            ✧
          </div>
  
          <h3 className="text-sm font-medium">Manage with ease</h3>
  
          <p className="mt-2 text-xs leading-5 text-white/50">
            Keep your property listings organized and up to date.
          </p>
        </div>

         {/* logout button */}
        <div className="mt-6">
        <LogoutButton />
        </div>
  
        {/* Admin profile */}
        <div className="mt-6 hidden items-center gap-3 border-t border-white/10 pt-5 md:flex">
          <div className="grid size-10 place-items-center rounded-full bg-[#d6e5c9] font-semibold text-[#1d3026]">
            A
          </div>
  
          <div>
            <p className="text-sm font-medium">Administrator</p>
            <p className="mt-1 text-xs text-white/45">Property Manager</p>
          </div>
        </div>
      </aside>
    );
  }