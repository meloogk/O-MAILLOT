"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  AlertTriangle,
  Bell,
  Globe,
  Lock,
  Mail,
  Package,
  Palette,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Users,
  Save,
  Upload
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const settingsSchema = z.object({
  // Paramètres généraux
  siteName: z.string().min(2, "Le nom du site est requis"),
  siteDescription: z.string(),
  language: z.string(),
  timezone: z.string(),
  
  // Paramètres de la boutique
  currency: z.string(),
  vatRate: z.number().min(0).max(100),
  lowStockThreshold: z.number().min(0),
  returnPeriod: z.number().min(0),
  
  // Livraison
  defaultShippingFee: z.number().min(0),
  freeShippingThreshold: z.number().min(0),
  estimatedDeliveryDays: z.number().min(1),
  
  // Paiements
  stripePublicKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  
  // Emails
  smtpHost: z.string(),
  smtpPort: z.number(),
  smtpUser: z.string().email(),
  smtpPassword: z.string(),
  senderEmail: z.string().email(),
  
  // Apparence
  primaryColor: z.string(),
  darkMode: z.boolean(),
  
  // SEO
  metaDescription: z.string(),
  
  // Sécurité
  twoFactorAuth: z.boolean(),
  passwordMinLength: z.number().min(8),
  
  // Fonctionnalités
  loyaltyProgram: z.boolean(),
  productReviews: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const settingsSections = [
  {
    id: "general",
    title: "Paramètres généraux",
    description: "Configuration de base de votre boutique",
    icon: Settings,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
  },
  {
    id: "shop",
    title: "Boutique",
    description: "Configuration commerciale et produits",
    icon: ShoppingBag,
    color: "text-green-600 bg-green-100 dark:bg-green-900/30"
  },
  {
    id: "shipping",
    title: "Livraison",
    description: "Options et tarifs de livraison",
    icon: Package,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
  },
  {
    id: "payments",
    title: "Paiements",
    description: "Moyens de paiement acceptés",
    icon: Globe,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
  },
  {
    id: "emails",
    title: "Emails",
    description: "Configuration SMTP et notifications",
    icon: Mail,
    color: "text-red-600 bg-red-100 dark:bg-red-900/30"
  },
  {
    id: "appearance",
    title: "Apparence",
    description: "Thème et personnalisation visuelle",
    icon: Palette,
    color: "text-pink-600 bg-pink-100 dark:bg-pink-900/30"
  },
  {
    id: "seo",
    title: "SEO",
    description: "Référencement et métadonnées",
    icon: Search,
    color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30"
  },
  {
    id: "security",
    title: "Sécurité",
    description: "Paramètres de sécurité et authentification",
    icon: Shield,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
  },
  {
    id: "advanced",
    title: "Fonctionnalités avancées",
    description: "Options et modules complémentaires",
    icon: Lock,
    color: "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "O'MAILLOT",
      siteDescription: "Votre boutique de maillots de sport",
      language: "fr",
      timezone: "Europe/Paris",
      
      currency: "XOF",
      vatRate: 18,
      lowStockThreshold: 5,
      returnPeriod: 14,
      
      defaultShippingFee: 1000,
      freeShippingThreshold: 50000,
      estimatedDeliveryDays: 3,
      
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpUser: "contact@omaillot.fr",
      smtpPassword: "",
      senderEmail: "contact@omaillot.fr",
      
      primaryColor: "#22c55e",
      darkMode: false,
      
      metaDescription: "Boutique en ligne de maillots de sport",
      
      passwordMinLength: 8,
      twoFactorAuth: false,
      
      loyaltyProgram: false,
      productReviews: true,
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Paramètres mis à jour avec succès");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du site</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="siteDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du site</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Langue</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une langue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuseau horaire</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un fuseau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "shop":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devise</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une devise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="USD">Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vatRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taux de TVA (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seuil de stock bas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Nombre d'articles en dessous duquel une alerte sera déclenchée
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Délai de retour (jours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="defaultShippingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frais de livraison par défaut (FCFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="freeShippingThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seuil de livraison gratuite (FCFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Montant à partir duquel la livraison devient gratuite
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDeliveryDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Délai de livraison estimé (jours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="stripePublicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clé publique Stripe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stripeSecretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clé secrète Stripe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case "emails":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="smtpHost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serveur SMTP</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smtpPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port SMTP</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="smtpUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utilisateur SMTP</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smtpPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe SMTP</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="senderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email d'expédition</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <FormLabel>Logo du site</FormLabel>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Glissez-déposez votre logo ici ou cliquez pour sélectionner
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Couleur principale</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input {...field} disabled={isLoading} />
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">Mode sombre</FormLabel>
                    <FormDescription>
                      Activer le thème sombre par défaut
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );

      case "seo":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Description qui apparaîtra dans les résultats de recherche
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="twoFactorAuth"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">
                      Authentification à deux facteurs
                    </FormLabel>
                    <FormDescription>
                      Exiger l'authentification à deux facteurs pour tous les utilisateurs
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordMinLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Longueur minimale du mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case "advanced":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="loyaltyProgram"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">
                      Programme de fidélité
                    </FormLabel>
                    <FormDescription>
                      Activer le système de points et récompenses
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productReviews"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="text-base">
                      Avis produits
                    </FormLabel>
                    <FormDescription>
                      Permettre aux clients de laisser des avis
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez la configuration de votre boutique
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation des sections */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  activeSection === section.id
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${
                      activeSection === section.id
                        ? "text-green-900 dark:text-green-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}>
                      {section.title}
                    </h3>
                    <p className={`text-sm ${
                      activeSection === section.id
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu de la section */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {settingsSections.find(s => s.id === activeSection)?.title}
              </CardTitle>
              <CardDescription>
                {settingsSections.find(s => s.id === activeSection)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderSectionContent()}
                  
                  <div className="flex justify-end pt-6 border-t">
                    <Button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      disabled={isLoading}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}