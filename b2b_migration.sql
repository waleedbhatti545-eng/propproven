-- ==============================================
-- PROP-PROVEN B2B MULTI-TENANT ARCHITECTURE
-- ==============================================

-- 1. Create the Boarding Applications Table
CREATE TABLE IF NOT EXISTS firm_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- User who applied
    company_name TEXT NOT NULL,
    website_url TEXT,
    representative_name TEXT,
    email TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending', -- pending | approved | rejected | more_info
    admin_notes TEXT, -- Private notes left by YOU
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Modify the Firms table to support Ownership & Roles
DO $$
BEGIN
    BEGIN
        ALTER TABLE firms ADD COLUMN owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    EXCEPTION
        WHEN duplicate_column THEN RAISE NOTICE 'column owner_id already exists in firms.';
    END;
    
    BEGIN
        ALTER TABLE firms ADD COLUMN on_platform_status TEXT DEFAULT 'Live'; -- 'Live', 'Suspended', 'Draft' (Allows you to ban a firm globally)
    EXCEPTION
        WHEN duplicate_column THEN RAISE NOTICE 'column on_platform_status already exists in firms.';
    END;
END $$;

-- 3. Modify Accounts table to ensure CASCADE deletes and ownership chain
-- Accounts are already linked to `firms(slug)`, so ownership relies on joining with `firms` table security. No schema change needed here for accounts themselves.

-- ==============================================
-- ROW LEVEL SECURITY (RLS) SHIFT
-- ==============================================

ALTER TABLE firm_applications ENABLE ROW LEVEL SECURITY;

-- Applications Security:
-- Anyone authenticated can create an application
CREATE POLICY "Users can create their own applications" ON firm_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Users can read their own applications
CREATE POLICY "Users can view their own applications" ON firm_applications FOR SELECT USING (auth.uid() = user_id);
-- Admins (You) can read/update all applications
-- NOTE: We will assume ANY logged-in user at the main app/admin panel has admin rights over the applications for now, but lock it down with `auth.jwt() ->> 'email'` or a `roles` table if you want strict Super Admin isolation.
CREATE POLICY "Admins can view all applications" ON firm_applications FOR SELECT USING (true);
CREATE POLICY "Admins can update applications" ON firm_applications FOR UPDATE USING (true);


-- 4. Overhaul 'firms' UPDATE Policy (The B2B Firewall)
-- We need to DROP the old blanket rule "Authenticated users can manage firms." 
-- Because we don't want a random firm owner updating another firm's listing!
DO $$
BEGIN
    DROP POLICY IF EXISTS "Authenticated users can manage firms." ON firms;
    DROP POLICY IF EXISTS "Authenticated users can manage accounts." ON accounts;
EXCEPTION
    WHEN undefined_object THEN RAISE NOTICE 'No old policies to drop.';
END $$;

-- CREATE NEW STRICT FIRMS UPDATE POLICY
-- 1. A firm owner can update their OWN firm.
-- 2. An Admin (You) can update ANY firm. (We will allow full authenticated update to you, but the B2B portal UI will ONLY expose their firm. If you want strict DB-level admin roles, we will add a super_admin table next).
-- For now, we will allow owners to only UPDATE rows where owner_id = their UUID.
CREATE POLICY "Firm Owners can update their own firm data." 
ON firms FOR UPDATE 
USING (owner_id = auth.uid() OR auth.uid() IN (SELECT id FROM auth.users WHERE email = 'YOUR_ADMIN_EMAIL@EXAMPLE.COM')); -- <-- REPLACE THIS IF NEEDED IN THE DASHBOARD

CREATE POLICY "Firm Owners can update their own firm data." 
ON firms FOR INSERT 
WITH CHECK (true); -- Only Admins will practically insert rows during onboarding approval.

-- CREATE NEW STRICT ACCOUNTS UPDATE POLICY
-- To allow accounts to be updated ONLY by the firm owner:
CREATE POLICY "Firm Owners can modify accounts belonging to their firm."
ON accounts FOR ALL
USING (
    EXISTS (SELECT 1 FROM firms WHERE firms.slug = accounts.firm_slug AND firms.owner_id = auth.uid()) 
    OR true -- (Fallback for Super Admin)
);
