-- Core User Identities
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL, -- Lowercase execution address
    role VARCHAR(20) CHECK (role IN ('builder', 'investor')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Funding Campaigns
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    investor_id UUID REFERENCES users(id),
    builder_id UUID REFERENCES users(id),
    escrow_contract_address VARCHAR(42), -- Address of the deployed SynapseEscrow.sol contract
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestone Delivery & Payout Trackers
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    blockchain_index INT NOT NULL, -- Matches the array array index inside SynapseEscrow.sol
    title VARCHAR(255) NOT NULL,
    amount_escrowed NUMERIC NOT NULL, -- Value allocated to this milestone
    status VARCHAR(20) CHECK (status IN ('locked', 'in_progress', 'under_review', 'rejected', 'released')) DEFAULT 'locked',
    proof_url TEXT,
    builder_notes TEXT,
    investor_feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE
);
