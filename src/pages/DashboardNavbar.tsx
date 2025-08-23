// components/dashboard/DashboardNavbar.tsx

"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, FileUser, LogOut, Store } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMeQuery } from "@/redux/features/auth/authApi";

const DashboardNavbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch logged-in user data
  const { data: user, isLoading } = useMeQuery(undefined);

  console.log("this is user data", user);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      dispatch(setUser({ user: null, token: null }));
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const handleShopClick = (shop: string) => {
    window.location.href = `http://${shop}.localhost:5173`;
  };

  return (
    <header className="w-full h-14 px-4 mb-2 lg:px-6 border-b flex items-center justify-between sticky top-0 z-50 bg-background shadow-sm">
      {/* Left: Brand + Mobile Sidebar trigger */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="flex items-center gap-4">
        {isLoading ? (
          <span className="text-sm text-muted-foreground">Loading...</span>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full"
              >
                <FileUser className="w-4 h-4" />
                <span className="hidden sm:block">{user.username}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Hi, {user.username}</DropdownMenuLabel>
              <p className="px-2 text-xs text-muted-foreground">{user.email}</p>
              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Your Shops
              </DropdownMenuLabel>
              {user?.shopNames?.map((shop: string) => (
                <DropdownMenuItem
                  key={shop}
                  onClick={() => handleShopClick(shop)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  {shop}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <div className="px-2 py-1 text-xs text-muted-foreground">
                <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
