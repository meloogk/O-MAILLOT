"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données de démonstration
const teams = [
  {
    id: "1",
    name: "Paris Saint-Germain",
    league: "Ligue 1",
    country: "France",
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg"
  },
  {
    id: "2",
    name: "Real Madrid",
    league: "La Liga",
    country: "Espagne",
    image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg"
  },
  {
    id: "3",
    name: "Manchester United",
    league: "Premier League",
    country: "Angleterre",
    image: "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg"
  },
  {
    id: "4",
    name: "Los Angeles Lakers",
    league: "NBA",
    country: "États-Unis",
    image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg"
  }
];

const leagues = [
  { id: "all", name: "Toutes les ligues" },
  { id: "ligue1", name: "Ligue 1" },
  { id: "liga", name: "La Liga" },
  { id: "premier", name: "Premier League" },
  { id: "nba", name: "NBA" }
];

const countries = [
  { id: "all", name: "Tous les pays" },
  { id: "france", name: "France" },
  { id: "espagne", name: "Espagne" },
  { id: "angleterre", name: "Angleterre" },
  { id: "usa", name: "États-Unis" }
];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLeague = selectedLeague === "all" || team.league.toLowerCase().includes(selectedLeague.toLowerCase());
    const matchesCountry = selectedCountry === "all" || team.country.toLowerCase().includes(selectedCountry.toLowerCase());
    return matchesSearch && matchesLeague && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Équipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une équipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une ligue" />
          </SelectTrigger>
          <SelectContent>
            {leagues.map((league) => (
              <SelectItem key={league.id} value={league.id}>
                {league.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={team.image}
                alt={team.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{team.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {team.league} • {team.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}