
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const categories = [
  {
    title: "Buy an apartment",
    offers: "1,315 offers",
    description: "Find your ideal home with ease.",
    details:
      "We offer a wide range of properties that match your lifestyle, budget, and needs.",
    image:
      "https://i.pinimg.com/1200x/52/e5/ae/52e5ae89d4eae9a4697c8f100a790f7a.jpg",
  },
  {
    title: "Rent an Apartment",
    offers: "2,785 offers",
    description: "Find a place to call home.",
    details:
      "Explore beautiful apartments designed around your lifestyle.",
    image:
      "https://i.pinimg.com/1200x/b4/70/a2/b470a2cd01fb273ebe36b6d39b0fe177.jpg",
  },
  {
    title: "Commercial Real Estate",
    offers: "894 offers",
    description: "Space for your next big idea.",
    details:
      "Discover premium commercial spaces for your business.",
    image:
      "https://i.pinimg.com/1200x/fe/7a/2f/fe7a2f98a2e483ee46cff5f9df64970d.jpg",
  },
];

export default function ServiceCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll(".property-card")
    );

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const active = index === 0;

        gsap.set(card, {
          flexGrow: active ? 1.7 : 1,
        });

        gsap.set(card.querySelector(".card-image"), {
          scale: active ? 1 : 1.12,
        });

        gsap.set(card.querySelector(".card-overlay"), {
          opacity: active ? 0.3 : 0.82,
        });

        gsap.set(card.querySelector(".card-details"), {
          autoAlpha: active ? 1 : 0,
          y: active ? 0 : 18,
        });
      });
    }, section);

    function activateCard(index: number) {
      if (activeRef.current === index) return;

      activeRef.current = index;

      cards.forEach((card, cardIndex) => {
        const active = cardIndex === index;

        gsap.to(card, {
          flexGrow: active ? 1.7 : 1,
          duration: 0.9,
          ease: "power4.out",
          overwrite: "auto",
        });

        gsap.to(card.querySelector(".card-image"), {
          scale: active ? 1 : 1.12,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(card.querySelector(".card-overlay"), {
          opacity: active ? 0.1 : 1,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(card.querySelector(".card-details"), {
          autoAlpha: active ? 1 : 0,
          y: active ? 0 : 18,
          duration: active ? 0.55 : 0.25,
          delay: active ? 0.12 : 0,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    }

    const handlers = cards.map((card, index) => {
      const handler = () => activateCard(index);
      card.addEventListener("mouseenter", handler);
      card.addEventListener("focusin", handler);

      return () => {
        card.removeEventListener("mouseenter", handler);
        card.removeEventListener("focusin", handler);
      };
    });

    return () => {
      handlers.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#edf0eb] p-4 md:px-8">
      <div
        ref={sectionRef}
        className="mx-auto flex w-full max-w-[1400px]
          flex-col gap-4 md:h-[340px] md:flex-row"
      >
        {categories.map((item) => (
          <article
            key={item.title}
            tabIndex={0}
            className="property-card relative min-h-[300px]
              flex-1 cursor-pointer overflow-hidden
              rounded-[28px] bg-white outline-none
              focus-visible:ring-2 focus-visible:ring-black
              md:min-h-0"
          >
            <img
              src={item.image}
              alt=""
              className="card-image absolute inset-0
                h-full w-full object-cover will-change-transform"
            />

            <div
              className="card-overlay pointer-events-none absolute
                inset-0 bg-white"
            />

            <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
              <h2 className="max-w-[340px] font-[heading-font] text-2xl font-medium
                leading-tight tracking-tight">
                {item.title}
              </h2>

              <span className="mt-5 w-fit rounded-full
                border border-black/15 bg-white/70 px-4 py-2 text-xs">
                {item.offers}
              </span>

              <div className="card-details mt-4 max-w-[340px]">
                <p className="font-medium">{item.description}</p>
                <p className="mt-2 text-sm leading-relaxed">
                  {item.details}
                </p>
              </div>

              <button
                aria-label={`Explore ${item.title}`}
                className="mt-auto ml-auto flex h-[68px] w-[68px]
                  shrink-0 items-center justify-center rounded-full
                  bg-black text-3xl text-white transition-transform
                  duration-300 hover:scale-110"
              >
                ↗
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
