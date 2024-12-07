import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          About Us
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          We are a passionate team committed to providing the best online shopping experience. At YourWebsite.com, our mission is to make buying and selling easier for everyone.
        </p>
        
        {/* Our Values Section */}
        <div className="flex flex-wrap justify-center gap-10">
          <div className="w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Innovation</h2>
            <p className="text-gray-600">
              We believe in innovation and constantly strive to improve our platform with new features and technologies.
            </p>
          </div>
          
          <div className="w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customer Focus</h2>
            <p className="text-gray-600">
              Our customers are our top priority. We listen to your feedback and work hard to provide excellent customer support.
            </p>
          </div>
          
          <div className="w-full sm:w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sustainability</h2>
            <p className="text-gray-600">
              We are dedicated to sustainable practices, minimizing our environmental impact, and supporting eco-friendly products.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Meet Our Team</h2>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">CEO</p>
            </div>

            <div className="text-center">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>

            <div className="text-center">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-900">Alice Johnson</h3>
              <p className="text-gray-600">COO</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-4">
            Have any questions or want to learn more about us? Feel free to reach out!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
