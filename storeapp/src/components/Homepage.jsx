import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
const HomePage = () => {
  const [text, setText] = useState("");
  const [newArrivals,setnewArrivals]= useState([])
  const words = ["Hello, World!", "Welcome to my Apple Store."];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;



  

  // const newArrivals = [
  //   {
  //     img: "https://your-image-url.com/new-arrival1.jpg",
  //     title: "iPhone 15 Pro",
  //     description: "The most powerful iPhone ever.",
  //   },
  //   {
  //     img: "https://your-image-url.com/new-arrival2.jpg",
  //     title: "MacBook Air",
  //     description: "Light, thin, and powerful.",
  //   },
  //   {
  //     img: "https://your-image-url.com/new-arrival3.jpg",
  //     title: "Apple Watch Series 9",
  //     description: "Track your fitness and health in style.",
  //   },
  // ];

  const recommendations = [
    {
      img: "https://your-image-url.com/product1.jpg",
      title: "iPhone 15 Pro",
      description: "The most powerful iPhone ever.",
    },
    {
      img: "https://your-image-url.com/product2.jpg",
      title: "MacBook Air",
      description: "Light, thin, and powerful.",
    },
    {
      img: "https://your-image-url.com/product3.jpg",
      title: "Apple Watch Series 9",
      description: "Track your fitness and health in style.",
    },
  ];

  const fetchData =async ()=>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/products/')
      const data = response.data
      setnewArrivals(data)
    }catch(err){
      console.log(err.message);
      
    }



  }
  function type() {
    currentWord = words[i];
    if (isDeleting) {
      setText(currentWord.substring(0, j - 1));
      j--;
      if (j === 0) {
        isDeleting = false;
        i++;
        if (i === words.length) {
          i = 0;
        }
      }
    } else {
      setText(currentWord.substring(0, j + 1));
      j++;
      if (j === currentWord.length) {
        isDeleting = true;
      }
    }
    setTimeout(type, 100);
  }
  useEffect(() => {
    fetchData()

    type();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("src/assets/homepage.jpg")' }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s">
            <div className="w-full h-full flex justify-center items-center">
              <h1 id="typewriter" className="text-4xl font-bold">
                {text}
              </h1>
            </div>
          </h1>
          <p className="text-lg mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Your one-stop shop for the latest Apple products.
          </p>
          <Link to={'/shop'} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full text-lg animate__animated animate__fadeIn animate__delay-3s">
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-gray-100">
        <div className="text-center mb-12 animate__animated animate__fadeIn animate__delay-1s">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">New Arrivals</h2>
          <p className="text-gray-700">Explore our latest collection of Apple products.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {newArrivals.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`http://127.0.0.1:8000/${product.images[0].image}`}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <Link to={`/product/${product.id}`} className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-400">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh Recommendations Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="text-center mb-12 animate__animated animate__fadeIn animate__delay-1s">
          <h2 className="text-3xl font-bold mb-6">Fresh Recommendations</h2>
          <p className="text-lg">Check out our handpicked recommendations just for you!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {recommendations.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <Link to={`/product/${product.id}`} className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-400">
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="text-center mb-12 animate_animated animatefadeIn animate_delay-1s">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <p className="text-lg">Real feedback from happy customers.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {/* Testimonial 1 */}
          <div className="w-80 bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <p className="text-gray-400 mb-4">
              "The iPhone 15 Pro is amazing! The performance is unmatched, and the design is sleek. I love it!"
            </p>
            <div className="flex items-center">
              <img
                src="src/assets/john.png"
                alt="Customer 1"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-200 font-semibold">John Doe</p>
                <p className="text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="w-80 bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <p className="text-gray-400 mb-4">
              "The MacBook Air is perfect for my work. It's lightweight and powerful. Highly recommend it!"
            </p>
            <div className="flex items-center">
              <img
                src="src/assets/jame.jpg"
                alt="Customer 2"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-200 font-semibold">Jane Smith</p>
                <p className="text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="w-80 bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <p className="text-gray-400 mb-4">
              "I can't get enough of the Apple Watch Series 9! It's the perfect companion for tracking my fitness."
            </p>
            <div className="flex items-center">
              <img
                src="src/assets/Emily.jpg"
                alt="Customer 3"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-200 font-semibold">Emily Clark</p>
                <p className="text-gray-500">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section><br />

      {/* CTA Section */}
      <section className="py-16 bg-emerald-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg mb-6">Stay up to date with the latest Apple product releases and exclusive offers.</p>
        <button className="px-8 py-3 bg-white text-emerald-500 rounded-full text-lg hover:bg-gray-100">Subscribe Now</button>
      </section>
    </div>
  );
};



export default HomePage;
