import LeftSide from "@/components/propertyDetails/LeftSide";
import PropertyDetailHeader from "@/components/propertyDetails/PropertyDetailHeader";
import PropertyDetailsHero from "@/components/propertyDetails/PropertyDetailsHero";
import RightSide from "@/components/propertyDetails/RightSide";

export default function PropertyDetails() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-4 py-8 text-[#202820] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <PropertyDetailHeader />

        {/* Property overview */}
       <PropertyDetailsHero />

        {/* Description and details */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">

          {/* Left column */}
         <LeftSide />

          {/* Right column */}
          <RightSide />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-wrap justify-between gap-3 border-t border-gray-200 py-6 text-xs text-gray-400">
          <p>© 2026 Atelier Realty. Admin Dashboard.</p>
          <p>Property Management System</p>
        </footer>
      </div>
    </main>
  );
}