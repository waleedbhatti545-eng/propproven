import { createClient } from "@supabase/supabase-js";
import { FIRMS } from "../data/firms";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  console.log("Starting Migration...");
  for (const firm of FIRMS) {
    console.log("Migrating", firm.slug);
    const { accounts, userReviews, ...firmData } = firm;

    const firmInsertData = {
      slug: firmData.slug,
      name: firmData.name,
      logo: firmData.logo,
      badge: firmData.badge,
      shortDesc: firmData.shortDesc,
      description: firmData.description,
      rating: firmData.rating,
      reviews: firmData.reviews,
      reviewCount: firmData.reviewCount,
      trustpilot: firmData.trustpilot,
      trustpilotScore: firmData.trustpilotScore,
      likes: firmData.likes,
      ceo: firmData.ceo,
      countryCode: firmData.countryCode,
      location: firmData.location,
      foundedDate: firmData.foundedDate,
      yearsOperational: firmData.yearsOperational,
      maxFunding: firmData.maxFunding,
      profitSplit: firmData.profitSplit,
      scalingPlan: firmData.scalingPlan,
      payoutSpeed: firmData.payoutSpeed,
      payoutFrequency: firmData.payoutFrequency,
      platformNames: firmData.platformNames,
      commissions: firmData.commissions,
      leverage: firmData.leverage,
      ratingDistribution: firmData.ratingDistribution,
      features: firmData.features,
      pros: firmData.pros,
      cons: firmData.cons,
      instruments: firmData.instruments,
      paymentMethods: firmData.paymentMethods,
      payoutMethods: firmData.payoutMethods,
      restrictedCountries: firmData.restrictedCountries || [],
      dailyLoss: firmData.dailyLoss,
      maxLoss: firmData.maxLoss,
      profitTarget: firmData.profitTarget,
      newsTrading: firmData.newsTrading,
      weekendHolding: firmData.weekendHolding,
      eaTrading: firmData.eaTrading,
      discountCode: firmData.discountCode,
      discountAmount: firmData.discountAmount,
      discountExpiry: firmData.discountExpiry,
      color: firmData.color,
    };

    const { error: firmError } = await supabase.from("firms").upsert(firmInsertData);
    if (firmError) {
      console.error("Error inserting firm:", firm.slug, firmError);
      continue;
    }

    await supabase.from("accounts").delete().eq("firm_slug", firm.slug);
    if (accounts && accounts.length > 0) {
      const accountInsertData = accounts.map((acc) => ({
        firm_slug: firm.slug,
        size: acc.size,
        balance: acc.balance,
        price: acc.price,
        promoPrice: acc.promoPrice,
        type: acc.type,
        targetPhase1: acc.targetPhase1,
        targetPhase2: acc.targetPhase2,
        maxDailyLoss: acc.maxDailyLoss,
        maxTotalLoss: acc.maxTotalLoss,
        duration: acc.duration,
        leverage: acc.leverage,
      }));
      const { error: accError } = await supabase.from("accounts").insert(accountInsertData);
      if (accError) console.error("Error inserting accounts for:", firm.slug, accError);
    }

    await supabase.from("user_reviews").delete().eq("firm_slug", firm.slug);
    if (userReviews && userReviews.length > 0) {
      const reviewInsertData = userReviews.map((rev) => ({
        id: rev.id,
        firm_slug: firm.slug,
        author: rev.author,
        date: rev.date,
        rating: rev.rating,
        title: rev.title,
        content: rev.content,
        verified: rev.verified,
        helpfulCount: rev.helpfulCount,
      }));
      const { error: revError } = await supabase.from("user_reviews").insert(reviewInsertData);
      if (revError) console.error("Error inserting reviews for:", firm.slug, revError);
    }
  }
  console.log("Migration finished.");
}

migrate().catch(console.error);
