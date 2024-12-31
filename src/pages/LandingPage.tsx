import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import SearchInterface from "@/components/sections/SearchInterface";
import EventShowcase from "@/components/sections/EventShowcase";
import JobBoard from "@/components/sections/JobBoard";
import MentorNetwork from "@/components/sections/MentorNetwork";
import InteractiveCalendar from "@/components/sections/InteractiveCalendar";
import CommunityTestimonials from "@/components/sections/CommunityTestimonials";
import Footer from "@/components/sections/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <SearchInterface />
      <EventShowcase />
      <JobBoard />
      <MentorNetwork />
      <InteractiveCalendar />
      <CommunityTestimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
