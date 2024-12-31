import React from "react";
import { Menu, X, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  logo?: string;
  menuItems?: Array<{
    label: string;
    href: string;
    items?: Array<{ title: string; href: string; description?: string }>;
  }>;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
}

const defaultMenuItems = [
  {
    label: "Features",
    href: "#features",
    items: [
      {
        title: "Analytics",
        href: "#analytics",
        description: "Get detailed insights into your tech stack",
      },
      {
        title: "Integrations",
        href: "#integrations",
        description: "Connect with your favorite tools",
      },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "About",
    href: "#about",
  },
];

const Navbar = ({
  logo = "TechNuggets",
  menuItems = defaultMenuItems,
  isLoggedIn = false,
  onLogin = () => console.log("Login clicked"),
  onSignup = () => console.log("Signup clicked"),
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0F1C] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-white font-space-grotesk"
            >
              {logo}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-white hover:text-[#64FFDA] transition-colors duration-200 font-space-grotesk">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.title}
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="text-white hover:text-[#64FFDA] transition-colors duration-200 font-space-grotesk"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-[#64FFDA] transition-colors duration-200"
              >
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:text-[#64FFDA] transition-colors duration-200 font-space-grotesk"
                  onClick={onLogin}
                >
                  Login
                </Button>
                <Button
                  className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#4CD3B0] transition-colors duration-200 font-space-grotesk"
                  onClick={onSignup}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#64FFDA] transition-colors duration-200"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0A0F1C] border-gray-800"
              >
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-white hover:text-[#64FFDA] transition-colors duration-200 font-space-grotesk text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  {!isLoggedIn && (
                    <>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-[#64FFDA] transition-colors duration-200 font-space-grotesk"
                        onClick={onLogin}
                      >
                        Login
                      </Button>
                      <Button
                        className="bg-[#64FFDA] text-[#0A0F1C] hover:bg-[#4CD3B0] transition-colors duration-200 font-space-grotesk"
                        onClick={onSignup}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
