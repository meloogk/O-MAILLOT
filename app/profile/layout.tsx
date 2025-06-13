"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  User,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  Trophy
} from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const menuItems = [
    {
      title: "Mon Profil",
      href: "/profile",
      icon: <User className="h-5 w-5" />
    },
    {
      title: "Mes Commandes",
      href: "/profile/orders",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      title: "Mes Favoris",
      href: "/profile/favorites",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Mes Récompenses",
      href: "/profile/rewards",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      title: "Paramètres",
      href: "/profile/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatars/01.png" alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-2 rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Déconnexion
                </Button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}