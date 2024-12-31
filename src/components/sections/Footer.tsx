import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

interface FooterProps {
  onSubscribe?: (email: string) => void;
}

const Footer = ({ onSubscribe = () => {} }: FooterProps) => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0A0F1C] py-16 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Resources */}
          <div>
            <h3 className="font-space-grotesk font-medium text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-space-grotesk font-medium text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-space-grotesk font-medium text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-space-grotesk font-medium text-white mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-200"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className="font-space-grotesk font-medium text-white mb-4">
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1A1F2E] border-gray-800 text-white placeholder-gray-400"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#64FFDA]/90"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 TechNuggets. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-[#64FFDA] hover:text-[#64FFDA] transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-[#64FFDA] hover:text-[#64FFDA] transition-colors duration-200"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-[#64FFDA] hover:text-[#64FFDA] transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:border-[#64FFDA] hover:text-[#64FFDA] transition-colors duration-200"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
