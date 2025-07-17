"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, ShoppingBag, Phone } from "lucide-react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Config Firebase (remplace par tes variables d'env)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  motDePasse: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pour connexion par téléphone
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      motDePasse: "",
      rememberMe: false,
    },
  });

  // Connexion classique (email + mot de passe) avec récupération et stockage du token
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          motDePasse: data.motDePasse,
          rememberMe: data.rememberMe,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        const { token } = result;  // Assure-toi que ton backend renvoie { data: { token, ... } }

        if (token) {
          // Stocker le token : localStorage si "rememberMe", sinon sessionStorage
          if (data.rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }

          toast.success("Connexion réussie");
          router.push("/profile"); // Ou dashboard selon ta logique
        } else {
          toast.error("Token manquant dans la réponse");
        }
      } else {
        toast.error(result.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion classique:", error);
      toast.error("Erreur serveur, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };


  // Connexion Google via Firebase + backend
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${BACKEND_URL}/api/auth_google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Connexion Google réussie");
        router.push("/");
      } else {
        toast.error(data.message || "Erreur lors de la connexion Google");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la connexion Google");
    } finally {
      setIsLoading(false);
    }
  };

  // Envoi du SMS pour téléphone (reCAPTCHA invisible)
  const sendVerificationCode = async () => {
    if (!phone) {
      toast.error("Veuillez entrer un numéro de téléphone");
      return;
    }
    try {
      // Le premier argument est auth, le deuxième l'id conteneur (string), puis options
      const appVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      toast.success("Code envoyé par SMS");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'envoi du code");
    }
  };

  // Vérification du code reçu + appel backend
  const verifyCodeAndSignIn = async () => {
    if (!verificationCode) {
      toast.error("Veuillez entrer le code reçu par SMS");
      return;
    }
    if (!confirmationResult) {
      toast.error("Vous devez d'abord envoyer le code");
      return;
    }
    try {
      const result = await confirmationResult.confirm(verificationCode);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${BACKEND_URL}/api/auth_phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Connexion par téléphone réussie");
        router.push("/");
      } else {
        toast.error(data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error(error);
      toast.error("Code invalide ou erreur");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <ShoppingBag className="h-8 w-8" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ou{" "}
          <Link
            href="/auth/register"
            className="font-medium text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
          >
            créez un compte gratuitement
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motDePasse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium cursor-pointer">
                        Se souvenir de moi
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>

          {/* --- Options de connexion tierces --- */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Ou continuer avec
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 justify-center"
                disabled={isLoading}
              >
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Google
              </Button>

              {/* Si Facebook ou autre méthode tu peux ajouter ici */}

              <Button
                variant="outline"
                onClick={() => setShowPhoneModal(true)}
                className="flex items-center gap-2 justify-center"
                disabled={isLoading}
              >
                <Phone className="w-10 h-10" />
                Téléphone
              </Button>
            </div>
          </div>

          {/* Modal pour connexion téléphone */}
          <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connexion par téléphone</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Ex: +2250102030405"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={sendVerificationCode} disabled={isLoading}>
                  Envoyer le code
                </Button>
                <Input
                  placeholder="Code reçu par SMS"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={verifyCodeAndSignIn} disabled={isLoading}>
                  Valider le code
                </Button>
              </div>
              <div id="recaptcha-container" className="mt-4" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
