"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Receipt, 
  CreditCard,
  Users,
  Settings,
  ChevronRight,
  LogOut,
  BarChart3,
  Gift,
  User
} from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Ne pas afficher le layout si l'utilisateur n'est pas admin
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  const menuItems = [
    {
      title: "Vue d'ensemble",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: "Produits",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      title: "Commandes",
      href: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      title: "Factures",
      href: "/admin/invoices",
      icon: <Receipt className="h-5 w-5" />
    },
    {
      title: "Paiements",
      href: "/admin/payments",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Clients",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Cartes Cadeaux",
      href: "/admin/gift-cards",
      icon: <Gift className="h-5 w-5" />
    },
    {
      title: "Statistiques",
      href: "/admin/stats",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md group transition-colors",
                    pathname === item.href 
                      ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "mr-3",
                    pathname === item.href
                      ? "text-green-500 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400"
                  )}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>
                  <ChevronRight className={cn(
                    "ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all",
                    pathname === item.href && "opacity-100"
                  )} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/avatars/01.png" alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">Administrateur</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Mon Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}