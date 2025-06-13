"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { Checkbox } from "@/components/ui/checkbox";

const productSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  priceXOF: z.string().min(1, "Le prix est requis"),
  images: z.string().array().min(1, "Au moins une image est requise"),
  sizes: z.string().array().min(1, "Au moins une taille est requise"),
  teams: z.string().min(2, "L'équipe est requise"),
  league: z.string().min(2, "Le championnat est requis"),
  season: z.string().min(4, "La saison est requise"),
  isHome: z.boolean(),
  stock: z.string().min(1, "Le stock est requis"),
  featured: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const leagues = ["Premier League", "La Liga", "Ligue 1", "Serie A", "Bundesliga", "NBA"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      priceXOF: "",
      images: [],
      sizes: [],
      teams: "",
      league: "",
      season: "",
      isHome: true,
      stock: "",
      featured: false,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Produit ajouté avec succès");
      router.push("/admin/products");
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Ajouter un produit</h1>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du produit</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
                name="priceXOF"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (FCFA)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images (URLs)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Entrez les URLs des images séparées par des virgules"
                      onChange={(e) => field.onChange(e.target.value.split(',').map(url => url.trim()))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Équipe</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="league"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Championnat</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un championnat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leagues.map((league) => (
                          <SelectItem key={league} value={league}>
                            {league}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saison</FormLabel>
                    <FormControl>
                      <Input placeholder="2023/24" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tailles disponibles</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <FormField
                          key={size}
                          control={form.control}
                          name="sizes"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(size)}
                                  onCheckedChange={(checked) => {
                                    const updatedSizes = checked
                                      ? [...field.value, size]
                                      : field.value?.filter((s) => s !== size);
                                    field.onChange(updatedSizes);
                                  }}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {size}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="isHome"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Maillot domicile
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Mettre en avant
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Création en cours..." : "Créer le produit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}