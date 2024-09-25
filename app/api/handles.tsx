import axios from "axios";

export interface CompanyStats {
  open: number;
  dayHigh: number;
  dayLow: number;
  previousClose: number;
  dividendRate: number | undefined;
  dividendYield: number | undefined;
  payoutRatio: number | undefined;
  currentPrice: number;
  shortName: string;
}

export interface ExchangeStats {
  legalType: string;
  dayHigh: number;
  dayLow: number;
};

export interface CompanyNews {
  headline: string;
  source: string;
  summary: string;
  url: string;
}

export type AssetStats = ExchangeStats | CompanyStats;

const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "http://127.0.0.1:8000";

class Response {
  error: boolean;
  responseData: any;

  constructor(error: boolean = false, responseData: any = null) {
    this.error = error;
    this.responseData = responseData;
  }
}

export async function getStats(ticker: string): Promise<AssetStats> {
  const url = new URL("/performance", BASE_API_URL);
  try {
    const response = await axios.post(url.href, { ticker });
    const data = response.data;
    if ("legalType" in data) {
      return data as ExchangeStats
    } else {
      return data as CompanyStats
    }
  } catch (err) {
    throw new Error(`Failed to fetch information, ${err}`)
  }
}

export async function getHeadlines(ticker: string) {
  const acceptedSources = ["SeekingAlpha", "Yahoo"];
  let status = new Response(false, []);
  const url = new URL("/headlines", BASE_API_URL);
  try {
    const response = await axios.get(url.href, {
      params: { ticker },
      headers: { Accept: "application/json" },
    });
    const data = response.data;
    for (let index = 0; index < response.data.length; index++) {
      if (acceptedSources.includes(data[index].source)) {
        status.responseData.push(data[index]);
      }
    }
  } catch (err) {
    status.error = true;
    status.responseData = err;
  }
  return status;
}
