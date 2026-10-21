"use client"
import React, { useState } from 'react';

const InquiryForm = () => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
    propertyType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add actual submission logic here
    alert('Inquiry submitted!');
    setForm({
      name: '',
      number: '',
      email: '',
      message: '',
      propertyType: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full bg-white rounded-4xl shadow-lg p-8 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-medium font-[heading-font] mb-2">Send us an <br /> inquiry</h2>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="number" className="font-semibold">
          Contact Number
        </label>
        <input
          id="number"
          name="number"
          type="tel"
          value={form.number}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none"
          pattern="[0-9+ ]*"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="propertyType" className="font-semibold">
          Type of Property
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none"
        >
          <option value="" disabled>
            Select property type
          </option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="plot">Plot/Land</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-[#000001] text-white px-6 py-2 rounded-4xl mt-6 w-fit self-center hover:bg-black/80 transition"
      >
        Submit Inquiry
      </button>
    </form>
  );
};

export default InquiryForm;