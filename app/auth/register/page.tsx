"use client";

import { useState } from "react";
import Link from "next/link";
import type { ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, ShoppingBag ,Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup,RecaptchaVerifier,signInWithPhoneNumber,} from "firebase/auth";

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
const provider = new GoogleAuthProvider();

// IMPORTANT : change cette URL pour celle de ton backend Node.js
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ;

const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    telephone: z.string(),
    adresse: z.string(),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState(false);


  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      telephone: "",
      adresse: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.name,
          email: data.email,
          telephone: data.telephone,
          adresse: data.adresse,
          motDePasse: data.password,
          confirmationMotDePasse: data.confirmPassword,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Compte créé avec succès");
        router.push("/auth/login");
      } else {
        toast.error(result.message || "Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du compte");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${BACKEND_URL}/api/auth_google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Inscription / Connexion Google réussie");
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

  // Initialiser le reCAPTCHA invisible et envoyer le SMS
const sendVerificationCode = async () => {
  if (!phone) {
    toast.error("Veuillez entrer un numéro de téléphone");
    return;
  }
  try {
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

// Valider le code reçu et appeler backend
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

    // Appel backend pour création / connexion
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
          <div className="bg-orange-500 text-white p-3 rounded-full">
            <ShoppingBag className="h-8 w-8" />
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ou{" "}
          <Link
            href="/auth/login"
            className="font-medium text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
          >
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jean Parfait"
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
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>telephone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="0101283296"
                          {...field}
                          disabled={isLoading}
                        />
                       
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                
              />
              <FormField
             
                control={form.control}
                name="adresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>adresse</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Cocody Riviera"
                          {...field}
                          disabled={isLoading}
                        />
                       
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                
              />
              
              
              <FormField
                control={form.control}
                name="password"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
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

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        J&apos;accepte les{" "}
                        <Link
                          href="/terms"
                          className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          conditions générales
                        </Link>{" "}
                        et la{" "}
                        <Link
                          href="/privacy"
                          className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          politique de confidentialité
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Création en cours..." : "Créer un compte"}
              </Button>
            </form>
          </Form>

          {/* Autres methodes d'inscription */}
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
    <Button variant="outline" onClick={handleGoogleSignIn} className="flex items-center gap-2 justify-center">
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Google
    </Button>

    {/* Si Facebook tu actives */}
    {/* <Button variant="outline" onClick={handleFacebookSignIn} className="flex items-center gap-2 justify-center">
      <Facebook />
      Facebook
    </Button> */}

    <Button variant="outline" onClick={() => setShowPhoneModal(true)} className="flex items-center gap-2 justify-center">
          <Phone className="w-5 h-5" /> Téléphone
        </Button>
 <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connexion par téléphone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Ex: +2250102030405" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Button onClick={sendVerificationCode}>Envoyer le code</Button>
            <Input placeholder="Code reçu par SMS" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            <Button onClick={verifyCodeAndSignIn}>Valider le code</Button>
          </div>
          <div id="recaptcha-container" className="mt-4" />
        </DialogContent>
      </Dialog>

  </div>
</div>
        </div>
      </div>
    </div>
  );
}