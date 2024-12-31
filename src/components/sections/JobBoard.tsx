import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { MapPin, Building2, Calendar, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: string;
  company: string;
  logo: string;
  title: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
  postedDate: string;
  salary: number;
  experienceLevel: string;
}

const defaultJobs: Job[] = [
  {
    id: "1",
    company: "TechCorp",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "remote",
    postedDate: "2024-04-01",
    salary: 140000,
    experienceLevel: "Senior",
  },
  {
    id: "2",
    company: "InnovateLabs",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=InnovateLabs",
    title: "Full Stack Engineer",
    location: "New York, NY",
    type: "hybrid",
    postedDate: "2024-04-02",
    salary: 120000,
    experienceLevel: "Mid-Level",
  },
  {
    id: "3",
    company: "DataFlow",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataFlow",
    title: "Backend Developer",
    location: "Austin, TX",
    type: "onsite",
    postedDate: "2024-04-03",
    salary: 130000,
    experienceLevel: "Senior",
  },
];

const JobCard = ({ job }: { job: Job }) => {
  const typeColors = {
    remote: "text-green-400 bg-green-400/10",
    hybrid: "text-blue-400 bg-blue-400/10",
    onsite: "text-purple-400 bg-purple-400/10",
  };

  return (
    <div className="w-full h-40 bg-[#1A1F2E] rounded-lg p-6 flex gap-6 border border-gray-800 hover:border-[#64FFDA] transition-all duration-200">
      <div className="flex-shrink-0">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-16 h-16 rounded-lg bg-gray-800"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-space-grotesk text-xl font-bold text-white">
              {job.title}
            </h3>
            <Badge className="bg-[#64FFDA]/10 text-[#64FFDA]">
              ${job.salary.toLocaleString()}/year
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary" className={typeColors[job.type]}>
              {job.type}
            </Badge>
            <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
              {job.experienceLevel}
            </Badge>
          </div>
          <Button className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90">
            Quick Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

interface JobBoardProps {
  jobs?: Job[];
}

const JobBoard = ({ jobs = defaultJobs }: JobBoardProps) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([50000, 200000]);

  const handleSort = (value: string) => {
    const sorted = [...filteredJobs];
    switch (value) {
      case "recent":
        sorted.sort(
          (a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
        );
        break;
      case "salary":
        sorted.sort((a, b) => b.salary - a.salary);
        break;
    }
    setFilteredJobs(sorted);
  };

  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-space-grotesk text-3xl font-bold text-white">
            Job Opportunities
          </h2>
          <Select onValueChange={handleSort}>
            <SelectTrigger className="w-[180px] border-[#64FFDA] text-[#64FFDA]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1 space-y-6 bg-[#1A1F2E] p-6 rounded-lg h-fit">
            <div>
              <h3 className="font-space-grotesk font-medium text-white mb-4">
                Role Type
              </h3>
              <div className="space-y-2">
                {["Remote", "Hybrid", "Onsite"].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className={`w-full justify-start ${activeFilters.includes(type) ? "bg-[#64FFDA]/10 border-[#64FFDA] text-[#64FFDA]" : ""}`}
                    onClick={() => {
                      if (activeFilters.includes(type)) {
                        setActiveFilters(
                          activeFilters.filter((f) => f !== type),
                        );
                      } else {
                        setActiveFilters([...activeFilters, type]);
                      }
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-space-grotesk font-medium text-white mb-4">
                Experience Level
              </h3>
              <div className="space-y-2">
                {["Entry Level", "Mid-Level", "Senior", "Lead"].map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    className={`w-full justify-start ${activeFilters.includes(level) ? "bg-[#64FFDA]/10 border-[#64FFDA] text-[#64FFDA]" : ""}`}
                    onClick={() => {
                      if (activeFilters.includes(level)) {
                        setActiveFilters(
                          activeFilters.filter((f) => f !== level),
                        );
                      } else {
                        setActiveFilters([...activeFilters, level]);
                      }
                    }}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-space-grotesk font-medium text-white mb-4">
                Salary Range
              </h3>
              <Slider
                defaultValue={[50000, 200000]}
                max={200000}
                min={50000}
                step={10000}
                value={salaryRange}
                onValueChange={setSalaryRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>${salaryRange[0].toLocaleString()}</span>
                <span>${salaryRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
