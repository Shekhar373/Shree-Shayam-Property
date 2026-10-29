"use client";

import axios from "axios";
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
    <div className="px-10 pt-10">
        <button
      onClick={handleLogout}
      className="rounded-xl px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
    >
      Log out
    </button>
    </div>
  )
}

export default LogoutButton