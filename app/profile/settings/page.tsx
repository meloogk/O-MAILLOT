"use client";

import { useState } from "react";
import { useAuth } from "@/lib/store/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Eye, EyeOff, Save, Upload, Bell, Shield, Globe, CreditCard } from "lucide-react";

export default function UserSettingsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    dateOfBirth: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    language: "fr",
    currency: "EUR",
    theme: "light",
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    showEmail: false,
    showPhone: false,
    dataSharing: false,
  });

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Informations personnelles mises à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Mot de passe mis à jour");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Préférences mises à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload
      toast.success("Photo de profil mise à jour");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Paramètres du compte</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Mettez à jour vos informations de base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={personalInfo.city}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={personalInfo.postalCode}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, postalCode: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="country">Pays</Label>
                <Select
                  value={personalInfo.country}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, country: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Belgique">Belgique</SelectItem>
                    <SelectItem value="Suisse">Suisse</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Modifiez votre mot de passe et gérez la sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Gérez vos préférences de notification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications par email</Label>
              <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Notifications SMS</Label>
              <p className="text-sm text-gray-500">Recevoir des notifications par SMS</p>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Emails marketing</Label>
              <p className="text-sm text-gray-500">Recevoir des offres et promotions</p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Mises à jour de commandes</Label>
              <p className="text-sm text-gray-500">Notifications sur l'état de vos commandes</p>
            </div>
            <Switch
              checked={preferences.orderUpdates}
              onCheckedChange={(checked) => setPreferences({ ...preferences, orderUpdates: checked })}
            />
          </div>

          <Button onClick={handlePreferencesSubmit} disabled={isLoading} className="bg-green-500 hover:bg-green-600">
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Enregistrement..." : "Enregistrer les préférences"}
          </Button>
        </CardContent>
      </Card>

      {/* Préférences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Préférences
          </CardTitle>
          <CardDescription>
            Personnalisez votre expérience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="language">Langue</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency">Devise</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="USD">Dollar (USD)</SelectItem>
                  <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handlePreferencesSubmit} disabled={isLoading} className="bg-green-500 hover:bg-green-600">
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Enregistrement..." : "Enregistrer les préférences"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}