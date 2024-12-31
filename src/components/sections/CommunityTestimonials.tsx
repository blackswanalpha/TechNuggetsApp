import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "TechNuggets has been instrumental in my journey from a beginner developer to a confident professional. The mentorship program is exceptional!",
    author: "Alex Thompson",
    role: "Frontend Developer at Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The community here is incredibly supportive and knowledgeable. I've learned more in 6 months than I did in 2 years of self-study.",
    author: "Maria Garcia",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "The quality of content and events is outstanding. It's the perfect platform for staying updated with the latest tech trends.",
    author: "James Wilson",
    role: "Senior Software Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 4,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#1A1F2E] p-8 rounded-lg border border-gray-800 h-full flex flex-col"
    >
      <div className="flex-1">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
            />
          ))}
        </div>
        <p className="text-gray-300 text-lg mb-6 font-inter italic">
          "{testimonial.quote}"
        </p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-space-grotesk font-medium text-white">
            {testimonial.author}
          </h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface CommunityTestimonialsProps {
  testimonials?: Testimonial[];
}

const CommunityTestimonials = ({
  testimonials = defaultTestimonials,
}: CommunityTestimonialsProps) => {
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
    [AutoPlay(5000)],
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
          <div>
            <h2 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              Community Voices
            </h2>
            <p className="text-gray-400">What our members are saying</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.prev()}
              className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.next()}
              className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider min-h-[300px]">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="keen-slider__slide">
              <TestimonialCard testimonial={testimonial} />
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

export default CommunityTestimonials;
