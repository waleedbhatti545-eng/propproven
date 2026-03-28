const fs = require('fs');

const firms = JSON.parse(fs.readFileSync('src/data/firms.json', 'utf8'));

let sql = '\n\n-- =====================================\n';
sql += '-- DATA INSERTION LOGIC (DEMO FIRMS)\n';
sql += '-- =====================================\n\n';

for (const f of firms) {
    const { accounts, userReviews, ...fd } = f;
    
    const stringify = (val) => {
        if (val === undefined || val === null) return 'NULL';
        if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
        if (typeof val === 'number' || typeof val === 'boolean') return val;
        // Objects/Arrays go to JSONB formatting
        return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
    };

    const arrayifyText = (arr) => {
        if (!arr || arr.length === 0) return "'{}'"; // empty text array
        return `ARRAY[${arr.map(v => typeof v === 'string' ? `'${v.replace(/'/g, "''")}'` : v).join(', ')}]`;
    };

    const arrayifyInt = (arr) => {
        if (!arr || arr.length === 0) return "'{}'"; // empty int array
        return `ARRAY[${arr.join(', ')}]`;
    };

    sql += `INSERT INTO firms (slug, name, logo, badge, "shortDesc", description, rating, reviews, "reviewCount", trustpilot, "trustpilotScore", likes, ceo, "countryCode", location, "foundedDate", "yearsOperational", "maxFunding", "profitSplit", "scalingPlan", "payoutSpeed", "payoutFrequency", "platformNames", commissions, leverage, "ratingDistribution", features, pros, cons, instruments, "paymentMethods", "payoutMethods", "restrictedCountries", "dailyLoss", "maxLoss", "profitTarget", "newsTrading", "weekendHolding", "eaTrading", "discountCode", "discountAmount", "discountExpiry", color) VALUES (${stringify(fd.slug)}, ${stringify(fd.name)}, ${stringify(fd.logo)}, ${stringify(fd.badge)}, ${stringify(fd.shortDesc)}, ${stringify(fd.description)}, ${stringify(fd.rating)}, ${stringify(fd.reviews)}, ${stringify(fd.reviewCount)}, ${stringify(fd.trustpilot)}, ${stringify(fd.trustpilotScore)}, ${stringify(fd.likes)}, ${stringify(fd.ceo)}, ${stringify(fd.countryCode)}, ${stringify(fd.location)}, ${stringify(fd.foundedDate)}, ${stringify(fd.yearsOperational)}, ${stringify(fd.maxFunding)}, ${stringify(fd.profitSplit)}, ${stringify(fd.scalingPlan)}, ${stringify(fd.payoutSpeed)}, ${stringify(fd.payoutFrequency)}, ${arrayifyText(fd.platformNames)}, ${stringify(fd.commissions)}, ${stringify(fd.leverage)}, ${arrayifyInt(fd.ratingDistribution)}, ${stringify(fd.features)}, ${arrayifyText(fd.pros)}, ${arrayifyText(fd.cons)}, ${arrayifyText(fd.instruments)}, ${arrayifyText(fd.paymentMethods)}, ${arrayifyText(fd.payoutMethods)}, ${arrayifyText(fd.restrictedCountries || [])}, ${stringify(fd.dailyLoss)}, ${stringify(fd.maxLoss)}, ${stringify(fd.profitTarget)}, ${stringify(fd.newsTrading)}, ${stringify(fd.weekendHolding)}, ${stringify(fd.eaTrading)}, ${stringify(fd.discountCode)}, ${stringify(fd.discountAmount)}, ${stringify(fd.discountExpiry)}, ${stringify(fd.color)});\n\n`;

    if (accounts && accounts.length > 0) {
        for (const a of accounts) {
            sql += `INSERT INTO accounts (firm_slug, size, balance, price, "promoPrice", type, "targetPhase1", "targetPhase2", "maxDailyLoss", "maxTotalLoss", duration, leverage) VALUES (${stringify(fd.slug)}, ${stringify(a.size)}, ${stringify(a.balance)}, ${stringify(a.price)}, ${stringify(a.promoPrice)}, ${stringify(a.type)}, ${stringify(a.targetPhase1)}, ${stringify(a.targetPhase2)}, ${stringify(a.maxDailyLoss)}, ${stringify(a.maxTotalLoss)}, ${stringify(a.duration)}, ${stringify(a.leverage)});\n`;
        }
    }
    sql += '\n';

    if (userReviews && userReviews.length > 0) {
        for (const r of userReviews) {
            sql += `INSERT INTO user_reviews (id, firm_slug, author, date, rating, title, content, verified, "helpfulCount") VALUES (${stringify(r.id)}, ${stringify(fd.slug)}, ${stringify(r.author)}, ${stringify(r.date)}, ${stringify(r.rating)}, ${stringify(r.title)}, ${stringify(r.content)}, ${stringify(r.verified)}, ${stringify(r.helpfulCount)});\n`;
        }
    }
    sql += '\n';
}

fs.appendFileSync('migration.sql', sql);
console.log('Successfully appended INSERT statements to migration.sql');
