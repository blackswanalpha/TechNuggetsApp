import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const HeroSection = ({
  title = "Welcome to TechNuggets",
  subtitle = "Your gateway to the future of tech learning and community",
  primaryCtaText = "Join the Community",
  secondaryCtaText = "Explore Events",
  onPrimaryCtaClick = () => console.log("Primary CTA clicked"),
  onSecondaryCtaClick = () => console.log("Secondary CTA clicked"),
}: HeroSectionProps) => {
  return (
    <div className="px-8 py-8">
      <section className="relative w-full bg-gradient-to-br from-[#0A0F1C] to-[#1A1F2E] overflow-hidden rounded-3xl">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 rounded-3xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C]/95 to-[#1A1F2E]/95 rounded-3xl" />
        </div>

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-4 py-24 min-h-[600px] flex flex-col justify-center items-center text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h1>

          <p className="font-inter text-xl md:text-2xl text-gray-300 max-w-2xl mb-12">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              size="lg"
              className="w-[180px] h-12 bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90 hover:scale-105 transition-all duration-200 font-medium"
              onClick={onPrimaryCtaClick}
            >
              {primaryCtaText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-[160px] h-12 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-all duration-200 font-medium"
              onClick={onSecondaryCtaClick}
            >
              {secondaryCtaText}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
