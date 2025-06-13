"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/store/auth";
import { useCart } from "@/lib/store/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();

  // Calculer le nombre total d'articles dans le panier
  const cartItemCount = getItemCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Maillots", href: "/products" },
    { name: "Équipes", href: "/teams" },
    { name: "Cartes Cadeaux", href: "/gift-cards" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-green-500 dark:text-green-400 font-bold text-xl">
                O'MAILLOT
              </span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-green-500 dark:text-green-400"
                    : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <ThemeToggle />
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center p-0 min-w-[20px]">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
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
                    <Link href="/profile">Mon Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile/orders">Mes Commandes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile/favorites">Mes Favoris</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile/rewards">Mes Récompenses</Link>
                  </DropdownMenuItem>
                  {user?.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/admin/dashboard">Administration</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button 
                  variant="default"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Connexion
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            
            <Link href="/cart" className="mx-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center p-0 min-w-[20px]">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              aria-expanded={isMenuOpen}
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href
                    ? "text-green-500 dark:text-green-400"
                    : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon Profil
                </Link>
                <Link
                  href="/profile/rewards"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes Récompenses
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Administration
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}