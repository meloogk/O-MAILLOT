"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
  Trophy,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileLayoutProps {
  readonly children: ReactNode;
}

interface Utilisateur {
  nom: string;
  email: string;
  photo?: string;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token") || null;

  const fetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      toast.error("Vous devez être connecté");
      router.push("/auth/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profil_infos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Erreur lors de la récupération du profil");

      const userData = await res.json();
      setUser({
        nom: userData.nom,
        email: userData.email,
        photo: userData.photo || "/avatars/01.png",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Session expirée. Veuillez vous reconnecter. (${err.message})`);
      } else {
        toast.error("Session expirée. Veuillez vous reconnecter.");
      }
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const menuItems = [
    { title: "Mon Profil", href: "/profile", icon: <User className="h-5 w-5" /> },
    {
      title: "Mes Commandes",
      href: "/profile/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Mes Favoris",
      href: "/profile/favorites",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: "Mes Récompenses",
      href: "/profile/rewards",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Paramètres",
      href: "/profile/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Chargement du profil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Aucun utilisateur connecté.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.photo} alt={user.nom} />
                  <AvatarFallback>{user.nom.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{user.nom}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
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
          </aside>

          {/* Main content */}
          <main className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
