import Image from "next/image";

export default function InquiryPage() {
  return (
    <section className="my-[20vh]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 rounded-[28px] bg-[#f0f3ef] p-4 md:p-6 lg:grid-cols-2 lg:gap-8 lg:p-10">
        {/* Inquiry Form */}
        <div className="flex flex-col justify-center px-2 py-6 md:px-6 lg:py-10 bg-white rounded-4xl">
          <span className="mb-5 w-fit rounded-full border border-black/10 px-4 py-2 text-xs">
            Get in touch ↗
          </span>

          <h2 className="mb-3 text-4xl font-medium tracking-tight text-black md:text-5xl">
            Let’s find your
            <br />
            dream property.
          </h2>

          <p className="mb-8 max-w-md text-sm leading-6 text-black/60">
            Tell us what you’re looking for. Our team will help you find a
            property that feels right for you.
          </p>

          <form action="/api/inquiry" method="POST" className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium">
                  Full name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full rounded-full border border-black/15 bg-white/50 px-5 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-full border border-black/15 bg-white/50 px-5 py-3.5 text-sm outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium">
                Phone number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                required
                className="w-full rounded-full border border-black/15 bg-white/50 px-5 py-3.5 text-sm outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium">
                Property type
              </label>
              <select
                name="propertyType"
                defaultValue=""
                className="w-full appearance-none rounded-full border border-black/15 bg-white/50 px-5 py-3.5 text-sm outline-none transition focus:border-black"
              >
                <option value="" disabled>
                  Select property type
                </option>
                <option value="apartment">Apartment</option>
                <option value="house">Independent house</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial property</option>
                <option value="land">Land / Plot</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium">
                Your message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your preferred location, budget, or requirements..."
                className="w-full resize-y rounded-[20px] border border-black/15 bg-white/50 px-5 py-4 text-sm outline-none transition focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-between gap-8 rounded-full bg-black px-7 py-4 text-sm text-white transition duration-300 hover:bg-[#303a32]"
            >
              Send inquiry
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </button>

            <p className="text-xs leading-5 text-black/45">
              By submitting this form, you agree to be contacted about your
              property inquiry.
            </p>
          </form>
        </div>

        {/* Property Image */}
        <div className="group relative min-h-[400px] overflow-hidden rounded-[22px] md:min-h-[550px] lg:min-h-full">
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
