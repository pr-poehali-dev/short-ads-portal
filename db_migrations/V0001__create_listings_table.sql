CREATE TABLE t_p21054397_short_ads_portal.listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(50),
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_listings_category ON t_p21054397_short_ads_portal.listings(category);
CREATE INDEX idx_listings_created_at ON t_p21054397_short_ads_portal.listings(created_at DESC);