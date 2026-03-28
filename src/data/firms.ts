
export interface FirmOffer {
    id?: string;
    firm_slug?: string;
    title: string;
    subtitle: string;
    description: string;
    discountCode: string;
    expiryDate: string;
    isNew: boolean;
    tagLabel: string;
}


export interface AccountTier {
    id?: string;
    firm_slug?: string;
    size: string;
    balance: string;
    price: number;
    promoPrice?: number;
    type: "1-Step" | "2-Step" | "3-Step" | "Instant";
    targetPhase1: string;
    targetPhase2: string;
    maxDailyLoss: string;
    maxTotalLoss: string;
    duration: string;
    leverage: string;
}

export interface Review {
    id: string;
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    verified: boolean;
    helpfulCount: number;
}

export interface FirmData {
    slug: string;
    name: string;
    logo: string;
    websiteUrl?: string;
    affiliateLink?: string;
    badge: string;
    shortDesc: string;
    description: string;
    rating: number;
    reviews: string;
    reviewCount: number;
    trustpilot: boolean;
    trustpilotScore: number;
    likes: number;

    ceo: string;
    countryCode: string;
    location: string;
    foundedDate: string;
    yearsOperational: number;

    maxFunding: string;
    profitSplit: string;
    scalingPlan: string;
    payoutSpeed: string;
    payoutFrequency: string;
    platformNames: string[];

    commissions: {
        forex: string;
        indices: string;
        crypto: string;
        commodities: string;
    };
    leverage: {
        forex: string;
        indices: string;
        crypto: string;
        commodities: string;
    };

    ratingDistribution: number[];
    features: { icon: string; title: string; value: string }[];
    pros: string[];
    cons: string[];
    instruments: string[];
    paymentMethods: string[];
    payoutMethods: string[];
    restrictedCountries?: string[];

    dailyLoss: string;
    maxLoss: string;
    profitTarget: string;
    newsTrading: string;
    weekendHolding: string;
    eaTrading: string;

    discountCode?: string;
    discountAmount?: string;
    promoDescription?: string;
    discountExpiry?: string;

    is_featured?: boolean;
    featured_order?: number;

    accounts: AccountTier[];
    userReviews: Review[];
    offers?: FirmOffer[];

    color: string;
}

import firmsJson from "./firms.json";

export const FIRMS: FirmData[] = firmsJson as FirmData[];
