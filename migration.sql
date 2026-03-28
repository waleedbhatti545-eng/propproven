-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS user_reviews CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS firms CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 1. Create the base 'firms' table with EVERY single property
CREATE TABLE firms (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    badge TEXT,
    "shortDesc" TEXT,
    description TEXT,
    rating NUMERIC,
    reviews TEXT,
    "reviewCount" INTEGER,
    trustpilot BOOLEAN,
    "trustpilotScore" NUMERIC,
    likes INTEGER,

    ceo TEXT,
    "countryCode" TEXT,
    location TEXT,
    "foundedDate" TEXT,
    "yearsOperational" INTEGER,

    "maxFunding" TEXT,
    "profitSplit" TEXT,
    "scalingPlan" TEXT,
    "payoutSpeed" TEXT,
    "payoutFrequency" TEXT,
    "platformNames" TEXT[],

    -- JSONB for nested objects (completely customizable)
    commissions JSONB,
    leverage JSONB,

    "ratingDistribution" INTEGER[],
    features JSONB,
    pros TEXT[],
    cons TEXT[],
    instruments TEXT[],
    "paymentMethods" TEXT[],
    "payoutMethods" TEXT[],
    
    -- Added dynamically per your request exactly!
    "restrictedCountries" TEXT[],

    "dailyLoss" TEXT,
    "maxLoss" TEXT,
    "profitTarget" TEXT,
    "newsTrading" TEXT,
    "weekendHolding" TEXT,
    "eaTrading" TEXT,

    "discountCode" TEXT,
    "discountAmount" TEXT,
    "discountExpiry" TEXT,

    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create the 'accounts' table with a foreign key back to firms (PLANS INFO)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firm_slug TEXT REFERENCES firms(slug) ON DELETE CASCADE,
    size TEXT,
    balance TEXT,
    price NUMERIC,
    "promoPrice" NUMERIC,
    type TEXT,
    "targetPhase1" TEXT,
    "targetPhase2" TEXT,
    "maxDailyLoss" TEXT,
    "maxTotalLoss" TEXT,
    duration TEXT,
    leverage TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create the 'user_reviews' table (USER REVIEWS & RATING INFO)
CREATE TABLE user_reviews (
    id TEXT PRIMARY KEY,
    firm_slug TEXT REFERENCES firms(slug) ON DELETE CASCADE,
    author TEXT,
    date TEXT,
    rating NUMERIC,
    title TEXT,
    content TEXT,
    verified BOOLEAN,
    "helpfulCount" INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Create 'site_settings' table to hold global layout variables (CUSTOMIZE EVERYTHING)
CREATE TABLE site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    hero_headline TEXT,
    hero_subheadline TEXT,
    hero_rotating_words TEXT[],
    seo_title TEXT,
    seo_description TEXT,
    footer_text TEXT,
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 5. Set RLS (Row Level Security) so public can read, but only authenticated users can write.
-- Enable RLS
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (Required for live website to function for users)
CREATE POLICY "Public profiles are viewable by everyone." ON firms FOR SELECT USING (true);
CREATE POLICY "Public accounts are viewable by everyone." ON accounts FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone." ON user_reviews FOR SELECT USING (true);
CREATE POLICY "Public settings are viewable by everyone." ON site_settings FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete (Admin Users)
CREATE POLICY "Authenticated users can manage firms." ON firms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage accounts." ON accounts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage reviews." ON user_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage settings." ON site_settings FOR ALL USING (auth.role() = 'authenticated');


-- =====================================
-- DATA INSERTION LOGIC (DEMO FIRMS)
-- =====================================

INSERT INTO firms (slug, name, logo, badge, "shortDesc", description, rating, reviews, "reviewCount", trustpilot, "trustpilotScore", likes, ceo, "countryCode", location, "foundedDate", "yearsOperational", "maxFunding", "profitSplit", "scalingPlan", "payoutSpeed", "payoutFrequency", "platformNames", commissions, leverage, "ratingDistribution", features, pros, cons, instruments, "paymentMethods", "payoutMethods", "restrictedCountries", "dailyLoss", "maxLoss", "profitTarget", "newsTrading", "weekendHolding", "eaTrading", "discountCode", "discountAmount", "discountExpiry", color) VALUES ('ftmo', 'FTMO', 'https://ftmo.com/wp-content/themes/ftmo-com/public/images/logo-ftmo.svg', 'Best Overall', 'The industry standard for prop trading with a proven track record. Reliable payouts and excellent support.', 'FTMO is a modern proprietary trading firm based in Prague, Czech Republic. Founded in 2015, they provide serious traders with an opportunity to manage an FTMO Account up to $200,000 initial balance (scaling to $2M). They are known for their reliability, excellent customer support, and industry-leading trading conditions.', 4.9, '5k+', 5200, true, 4.9, 12500, 'Otakar Suffner', 'cz', 'Prague, Czech Republic', '2015', 9, '$2M', 'Up to 90%', '25% every 4 months', '1-2 Days', 'Bi-weekly / On-Demand', ARRAY['MT4', 'MT5', 'cTrader', 'DXtrade'], '{"forex":"$3/lot","indices":"Zero","crypto":"Zero","commodities":"$3/lot"}'::jsonb, '{"forex":"1:100","indices":"1:50","crypto":"1:5","commodities":"1:30"}'::jsonb, ARRAY[4800, 300, 50, 20, 30], '[{"icon":"Split","title":"Profit Split","value":"Up to 90%"},{"icon":"Monitor","title":"Platforms","value":"MT4, MT5, cTrader"},{"icon":"Wallet","title":"Account Sizes","value":"$10K - $200K"},{"icon":"Trophy","title":"Challenge","value":"2-Step"},{"icon":"Zap","title":"Payout Speed","value":"1-2 Days"},{"icon":"TrendingUp","title":"Scaling","value":"Available"}]'::jsonb, ARRAY['Reliable Payouts since 2015', 'Excellent Support', 'Great Trading Conditions', 'Free Trial Available', 'Refundable Fee'], ARRAY['Higher Fees than Competitors', 'Strict Rules on News (Normal Acc)', 'No Crypto Weekend Trading'], ARRAY['Forex', 'Metals', 'Indices', 'Crypto', 'Stocks'], ARRAY['Credit/Debit Card', 'Crypto', 'Skrill', 'Nuvei'], ARRAY['Bank Transfer', 'Crypto', 'Skrill'], '{}', '5%', '10%', '10% / 5%', 'Allowed (Swing)', 'Allowed (Swing)', 'Allowed', 'PROVEN10', '10% OFF', NULL, 'blue');

INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('ftmo', '10k', '$10,000', 164, NULL, '2-Step', '$1,000', '$500', '$500 (5%)', '$1,000 (10%)', 'Unlimited', '1:100');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('ftmo', '25k', '$25,000', 275, NULL, '2-Step', '$2,500', '$1,250', '$1,250 (5%)', '$2,500 (10%)', 'Unlimited', '1:100');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('ftmo', '50k', '$50,000', 385, NULL, '2-Step', '$5,000', '$2,500', '$2,500 (5%)', '$5,000 (10%)', 'Unlimited', '1:100');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('ftmo', '100k', '$100,000', 605, NULL, '2-Step', '$10,000', '$5,000', '$5,000 (5%)', '$10,000 (10%)', 'Unlimited', '1:100');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('ftmo', '200k', '$200,000', 1195, NULL, '2-Step', '$20,000', '$10,000', '$10,000 (5%)', '$20,000 (10%)', 'Unlimited', '1:100');

INSERT INTO user_reviews (id, firm_slug, author, date, rating, title, content, verified, "helpfulCount") VALUES ('ftmo-1', 'ftmo', 'John D.', 'Jan 15, 2026', 5, 'Industry Standard', 'FTMO is simply the best. Payouts are always on time and support is amazing.', true, 12);
INSERT INTO user_reviews (id, firm_slug, author, date, rating, title, content, verified, "helpfulCount") VALUES ('ftmo-2', 'ftmo', 'Sarah M.', 'Jan 10, 2026', 5, 'Great Spreads', 'Spreads are tight and execution is instant. Love the dashboard analytics.', true, 8);

INSERT INTO firms (slug, name, logo, badge, "shortDesc", description, rating, reviews, "reviewCount", trustpilot, "trustpilotScore", likes, ceo, "countryCode", location, "foundedDate", "yearsOperational", "maxFunding", "profitSplit", "scalingPlan", "payoutSpeed", "payoutFrequency", "platformNames", commissions, leverage, "ratingDistribution", features, pros, cons, instruments, "paymentMethods", "payoutMethods", "restrictedCountries", "dailyLoss", "maxLoss", "profitTarget", "newsTrading", "weekendHolding", "eaTrading", "discountCode", "discountAmount", "discountExpiry", color) VALUES ('e8-markets', 'E8 Markets', 'https://e8markets.com/img/logo-e8.svg', 'Fastest Growth', 'Innovative tech-driven firm. Unique scaling opportunities and fast payouts.', 'E8 Markets is a proprietary trading firm incorporated in the USA, offering funding for traders worldwide. They have developed their own user-friendly technology and dashboard. E8 is known for its fast scaling plan and ''E8 Track'' program which offers lower entry barriers.', 4.8, '2k+', 2200, true, 4.8, 8500, 'Dylan Elchami', 'us', 'Dallas, USA', 'Nov 2021', 4, '$1M', '80%', 'Drawdown increases with profits', '8 Days (First)', 'Bi-weekly', ARRAY['MT5', 'MatchTrader'], '{"forex":"$3/lot","indices":"Zero","crypto":"Zero","commodities":"Zero"}'::jsonb, '{"forex":"1:100","indices":"1:50","crypto":"1:5","commodities":"1:50"}'::jsonb, ARRAY[1900, 200, 50, 20, 30], '[{"icon":"Split","title":"Profit Split","value":"80%"},{"icon":"Monitor","title":"Platforms","value":"MT5, MatchTrader"},{"icon":"Wallet","title":"Account Sizes","value":"$25K - $250K"},{"icon":"Trophy","title":"Challenge","value":"2-Step / 3-Step"},{"icon":"Zap","title":"Payout Speed","value":"8 Days"},{"icon":"TrendingUp","title":"Scaling","value":"Dynamic"}]'::jsonb, ARRAY['Fast Payouts', 'User-Friendly Dashboard', 'Low Spreads', 'Free Retries'], ARRAY['Slippage on News', 'MT4 Removed', 'Weekend Downgrades'], ARRAY['Forex', 'Commodities', 'Indices', 'Crypto'], ARRAY['Credit Card', 'Crypto', 'Rise'], ARRAY['Riseworks', 'Crypto', 'Bank Transfer'], '{}', '5%', '8%', '8% / 5%', 'Allowed', 'Allowed', 'Allowed', 'PROP5', '5% OFF', NULL, 'yellow');

INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('e8-markets', '25k', '$25,000', 138, 120, '2-Step', '$2,000', '$1,250', '$1,250 (5%)', '$2,000 (8%)', 'Unlimited', '1:50');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('e8-markets', '50k', '$50,000', 228, NULL, '2-Step', '$4,000', '$2,500', '$2,500 (5%)', '$4,000 (8%)', 'Unlimited', '1:50');
INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES ('e8-markets', '100k', '$100,000', 428, NULL, '2-Step', '$8,000', '$5,000', '$5,000 (5%)', '$8,000 (8%)', 'Unlimited', '1:50');

INSERT INTO user_reviews (id, firm_slug, author, date, rating, title, content, verified, "helpfulCount") VALUES ('e8-1', 'e8-markets', 'Mike T.', 'Jan 12, 2026', 5, 'Best Tech', 'The dashboard is miles ahead of others. Very smooth execution.', true, 5);

