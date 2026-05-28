CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL, -- Lowercase execution address
    role VARCHAR(20) CHECK (role IN ('builder', 'investor')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
