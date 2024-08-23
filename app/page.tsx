"use client";

import { getStats } from "@/api/handles";
import { Chart } from "chart.js";
import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stats, setStats] = useState([]);

  async function handleStats() {
    const response = await getStats(ticker);
    console.log(stats)
    if (!response.error) {
      setStats(response.responseData);
      return true;
    }
    return false;
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-4 gap-5">
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-3">
          <div className="absolute -top-4 left-2 bg-zinc-900 px-2 text-lg text-indigo-400">
            🏢 ticker
          </div>
          <input
            id="ticker"
            name="ticker"
            value={ticker}
            placeholder=" ticker (e.g. AAPL)"
            onChange={(e) => setTicker(e.target.value)}
            className="rounded"
          />
          <button type="button" className="rounded mx-4 hover:scale-105 hover:bg-zinc-800 p-1 duration-300" onClick={handleStats}>Search</button>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 row-span-3">
          <div className="absolute -top-4 left-2 bg-zinc-900 px-2 text-lg text-indigo-400">
            📈 current stats
          </div>
          <div className="relative border border-gray-700 rounded-lg p-4 row-span-3 my-4">
            market performance:
          </div>
          <div className="relative border border-gray-700 rounded-lg p-4 row-span-3 my-4">
            <thead>dividend information:</thead>
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-3">
          <div className="absolute -top-4 left-2 bg-zinc-900 px-2 text-lg text-indigo-400">
            💡 prediction graphs
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-3">
          <div className="absolute -top-4 left-2 bg-zinc-900 px-2 text-lg text-indigo-400">
            🤖 advice
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-4">
          <div className="absolute -top-4 left-2 bg-zinc-900 px-2 text-lg text-indigo-400">
            📰 recent headlines
          </div>
        </div>
      </div>
    </main>
  );
}
