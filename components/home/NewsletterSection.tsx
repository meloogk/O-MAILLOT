"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast.success("Merci pour votre inscription !");
      // Ici, vous appelleriez votre API pour enregistrer l'email
    }, 1000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-500 dark:bg-orange-900">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6">
          <Mail className="h-8 w-8 text-orange-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3">
          Restez informé
        </h2>
        
        <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
          Inscrivez-vous à notre newsletter pour être le premier à découvrir nos nouvelles collections et offres exclusives.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white/10 text-white placeholder:text-white/70 border-white/20 focus-visible:ring-white"
          />
          
          <Button 
            type="submit"
            disabled={isLoading}
            className="bg-white text-orange-500 hover:bg-white/90 hover:text-orange-600"
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </Button>
        </form>
        
        <p className="mt-4 text-sm text-white/80">
          Nous respectons votre vie privée. Désabonnez-vous à tout moment.
        </p>
      </div>
    </section>
  );
}