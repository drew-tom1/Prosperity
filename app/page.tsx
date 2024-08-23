"use client";

import { getStats } from "@/components/handles";
import { Chart } from "chart.js";
import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stats, setStats] = useState([]);

  async function handleStats() {
    const response = await getStats(ticker);
    console.log(response)
    console.log(ticker)
    console.log(stats)
    if (!response.error) {
      setStats(response.responseData);
      return true;
    }
    return false;
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-2">
          <div className="absolute -top-4 left-4 bg-zinc-900 px-2 text-lg text-cyan-200">
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
          <button type="button" className="rounded bg-zinc-800 mx-4 hover:scale-105" onClick={handleStats}>Search</button>
          <h1 className="text-right">{ticker}</h1>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-2">
          <div className="absolute -top-4 left-4 bg-zinc-900 px-2 text-lg text-cyan-200">
            💡 prediction graphs
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 col-span-2">
          <div className="absolute -top-4 left-4 bg-zinc-900 px-2 text-lg text-cyan-200">
            🤖 advice
          </div>
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 row-span-2">
          <div className="absolute -top-4 left-4 bg-zinc-900 px-2 text-lg text-cyan-200">
            📈 current stats
          </div>
          {stats.map((val, index) => {
            return (
              <ul className="mt-4 space-y-2 font-semibold" key={index}>
                <li>Open:</li>
                <li>Close:</li>
                <li>High:</li>
                <li>Low:</li>
                <li>Market Cap:</li>
                <li>Dividend Yield:</li>
              </ul>
            );
          })}
        </div>
        <div className="relative border border-gray-700 rounded-lg p-4 row-span-2">
          <div className="absolute -top-4 left-4 bg-zinc-900 px-2 text-lg text-cyan-200">
            📰 recent headlines
          </div>
        </div>
      </div>
    </main>
  );
}
