import Image from "next/image";
import Inquiryformm from "./InquiryFrom";

export default function InquiryPage() { 
  return (
    <section className="my-[20vh]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 bg-[#f0f3ef] p-4 md:p-6 lg:grid-cols-2 lg:gap-8 lg:p-10">
        {/* Inquiry Form */}
        <Inquiryformm />

        {/* Property Image */}
        <div className="group relative min-h-[400px] overflow-hidden md:min-h-[550px] lg:min-h-full">
          <div data-speed='0.8'>
          <img
            src="https://i.pinimg.com/1200x/00/1a/73/001a736ab25c4c2860c028c813a34b30.jpg"
            alt="Modern luxury property with a landscaped garden"
            className="object-cover w-full h-[120%]"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/90 p-4 backdrop-blur-md md:bottom-7 md:left-7 md:right-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4e9e2] text-xl">
              ⌖
            </div>

            <div>
              <p className="text-sm font-medium text-black">
                Find your dream home
              </p>
              <p className="mt-1 text-xs text-black/50">
                Premium properties. Trusted service.
              </p>
            </div>

            <span className="ml-auto text-xl text-black">↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
