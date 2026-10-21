import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-2 sm:px-4">
      <div className="backdrop-blur-md bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl 
        p-4 sm:p-6 md:p-10 w-full max-w-sm sm:max-w-md flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-1 sm:mb-2">Login</span>
          <span className="text-xs sm:text-sm text-gray-400 text-center">
            Welcome back! Please enter your credentials.
          </span>
        </div>
        <form className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="email" className="text-gray-200 text-xs sm:text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-lg border border-gray-700 bg-gray-800/70 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="password" className="text-gray-200 text-xs sm:text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg border border-gray-700 bg-gray-800/70 backdrop-blur px-3 sm:px-4 py-2 sm:py-3 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-gray-100 font-bold shadow-lg hover:from-gray-900 hover:to-gray-700 transition uppercase tracking-wide text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;