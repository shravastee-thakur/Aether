import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Plans from "../components/Plans";
import AetherCTA from "../components/AetherCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Plans />
      <AetherCTA />
      <Footer />
    </>
  );
};

export default Home;
