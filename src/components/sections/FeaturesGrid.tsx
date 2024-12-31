import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Zap } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title = "Feature Title",
  description = "Feature description goes here",
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(100, 255, 218, 0.1)",
      }}
      className="w-[280px] h-[320px] bg-[#1A1F2E] rounded-lg p-6 border border-transparent hover:border-[#64FFDA] transition-colors duration-200"
    >
      <div className="w-12 h-12 rounded-full bg-[#64FFDA]/10 flex items-center justify-center mb-6">
        <div className="text-[#64FFDA]">{icon}</div>
      </div>
      <h3 className="font-space-grotesk text-xl font-medium text-white mb-4">
        {title}
      </h3>
      <p className="font-inter text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

interface FeaturesGridProps {
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const defaultFeatures = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Access",
    description:
      "Access your tech resources from anywhere in the world, anytime.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized performance for seamless learning experience.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Interactive Code",
    description: "Live coding environments for hands-on practice.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Powered",
    description: "Smart recommendations tailored to your learning journey.",
  },
];

const FeaturesGrid = ({ features = defaultFeatures }: FeaturesGridProps) => {
  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
