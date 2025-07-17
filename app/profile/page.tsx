"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface UserData {
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  photo?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    photo: "",
  });
  const [previewImage, setPreviewImage] = useState<string>(""); // image à afficher en live
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        toast.error("Vous devez être connecté");
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profil_infos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Échec de la récupération des données");

        const userData = await res.json();
        setUser(userData);
        setFormData({
          nom: userData.nom || "",
          email: userData.email || "",
          telephone: userData.telephone || "",
          adresse: userData.adresse || "",
          photo: userData.photo || "",
        });
        setPreviewImage(userData.photo || "");
      } catch (error) {
        console.error("Erreur récupération utilisateur :", error);
        toast.error("Impossible de charger les données utilisateur");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Session expirée, veuillez vous reconnecter");
      router.push("/auth/login");
      return;
    }

    try {
      const form = new FormData();
      form.append("nom", formData.nom);
      if (formData.telephone) form.append("telephone", formData.telephone);
      if (formData.adresse) form.append("adresse", formData.adresse);
      if (selectedImage) form.append("photo", selectedImage);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/modifier_profil`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Ne pas ajouter Content-Type, fetch gère le multipart
        },
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
      }

      const data = await res.json();

      setUser(data.utilisateur);
      setFormData({
        nom: data.utilisateur.nom || "",
        email: data.utilisateur.email || "",
        telephone: data.utilisateur.telephone || "",
        adresse: data.utilisateur.adresse || "",
        photo: data.utilisateur.photo || "",
      });
      setPreviewImage(data.utilisateur.photo || "");
      setSelectedImage(null);

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Erreur serveur");
    }
  };

  if (isLoading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6 text-center">Utilisateur non connecté</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>

      <div className="space-y-8">
        {/* Photo de profil */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={previewImage || "/avatars/01.png"} alt={formData.nom} />
            <AvatarFallback>{formData.nom.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Photo de profil</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              JPG, GIF ou PNG. Max 1MB.
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="max-w-xs"
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Infos profil */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                Modifier le profil
              </Button>
            ) : (
              <>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  Confirmer modification
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedImage(null);
                    setPreviewImage(user.photo || "");
                    setFormData({
                      nom: user.nom,
                      email: user.email,
                      telephone: user.telephone || "",
                      adresse: user.adresse || "",
                      photo: user.photo || "",
                    });
                  }}
                >
                  Annuler
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
