import { db } from "../config/db";

async function migrateGeo() {
    const client = await db.connect();
    try {
        console.log("🚀 Starting Phase 2A.1 — Geo Database Migration...");
        await client.query("BEGIN");

        // ─── USERS TABLE ──────────────────────────────────────────────
        console.log("📍 Altering users table...");

        await client.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS current_latitude  DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS current_longitude DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS last_location_updated TIMESTAMP WITH TIME ZONE;
        `);

        // ─── POSTS TABLE ──────────────────────────────────────────────
        console.log("📸 Altering posts table...");

        await client.query(`
            ALTER TABLE posts
            ADD COLUMN IF NOT EXISTS latitude             DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS longitude            DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS place_name          VARCHAR(255),
            ADD COLUMN IF NOT EXISTS geo_visibility_radius INTEGER DEFAULT 5000;
        `);

        // ─── INDEXES ──────────────────────────────────────────────────
        console.log("📊 Creating geo indexes...");

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_users_current_lat_lng
            ON users (current_latitude, current_longitude)
            WHERE current_latitude IS NOT NULL;
        `);

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_posts_lat_lng
            ON posts (latitude, longitude)
            WHERE latitude IS NOT NULL;
        `);

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_posts_geo_radius
            ON posts (geo_visibility_radius, created_at DESC);
        `);

        await client.query("COMMIT");
        console.log("✅ Phase 2A.1 migration completed successfully!");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("❌ Migration failed, rolling back:", error);
        throw error;
    } finally {
        client.release();
        await db.end();
    }
}

migrateGeo();
