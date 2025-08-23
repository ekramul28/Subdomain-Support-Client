/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { type TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Home, ShoppingBasket } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const roleBasedPaths = {
  admin: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    { name: "Users", path: "/admin/users", icon: <Home className="w-5 h-5" /> },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Home className="w-5 h-5" />,
    },
  ],
  user: [
    { name: "Home", path: "/user/home", icon: <Home className="w-5 h-5" /> },
    {
      name: "Shops",
      path: "/user/shops",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      name: "Support",
      path: "/user/support",
      icon: <Home className="w-5 h-5" />,
    },
  ],
  guest: [
    { name: "Explore", path: "/explore", icon: <Home className="w-5 h-5" /> },
    { name: "About", path: "/about", icon: <Home className="w-5 h-5" /> },
    { name: "Contact", path: "/contact", icon: <Home className="w-5 h-5" /> },
  ],
};
const Sidebar: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  const user = token ? (verifyToken(token) as TUser) : null;
  const role = user?.role;
  const sidebarItems = role
    ? roleBasedPaths[role as keyof typeof roleBasedPaths]
    : [];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen overflow-auto border-r text-primary sticky top-0 hidden lg:flex flex-col justify-between">
        <div>
          <div className="p-4 text-xl font-bold text-primary border-b">
            AcademicMS
          </div>
          <ScrollArea className="flex-1 p-4">
            <nav className="flex flex-col gap-2">
              {sidebarItems.map((item: any) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-4 py-2 font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>

        {/* Back to Home Button */}
        <div className="p-4 border-t">
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-md transition"
          >
            <Home className="w-5 h-5" />
            <span className="ml-2">Back to Home</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
