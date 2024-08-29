"use client";

import { getStats, CompanyStats, CompanyNews, getHeadlines } from "@/app/api/handles";
import { Chart } from "chart.js";
import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [headlines, setHeadlines] = useState<CompanyNews[] | null>(null);

  async function handleStats() {
    const response = await getStats(ticker);
    if (!response.error) {
      const renderedStats = { ...response.responseData };
      if (renderedStats.dividendYield !== undefined) {
        renderedStats.dividendYield *= 100;
      }
      setStats(renderedStats);
      return true;
    }
    return false;
  }
  async function handleHeadlines () {
    const response = await getHeadlines(ticker);
    if (!response.error) {
      setHeadlines(response.responseData)
      return true
    }
    return false;
  }

  async function handleOptions () {
    await Promise.all([handleHeadlines(), handleStats()]);
  };

  return (
    <main className="p-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="relative border border-primary rounded-lg p-4 sm:col-span-3 lg:col-span-1">
          <div className="absolute -top-4 bg-background dark:bg-background px-2 text-lg text-indigo-400">
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
            onClick={handleOptions}
          >
            Search
          </button>
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute rounded -top-4 bg-background dark:bg-background px-2 text-lg text-indigo-400">
            💡 prediction graphs
          </div>
        </div>
        <div className="relative border border-primary rounded-lg p-4 sm:col-span-3 lg:row-span-2 lg:col-span-1">
          <div className="absolute -top-4 bg-background dark:bg-background px-2 text-lg text-indigo-400">
            📈 current stats
          </div>
          {stats ? (
            <>
              <div className="relative border border-primary rounded-lg p-4 row-span-3 my-4">
              <table className="w-full">
                  <tbody>
                  <thead className="font-bold">{stats.shortName}</thead>
                    <tr>
                      <td>Current:</td>
                      <td>{"$" + stats.currentPrice}</td>
                    </tr>
                    <tr>
                      <td>Low (D):</td>
                      <td>{"$" + stats.dayLow}</td>
                    </tr>
                    <tr>
                      <td>High (D):</td>
                      <td>{"$" + stats.dayHigh}</td>
                    </tr>
                    <tr>
                      <td>Open (D):</td>
                      <td>{"$" + stats.open}</td>
                    </tr>
                    <tr>
                      <td>Close (D):</td>
                      <td>{"$" + stats.previousClose}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative border border-primary rounded-lg p-4 my-4">
                <div className="font-bold">Dividend Information</div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>Yield:</td>
                      <td>{stats.dividendYield + "%"}</td>
                    </tr>
                    <tr>
                      <td>Rate:</td>
                      <td>{"$" + stats.dividendRate}</td>
                    </tr>
                    <tr>
                      <td>Payout Ratio:</td>
                      <td>{"$" + stats.payoutRatio}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative border border-primary rounded-lg p-4 my-4">
                <div className="font-bold">Quarterly Earnings Reports</div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>Yield:</td>
                      <td>{stats.dividendYield + "%"}</td>
                    </tr>
                    <tr>
                      <td>Rate:</td>
                      <td>{"$" + stats.dividendRate}</td>
                    </tr>
                    <tr>
                      <td>Payout Ratio:</td>
                      <td>{"$" + stats.payoutRatio}</td>
                    </tr>
                  </tbody>
                </table>
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
          {headlines?.map((headline, index) => {
            return (
              <table key={index}>
                <tbody>
                  <tr className="">
                    <td className="hover:scale-105 duration-300 p-3">
                      <div>
                        <a href={headline.url} target="_blank">
                          {headline.headline} - {headline.source}
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          })}
        </div>
      </div>
    </main>
  );
}
