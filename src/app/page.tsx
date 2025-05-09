"use client";

import { useEffect, useState } from "react";

interface Player {
  rank: number;
  name: string;
  team_tag?: string;
  country?: string;
  sponsor?: string;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [country, setCountry] = useState("")
  const [playerName, setPlayerName] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', inputValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();

      const sorted = data.sort((a: Player, b: Player) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.name.localeCompare(b.name);
      });

      const deduped = sorted.map((player: Player, index: number) => ({
        ...player,
        rank: index + 1,
      }));

      setPlayers(deduped);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-[#1c1719]">
      <div className="py-20 flex flex-col items-center">
      <img src="tool.png"></img>
      <div className="flex flex-row items-center">
        <input
          className="my-8 bg-red-200 pl-2"
          placeholder="player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <select
          className="mx-2 py-1"
          id="countries"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value=""></option>
          <option value="ru">ru</option>
          <option value="ua">ua</option>
          <option value="nl">nl</option>
        </select>
      </div>
      <div className="flex flex-col w-full max-w-4xl">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="table-fixed w-full text-left text-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-rose-600">
                    <th className="px-4 py-2 w-20">rank</th>
                    <th className="px-4 py-2 w-20">team</th>
                    <th className="px-4 py-2 w-20">name</th>
                    <th className="px-4 py-2 w-20">country</th>
                    <th className="px-4 py-2 w-20">sponsor</th>
                  </tr>
                </thead>
                <tbody>
                  {players
                    .filter((p) => p.name.toLowerCase().includes(playerName.toLowerCase()))
                    .filter((p) => p.country?.includes(country))
                    .map((p) => (
                      <tr key={`${p.rank}`} className="bg-red-300">
                        <td className="border border-rose-600 px-4 py-1">{p.rank}</td>
                        <td className="border border-rose-600 px-4 py-1">{p.team_tag || " "}</td>
                        <td className="border border-rose-600 px-4 py-1 overflow-hidden text-ellipsis">{p.name}</td>
                        <td className="border border-rose-600 px-4 py-1">{p.country || " "}</td>
                        <td className="border border-rose-600 px-4 py-1">{p.sponsor || " "}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
