"use client";

import { useEffect, useState } from "react";

export interface User {
  _id: string;
  nom: string;        // correspond à ton champ dans la BDD
  email: string;
  telephone?: string;
  adresse?: string;
  // autres champs selon ta BDD
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          setUser(null);
          throw new Error("Utilisateur non authentifié");
        }
        const data = await res.json();
        setUser(data);
      })
      .catch((err) => {
        console.error("Erreur useUser:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};
