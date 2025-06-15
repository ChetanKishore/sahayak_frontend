import React from 'react';

const DonorInformation = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, mobile, setMobile }) => (
  <div className="mb-6">
    <h3 className="text-base font-semibold mb-3 text-gray-700">Your Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        type="text"
        placeholder="First Name"
        className="border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        className="border border-gray-300 p-3 rounded-lg col-span-1 md:col-span-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
    </div>
  </div>
);

export default DonorInformation;
