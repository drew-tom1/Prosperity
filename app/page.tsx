"use client";

import {
  getStats,
  AssetStats,
  CompanyNews,
  getHeadlines,
} from "@/app/api/handles";
import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stats, setStats] = useState<AssetStats | null>(null);
  const [headlines, setHeadlines] = useState<CompanyNews[] | null>(null);

  async function handleStats() { //refactor this to handle either ExchangeStats or CompanyStats
    const response = await getStats(ticker);
    if (!response.error) {
      const renderedStats = { ...response.responseData };
      if (renderedStats.dividendYield !== undefined) {
        renderedStats.dividendYield *= 100;
      }
      if (renderedStats.yield !== undefined && renderedStats.ytdReturn !== undefined) {
        renderedStats.yield *= 100;
        renderedStats.ytdReturn *= 100;
      }
      setStats(renderedStats);
      return true;
    }
    return false;
  }
  async function handleHeadlines() {
    const response = await getHeadlines(ticker);
    if (!response.error) {
      setHeadlines(response.responseData);
      return true;
    }
    return false;
  }

  async function handleOptions() {
    await Promise.all([handleHeadlines(), handleStats()]);
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="relative border border-primary rounded-lg p-4 sm:col-span-3 lg:col-span-1">
          <div className="absolute -top-4 bg-background dark:bg-background px-2 text-lg text-primary">
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
          <div className="absolute rounded -top-4 bg-background dark:bg-background px-2 text-lg text-primary">
            💡 prediction graphs
          </div>
        </div>
        <div className="relative border border-primary rounded-lg p-4 sm:col-span-3 lg:row-span-2 lg:col-span-1">
          <div className="absolute -top-4 bg-background dark:bg-background px-2 text-lg text-primary">
            📈 current stats
          </div>
          {stats ? (
            "industry" in stats ? (
              <>
                <div className="relative border border-primary rounded-lg p-4 row-span-3 my-4">
                  <table className="w-full">
                    <tbody>
                      <thead className="font-bold">{stats.shortName}</thead>
                      <tr>
                        <td>Current:</td>
                        <td>{"$" + stats.currentPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Low (D):</td>
                        <td>{"$" + stats.dayLow.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>High (D):</td>
                        <td>{"$" + stats.dayHigh.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Open (D):</td>
                        <td>{"$" + stats.open.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Close (D):</td>
                        <td>{"$" + stats.previousClose.toFixed(2)}</td>
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
                        <td>{stats?.dividendYield ? stats.dividendYield.toFixed(2) + "%": "N/A"}</td> 
                      </tr>
                      <tr>
                        <td>Rate:</td>
                        <td>{stats?.dividendRate ? "$" + stats.dividendRate.toFixed(2) : "N/A"}</td>
                      </tr>
                      <tr>
                        <td>Payout Ratio:</td>
                        <td>{stats?.payoutRatio ? "$" + stats.payoutRatio.toFixed(2) : "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="relative border border-primary rounded-lg p-4 my-4">
                  <div className="font-bold">Quarterly Earnings Reports</div>
                  <p>to be implemented</p>
                  <table className="w-full">
                    <tbody>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : "legalType" in stats ? (
              <>
                <div className="relative border border-primary rounded-lg p-4 row-span-3 my-4">
                  <table className="w-full">
                    <tbody>
                      <thead className="font-bold">{stats.shortName}</thead>
                      <tr>
                        <td>Current:</td>
                        <td>{"$" + stats.ask.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Low (D):</td>
                        <td>{"$" + stats.dayLow.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>High (D):</td>
                        <td>{"$" + stats.dayHigh.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Open (D):</td>
                        <td>{"$" + stats.open.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Close (D):</td>
                        <td>{"$" + stats.previousClose.toFixed(2)}</td>
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
                        <td>{stats.yield.toFixed(2) + "%"}</td>
                      </tr>
                      <tr>
                        <td>Year-to-Date Return:</td>
                        <td>{stats.ytdReturn.toFixed(2) + "%"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : null
          ) : (
            <p>No data available. Please search for a ticker</p>
          )}
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute -top-4  bg-background dark:bg-background px-2 text-lg text-primary">
            🤖 advice
          </div>
        </div>
        <div className="relative border border-primary rounded-lg p-4 col-span-3">
          <div className="absolute -top-4  bg-background dark:bg-background px-2 text-lg text-primary">
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
            );
          })}
        </div>
      </div>
    </main>
  );
}
