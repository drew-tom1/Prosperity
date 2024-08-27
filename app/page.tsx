"use client";

import { getStats, CompanyStats } from "@/app/api/handles";
import { Chart } from "chart.js";
import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stats, setStats] = useState<CompanyStats | null>(null);

  async function handleStats() {
    const response = await getStats(ticker);
    if (!response.error) {
      setStats(response.responseData);
      return true;
    }
    return false;
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-4 gap-5">
        <div className="relative border border-primary rounded-lg p-4 row-span-1">
          <div className="absolute -top-4  bg-background dark:bg-background px-2 text-lg text-indigo-400">
            🏢 ticker
          </div>
          <input
            id="ticker"
            name="ticker"
            value={ticker}
            placeholder="e.g. AAPL"
            onChange={(e) => setTicker(e.target.value)}
            className="rounded w-1/2 text-center"
          />
          <button
            type="button"
            className="rounded mx-4 hover:scale-105 hover:bg-zinc-800 p-1 duration-300"
            onClick={handleStats}
          >
            Search
          </button>
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute rounded -top-4 bg-background dark:bg-background px-2 text-lg text-indigo-400">
            💡 prediction graphs
          </div>
        </div>
        <div className="relative border border-primary rounded-lg p-4 row-span-2">
          <div className="absolute -top-4 bg-background dark:bg-background px-2 text-lg text-indigo-400">
            📈 current stats
          </div>
          {stats ? (
            <>
              <div className="relative border border-primary rounded-lg p-4 row-span-3 my-4">
                <thead>{stats.shortName}</thead>
                <tr>
                  Current: <td>{"$" + stats.currentPrice}</td>
                </tr>
                <tr>
                  Low (D): <td>{"$" + stats.dayLow}</td>
                </tr>
                <tr>
                  High (D): <td>{"$" + stats.dayHigh}</td>
                </tr>
                <tr>
                  Open (D): <td>{"$" + stats.open}</td>
                </tr>
                <tr>
                  Close (D): <td>{"$" + stats.previousClose}</td>
                </tr>
              </div>
              <div className="relative border border-primary rounded-lg p-4 row-span-3 my-4">
                <thead>dividends:</thead>
                <tr>
                  Yield: <td>{stats.dividendYield + "%"}</td>
                </tr>
                <tr>
                  Rate <td>{"$" + stats.dividendRate}</td>
                </tr>
                <tr>
                  Payout Ratio: <td>{"$" + stats.payoutRatio}</td>
                </tr>
              </div>
            </>
          ) : (
            <p>No data available. Please search for a ticker</p>
          )}
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute -top-4  bg-background dark:bg-background px-2 text-lg text-indigo-400">
            🤖 advice
          </div>
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute -top-4  bg-background dark:bg-background px-2 text-lg text-indigo-400">
            📰 recent headlines
          </div>
        </div>
      </div>
    </main>
  );
}
