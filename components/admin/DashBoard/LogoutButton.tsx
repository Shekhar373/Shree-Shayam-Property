"use client";

import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {

    const router = useRouter();

  async function handleLogout() {
    try {
      await axios.post("/api/admin/logout");
      router.replace("/admin-login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div>
       <button
  onClick={handleLogout}
  className="group flex w-full items-center gap-3 rounded-xl
    border border-white/10 bg-white/[0.03] px-4 py-3
    text-sm font-medium text-gray-300
    transition-all duration-300
    hover:border-red-500/30 hover:bg-red-500/10
    hover:text-red-400 active:scale-[0.98]"
>
  <LogOut
    size={18}
    className="transition-transform duration-300
      group-hover:-translate-x-0.5"
  />
  <span>Logout</span>
</button>
    </div>
  )
}

export default LogoutButton