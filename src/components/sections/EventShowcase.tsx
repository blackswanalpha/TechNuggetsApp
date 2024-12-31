import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Share2, Users } from "lucide-react";
import { motion } from "framer-motion";

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
  attendees: number;
  categories: string[];
}

const defaultEvents: Event[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940",
    title: "Tech Conference 2024",
    date: "2024-05-15",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    attendees: 250,
    categories: ["Conference", "Networking"],
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2940",
    title: "Web Development Workshop",
    date: "2024-05-20",
    description:
      "Hands-on workshop covering the latest web development technologies and best practices.",
    attendees: 50,
    categories: ["Workshop", "Development"],
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940",
    title: "AI/ML Meetup",
    date: "2024-05-25",
    description:
      "Monthly meetup for AI and Machine Learning enthusiasts to share knowledge and network.",
    attendees: 100,
    categories: ["Meetup", "AI"],
  },
];

const EventCard = ({ event }: { event: Event }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-[380px] h-[480px] bg-[#1A1F2E] rounded-xl overflow-hidden mx-auto"
    >
      <div className="relative h-[214px] w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Badge>
      </div>

      <div className="p-6">
        <h3 className="font-space-grotesk text-xl font-bold text-white mb-2">
          {event.title}
        </h3>
        <p className="font-inter text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-[#64FFDA]" />
          <span className="text-sm text-gray-400">
            {event.attendees} attending
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {event.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-[#64FFDA]/10 text-[#64FFDA]"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90">
            RSVP
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface EventShowcaseProps {
  events?: Event[];
}

const EventShowcase = ({ events = defaultEvents }: EventShowcaseProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      slides: {
        perView: 3,
        spacing: 24,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2, spacing: 16 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 16 },
        },
      },
      created() {
        setLoaded(true);
      },
    },
    [AutoPlay(3000)],
  );

  function AutoPlay(interval: number) {
    return (slider: any) => {
      let timeout: ReturnType<typeof setTimeout>;
      let mouseOver = false;

      function clearNextTimeout() {
        clearTimeout(timeout);
      }

      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, interval);
      }

      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    };
  }

  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-space-grotesk text-3xl font-bold text-white">
            Upcoming Events
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.prev()}
              className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.next()}
              className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              →
            </Button>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {events.map((event) => (
            <div key={event.id} className="keen-slider__slide">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(instanceRef.current.track.details.slides.length)].map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-[#64FFDA] w-4" : "bg-gray-600"}`}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventShowcase;
