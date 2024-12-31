import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  available: boolean;
  rating: number;
  bio: string;
  hourlyRate: number;
}

const defaultMentors: Mentor[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    expertise: ["React", "TypeScript", "Node.js"],
    available: true,
    rating: 4.9,
    bio: "Senior Frontend Developer with 8+ years of experience. Passionate about teaching and helping others grow in their tech journey.",
    hourlyRate: 120,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    expertise: ["Python", "Machine Learning", "Data Science"],
    available: false,
    rating: 4.8,
    bio: "AI/ML Engineer specializing in deep learning and computer vision. Love mentoring aspiring data scientists.",
    hourlyRate: 150,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    expertise: ["UI/UX", "Design Systems", "Figma"],
    available: true,
    rating: 5.0,
    bio: "Lead Designer with a focus on creating intuitive and accessible user experiences. Excited to share knowledge and best practices.",
    hourlyRate: 100,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    expertise: ["AWS", "DevOps", "Kubernetes"],
    available: true,
    rating: 4.7,
    bio: "Cloud Architecture expert with extensive experience in building scalable systems. Ready to guide you through cloud technologies.",
    hourlyRate: 140,
  },
];

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="w-[240px] h-[320px] bg-[#1A1F2E] rounded-lg overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        <div className="p-6 flex flex-col items-center">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-4">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-space-grotesk text-lg font-medium text-white mb-2 text-center">
            {mentor.name}
          </h3>

          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {mentor.expertise.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-[#64FFDA]/10 text-[#64FFDA] text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < mentor.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Clock
              className={`w-4 h-4 ${mentor.available ? "text-green-400" : "text-gray-400"}`}
            />
            <span
              className={`text-sm ${mentor.available ? "text-green-400" : "text-gray-400"}`}
            >
              {mentor.available ? "Available Now" : "Unavailable"}
            </span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0A0F1C]/90 p-6 flex flex-col justify-center items-center"
              >
                <p className="text-white text-sm text-center mb-4 line-clamp-4">
                  {mentor.bio}
                </p>
                <Button
                  className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90"
                  onClick={() => setIsOpen(true)}
                >
                  View Profile
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#1A1F2E] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="font-space-grotesk text-2xl font-bold">
              Mentor Profile
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-start gap-6 mt-4">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h3 className="font-space-grotesk text-xl font-medium mb-2">
                {mentor.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < mentor.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                  />
                ))}
                <span className="text-gray-400">({mentor.rating})</span>
              </div>
              <p className="text-gray-300 mb-4">{mentor.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-[#64FFDA]/10 text-[#64FFDA]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${mentor.available ? "text-green-400" : "text-gray-400"}`}
                  />
                  <span
                    className={`${mentor.available ? "text-green-400" : "text-gray-400"}`}
                  >
                    {mentor.available ? "Available Now" : "Unavailable"}
                  </span>
                </div>
                <span className="text-[#64FFDA] font-medium">
                  ${mentor.hourlyRate}/hour
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              Message
            </Button>
            <Button className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90">
              Book Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface MentorNetworkProps {
  mentors?: Mentor[];
}

const MentorNetwork = ({ mentors = defaultMentors }: MentorNetworkProps) => {
  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              Expert Mentors
            </h2>
            <p className="text-gray-400">Connect with industry professionals</p>
          </div>
          <Button
            variant="outline"
            className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
          >
            View All <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorNetwork;
