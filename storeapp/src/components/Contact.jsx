import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can add logic here to send data to an API or email)
    alert('Message sent!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Contact Us
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          We’d love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out.
        </p>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium text-gray-900 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-medium text-gray-900 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message here"
                rows="6"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            You can also reach us through the following methods:
          </p>
          <div className="flex justify-center gap-16">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (234) 567-8901</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@yourwebsite.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">456 Your St, Your City, Your Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
