import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import WeightCalculator from '../components/sections/WeightCalculator';
import HowItWorksTimeline from '../components/sections/HowItWorksTimeline';


import Features from '../components/sections/Features';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';
import Footer from '../components/sections/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WeightCalculator />
        <HowItWorksTimeline />

        <Features />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
