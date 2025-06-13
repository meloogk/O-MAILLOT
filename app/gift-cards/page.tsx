"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Gift, CreditCard, Mail, Download, Check, Star } from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const giftCardSchema = z.object({
  amount: z.string().min(1, "Le montant est requis"),
  recipientName: z.string().min(2, "Le nom du destinataire est requis"),
  recipientEmail: z.string().email("Email invalide"),
  senderName: z.string().min(2, "Votre nom est requis"),
  message: z.string().optional(),
  deliveryDate: z.string().optional(),
});

type GiftCardFormValues = z.infer<typeof giftCardSchema>;

const predefinedAmounts = [
  { value: "25", label: "25€", popular: false },
  { value: "50", label: "50€", popular: true },
  { value: "75", label: "75€", popular: false },
  { value: "100", label: "100€", popular: true },
  { value: "150", label: "150€", popular: false },
  { value: "200", label: "200€", popular: false },
];

const giftCardDesigns = [
  {
    id: "football",
    name: "Football Classique",
    preview: "🏈",
    description: "Design avec thème football"
  },
  {
    id: "birthday",
    name: "Anniversaire",
    preview: "🎂",
    description: "Parfait pour les anniversaires"
  },
  {
    id: "christmas",
    name: "Noël",
    preview: "🎄",
    description: "Design festif de Noël"
  },
  {
    id: "elegant",
    name: "Élégant",
    preview: "✨",
    description: "Design élégant et sobre"
  }
];

export default function GiftCardsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("purchase");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("football");
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<any>(null);

  const form = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      amount: "",
      recipientName: "",
      recipientEmail: "",
      senderName: "",
      message: "",
      deliveryDate: "",
    },
  });

  const onSubmit = async (data: GiftCardFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate gift card
      const cardCode = `GC-${Date.now().toString(36).toUpperCase()}`;
      const newCard = {
        code: cardCode,
        amount: parseInt(data.amount),
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        senderName: data.senderName,
        message: data.message,
        design: selectedDesign,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
      };
      
      setGeneratedCard(newCard);
      toast.success("Carte cadeau créée avec succès !");
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBalance = () => {
    if (!giftCardCode) {
      toast.error("Veuillez saisir un code");
      return;
    }
    // Simulate balance check
    toast.success("Solde restant : 50€");
  };

  const handleAmountSelect = (amount: string) => {
    if (amount === "custom") {
      setShowCustomAmount(true);
      form.setValue("amount", "");
    } else {
      setShowCustomAmount(false);
      form.setValue("amount", amount);
    }
  };

  const downloadGiftCard = () => {
    // Simulate download
    toast.success("Carte cadeau téléchargée !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-6">
            <Gift className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cartes Cadeaux O'MAILLOT
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Offrez le plaisir de choisir avec nos cartes cadeaux électroniques. 
            Le cadeau parfait pour tous les passionnés de sport !
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="purchase" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Acheter
            </TabsTrigger>
            <TabsTrigger value="balance" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Vérifier le solde
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulaire */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-green-500" />
                    Créer une carte cadeau
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Montant */}
                      <div>
                        <FormLabel>Montant de la carte cadeau</FormLabel>
                        <div className="grid grid-cols-3 gap-2 mt-2 mb-4">
                          {predefinedAmounts.map((amount) => (
                            <Button
                              key={amount.value}
                              type="button"
                              variant={form.watch("amount") === amount.value ? "default" : "outline"}
                              className={`relative ${
                                form.watch("amount") === amount.value 
                                  ? "bg-green-500 hover:bg-green-600" 
                                  : ""
                              }`}
                              onClick={() => handleAmountSelect(amount.value)}
                            >
                              {amount.popular && (
                                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-xs">
                                  <Star className="h-3 w-3" />
                                </Badge>
                              )}
                              {amount.label}
                            </Button>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => handleAmountSelect("custom")}
                        >
                          Montant personnalisé
                        </Button>
                        
                        {showCustomAmount && (
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Montant en euros"
                                    {...field}
                                    min="10"
                                    max="500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Design */}
                      <div>
                        <FormLabel>Choisir un design</FormLabel>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {giftCardDesigns.map((design) => (
                            <Button
                              key={design.id}
                              type="button"
                              variant={selectedDesign === design.id ? "default" : "outline"}
                              className={`h-auto p-4 flex flex-col items-center gap-2 ${
                                selectedDesign === design.id 
                                  ? "bg-green-500 hover:bg-green-600" 
                                  : ""
                              }`}
                              onClick={() => setSelectedDesign(design.id)}
                            >
                              <span className="text-2xl">{design.preview}</span>
                              <div className="text-center">
                                <div className="font-medium">{design.name}</div>
                                <div className="text-xs opacity-70">{design.description}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="senderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Votre nom</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du destinataire</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="recipientEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email du destinataire</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message personnalisé (optionnel)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                disabled={isLoading}
                                placeholder="Joyeux anniversaire ! J'espère que tu trouveras le maillot de tes rêves..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de livraison (optionnel)</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                                disabled={isLoading}
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Création en cours..." : "Créer la carte cadeau"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Aperçu */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Aperçu de votre carte cadeau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-lg p-6 text-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">O'MAILLOT</h3>
                          <p className="text-sm opacity-90">Carte Cadeau</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {form.watch("amount") || "0"}€
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <strong>Pour:</strong> {form.watch("recipientName") || "Destinataire"}
                        </p>
                        <p className="text-sm">
                          <strong>De:</strong> {form.watch("senderName") || "Expéditeur"}
                        </p>
                      </div>
                      
                      {form.watch("message") && (
                        <div className="bg-white/20 rounded p-3 mb-4">
                          <p className="text-sm italic">"{form.watch("message")}"</p>
                        </div>
                      )}
                      
                      <div className="text-xs opacity-75">
                        Valable 1 an à partir de la date d'émission
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {generatedCard && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="shadow-lg border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <Check className="h-5 w-5" />
                          Carte cadeau créée !
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <QRCode value={generatedCard.code} size={150} />
                          <p className="mt-2 font-mono text-sm">{generatedCard.code}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button onClick={downloadGiftCard} className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Mail className="mr-2 h-4 w-4" />
                            Envoyer par email
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="balance">
            <Card className="max-w-md mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Vérifier le solde
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Code de la carte cadeau"
                    value={giftCardCode}
                    onChange={(e) => setGiftCardCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleCheckBalance}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Vérifier
                  </Button>
                </div>

                {giftCardCode && (
                  <div className="mt-6 flex justify-center">
                    <QRCode value={giftCardCode} size={200} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Avantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center"
          >
            <Gift className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personnalisable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ajoutez un message personnel et choisissez le design parfait
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center"
          >
            <CreditCard className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Utilisable sur tous nos produits sans restriction
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center"
          >
            <Mail className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Livraison instantanée</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Envoyée immédiatement par email au destinataire
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}