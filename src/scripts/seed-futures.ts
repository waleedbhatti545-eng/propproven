import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FUTURES_FIRMS: any[] = [
    {
        slug: "topstep",
        name: "Topstep",
        logo: "https://imagedelivery.net/L6yB6iXh-wzPj5m8Uu1h7Q/topstep.png/public", // Mock Logo Link
        shortDesc: "The original futures prop firm. Pioneer of the Trading Combine.",
        description: "Topstep is an industry leader in funding retail futures traders. With simple rules, multiple payout options, and top-tier platforms like Tradovate, it is the home for professional futures traders.",
        rating: 4.8,
        reviews: "10,000+",
        reviewCount: 10432,
        trustpilot: true,
        trustpilotScore: 4.8,
        likes: 5400,
        ceo: "Michael Patak",
        countryCode: "US",
        location: "Chicago, USA",
        foundedDate: "2012",
        yearsOperational: 12,
        maxFunding: "$150,000",
        profitSplit: "90%",
        scalingPlan: "Yes",
        payoutSpeed: "24 Hours",
        payoutFrequency: "Daily (after limits)",
        platformNames: ["Tradovate", "NinjaTrader", "Quantower"],
        commissions: { forex: "N/A", indices: "$1.24/side", crypto: "N/A", commodities: "$1.40/side" },
        leverage: { forex: "N/A", indices: "Intraday", crypto: "N/A", commodities: "Intraday" },
        ratingDistribution: [85, 10, 3, 1, 1],
        features: [{ icon: "clock", title: "Payouts", value: "Daily" }],
        pros: ["Daily Risk Limits", "Free NinjaTrader License", "Transparent Rules"],
        cons: ["Trailing Drawdown"],
        instruments: ["Indices", "Metals", "Energies", "Agri"],
        paymentMethods: ["Credit Card", "Crypto"],
        payoutMethods: ["Bank Wire", "Deel"],
        dailyLoss: "Dynamic",
        maxLoss: "Trailing",
        profitTarget: "6%",
        newsTrading: "Allowed (Not during major events)",
        weekendHolding: "Not Allowed",
        eaTrading: "Not Allowed",
        color: "#06b6d4",
        market_type: "futures", // KEY DUALITY FIELD
        status: "Live"
    },
    {
        slug: "traceday",
        name: "TradeDay",
        logo: "https://imagedelivery.net/L6yB6iXh-wzPj5m8Uu1h7Q/tradeday.png/public", // Mock Logo Link
        shortDesc: "End of Day Drawdown futures prop firm.",
        description: "TradeDay offers End of Day Drawdown rules making it incredibly mathematically superior to trailing drawdown options. Focused purely on CME Futures.",
        rating: 4.7,
        reviews: "2,000+",
        reviewCount: 2155,
        trustpilot: true,
        trustpilotScore: 4.7,
        likes: 1200,
        ceo: "James L. & Terry",
        countryCode: "US",
        location: "Chicago, USA",
        foundedDate: "2020",
        yearsOperational: 4,
        maxFunding: "$250,000",
        profitSplit: "90%",
        scalingPlan: "Yes",
        payoutSpeed: "48 Hours",
        payoutFrequency: "Bi-Weekly",
        platformNames: ["Tradovate", "NinjaTrader"],
        commissions: { forex: "N/A", indices: "Standard", crypto: "N/A", commodities: "Standard" },
        leverage: { forex: "N/A", indices: "Intraday", crypto: "N/A", commodities: "Intraday" },
        ratingDistribution: [80, 15, 3, 1, 1],
        features: [{ icon: "shield", title: "Drawdown", value: "EOD" }],
        pros: ["EOD Drawdown", "No Consistency Rule", "Live Trailing Stops"],
        cons: ["Harder Profit Targets"],
        instruments: ["Indices", "Metals", "Energies", "Rates"],
        paymentMethods: ["Credit Card"],
        payoutMethods: ["Bank Wire"],
        dailyLoss: "Fixed",
        maxLoss: "End of Day",
        profitTarget: "8%",
        newsTrading: "Allowed",
        weekendHolding: "Not Allowed",
        eaTrading: "Not Allowed",
        color: "#3b82f6",
        market_type: "futures",
        status: "Live"
    }
];

async function seed() {
    console.log("Seeding futures...");
    for (const firm of FUTURES_FIRMS) {
        const { error } = await supabase.from('firms').upsert(firm);
        if (error) {
            console.error("FAILED to insert", firm.name, "->", error.message);
        } else {
            console.log("SUCCESSFULLY inserted", firm.name);
        }
    }
}
seed();
