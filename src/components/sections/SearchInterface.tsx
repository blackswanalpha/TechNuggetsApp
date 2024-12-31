import React, { useState } from "react";
import { Search, Mic, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchInterfaceProps {
  onSearch?: (query: string) => void;
  recentSearches?: string[];
  categories?: string[];
}

const SearchInterface = ({
  onSearch = () => {},
  recentSearches = [
    "React Development",
    "TypeScript Tutorial",
    "Web Design Basics",
  ],
  categories = ["All", "Tutorials", "Events", "Jobs", "Mentors"],
}: SearchInterfaceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isActive, setIsActive] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setHasError(true);
      return;
    }
    setHasError(false);
    onSearch(searchQuery);
  };

  return (
    <div className="w-full bg-[#0A0F1C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-[720px] mx-auto">
          <div
            className={`
              relative flex items-center h-14 w-full rounded-full
              ${isActive ? "ring-2 ring-[#64FFDA] ring-opacity-50" : ""}
              ${hasError ? "ring-2 ring-red-500" : ""}
              bg-[#1A1F2E] transition-all duration-200
            `}
          >
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 px-4 flex items-center gap-2 text-gray-400 hover:text-white border-r border-gray-800"
                >
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1A1F2E] border-gray-800">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="text-gray-300 hover:text-white hover:bg-[#64FFDA]/10 cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              className="flex-1 h-14 bg-transparent border-0 text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            {/* Voice Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 text-gray-400 hover:text-white"
              onClick={() => console.log("Voice search clicked")}
            >
              <Mic className="h-5 w-5" />
            </Button>

            {/* Search Button */}
            <Button
              className="h-10 mr-2 bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Recent Searches */}
          {isActive && (
            <div className="absolute mt-2 w-full max-w-[720px] bg-[#1A1F2E] rounded-lg border border-gray-800 shadow-lg py-2">
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Recent Searches
                </h3>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-2 py-2 text-white hover:bg-[#64FFDA]/10 rounded-md transition-colors duration-200"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
