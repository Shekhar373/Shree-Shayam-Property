"use client";
import { useState } from "react";

type InquiryFormFields = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
};

const initialFormState: InquiryFormFields = {
  name: "",
  email: "",
  phone: "",
  propertyType: "",
  message: "",
};

export default function Inquiryformm() {
  const [form, setForm] = useState<InquiryFormFields>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);

    const data = { ...form };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // assuming the API always returns a JSON object
      // with either a property 'error' or the result
      const result: { error?: string } = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "something went wrong");
      }

      setMessage("Inquiry submitted successfully");
      setForm(initialFormState);
    } catch (error: unknown) {
      if (typeof error === "object" && error && "message" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setMessage((error as any).message || "Failed to submit inquiry");
      } else {
        setMessage("Failed to submit inquiry");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center px-2 py-6 md:px-6 lg:py-10 bg-white">
      <span className="mb-5 w-fit rounded-full border border-black/10 px-4 py-2 text-xs">
        Get in touch ↗
      </span>

      <h2 className="mb-3 text-4xl font-medium tracking-tight text-black md:text-5xl">
        Let’s find your
        <br />
        dream property.
      </h2>

      <p className="mb-8 max-w-md text-sm leading-6 text-black/60">
        Tell us what you’re looking for. Our team will help you find a property
        that feels right for you.
      </p>

      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="space-y-5"
      >
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
              value={form.name}
              onChange={handleChange}
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
              value={form.email}
              onChange={handleChange}
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
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-full border border-black/15 bg-white/50 px-5 py-3.5 text-sm outline-none transition focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">
            Property type
          </label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
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
          <label className="mb-2 block text-xs font-medium">Your message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your preferred location, budget, or requirements..."
            value={form.message}
            onChange={handleChange}
            className="w-full resize-y rounded-[20px] border border-black/15 bg-white/50 px-5 py-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-between gap-8 rounded-full bg-black px-7 py-4 text-sm text-white transition duration-300 hover:bg-[#303a32]"
        >
          {loading ? "submitting...." : "Send Inquiry"}
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </button>

        {message && (
          <p
            role="status"
            className={`text-center font-medium mt-2 ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-xs leading-5 text-black/45">
          By submitting this form, you agree to be contacted about your property
          inquiry.
        </p>
      </form>
    </div>
  );
}
