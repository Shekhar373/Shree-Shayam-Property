export default function Loading() {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#000002] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-3xl font-medium tracking-widest">
            YOUR BRAND
          </h1>
  
          <div className="w-40 h-[2px] bg-white/20 overflow-hidden">
            <div className="h-full w-1/2 bg-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }