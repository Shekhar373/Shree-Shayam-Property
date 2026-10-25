import AdminFooter from "@/components/admin/DashBoard/AdminFooter";
import DashboardHeader from "@/components/admin/DashBoard/DashboardHeader";
import PropertyStatsSummary from "@/components/admin/DashBoard/PropertyStatsSummary";
import RecentProperties from "@/components/admin/DashBoard/RecentProperties";
import Sidebar from "@/components/admin/DashBoard/Sidebar";
import StatsSection from "@/components/admin/DashBoard/StatesSection";


export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#f6f7f4] text-[#202820] md:flex">
      {/* Navigation */}
      <Sidebar />

      {/* Dashboard content */}
      <section className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
        <DashboardHeader />

        <StatsSection />

        <RecentProperties />

        <PropertyStatsSummary />

        <AdminFooter />
      </section>
    </main>
  );
}