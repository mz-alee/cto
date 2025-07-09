"use client";

import React, { useEffect } from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import bird1 from "../../public/Images/bird1.jpg";
import bird2 from "../../public/Images/bird2.jpg";
import bird3 from "../../public/Images/bird3.jpg";
import bird4 from "../../public/Images/bird4.jpg";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";

export default function LandingPage() {
  const router = useRouter();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#847115] via-[#a68c2c] to-[#d2b34d] font-sans text-gray-800">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="text-center h-[100vh]   px-4"
      >
        <Navbar />
        <div className="flex flex-col mt-30">
          <h1
            data-aos="fade-up"
            data-aos-duration="500"
            className="text-4xl lg:text-6xl font-extrabold text-white/50 drop-shadow-sm"
          >
            Conservation Through Observation
          </h1>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto text-gray-700 italic"
          >
            Welcome to a <span className="font-semibold">social app</span> where
            bird lovers connect, share, and protect the beauty of our feathered
            friends. <span className="italic">Join the movement</span> and
            contribute by observing and sharing sightings from around the world.
          </p>
          <div
            data-aos-easing="ease-in"
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mt-8"
          >
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="hover:bg-[#c0a521] focus:bg-[#c0a521] focus:text-white  bg-transparent border border-[#c0a521] text-[#c0a521] rounded-tl-4xl rounded-br-4xl cursor-pointer hover:text-white text-md px-6 py-3 rounded-2xl shadow-lg transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Birds Section */}
      <section className="py-16 bg-white px-4" data-aos="fade-up">
        <h2 className="text-3xl lg:text-5xl font-bold text-center text-gray-600 italic  mb-8">
          Discover Birds
        </h2>
        <p className="text-center text-gray-600 text-md max-w-2xl mx-auto mb-12 italic">
          Explore unique bird species posted by our amazing community. Rare
          sightings, beautiful moments, and nature's beauty captured through
          observation.
        </p>

        <div className="flex  flex-wrap gap-6 max-w-6xl mx-auto">
          <div
            className="rounded-2xl w-[600px] shadow-md hover:shadow-xl transition bg-white overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="p-4">
              <Image
                src={bird1}
                alt={`Bird`}
                width={500}
                height={300}
                className="rounded-xl "
              />
              <h3 className="mt-4  text-[18px] lg:text-[1.2vw] text-gray-600 ">
                Beautiful Bird #
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[0.9vw] mt-2  italic">
                Shared by a community member. Add your own bird story and
                inspire others.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl sm:w-[300px] min-h-[400px] shadow-md hover:shadow-xl transition bg-white overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="p-4">
              <Image
                src={bird3}
                alt={`Bird `}
                width={400}
                height={300}
                className="rounded-xl object-cover"
              />
              <h3 className="mt-4 text-xl  text-[18px] lg:text-[1.2vw] text-gray-600">
                Beautiful Bird #
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[0.9vw] mt-2 italic">
                Shared by a community member. Add your own bird story and
                inspire others.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl sm:w-[200px] shadow-md hover:shadow-xl transition bg-white overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="p-4">
              <Image
                src={bird2}
                alt={`Bird `}
                width={400}
                height={400}
                className="rounded-xl h-[230px] object-cover"
              />
              <h3 className="mt-4 text-xl  text-[18px] lg:text-[1.2vw] text-gray-600">
                Beautiful Bird #
              </h3>
              <p className="text-gray-600 text-[13px] lg:text-[0.9vw] mt-2 italic">
                Shared by a community member. Add your own bird story and
                inspire others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-gray-900 text-white py-10 px-4 mt-1.5"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-[400]">
              Conservation Through Observation
            </h4>
            <p className="text-sm text-gray-300 italic">
              © {new Date().getFullYear()} All rights reserved. Stay connected
              and inspired.
            </p>
          </div>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
