-- Total Modules: 7
-- Total Tables: 18
-- Project: Insta App
-- Database: PostgreSQL
-- Architecture Type: Hyperlocal Social Media Platform

-- ====================================
-- ENABLE EXTENSIONS & ENUMS
-- ====================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- PostGIS extension enabled for enterprise-grade geospatial indexing and radius searches.
CREATE EXTENSION IF NOT EXISTS "postgis"; 

-- ENUM: Account Types
CREATE TYPE user_badge_type AS ENUM ('User', 'Creator', 'Business');
CREATE TYPE user_status_type AS ENUM ('active', 'suspended', 'deleted', 'pending_review');

-- ENUM: Privacy Settings
CREATE TYPE privacy_level_type AS ENUM ('public', 'private', 'friends_only');

-- ENUM: Messaging
CREATE TYPE message_content_type AS ENUM ('text', 'media', 'voice');

-- ENUM: Notifications
CREATE TYPE notification_category AS ENUM ('follow', 'like', 'comment', 'mention', 'alert', 'message');

-- ====================================
-- AUTH & USERS MODULE
-- ====================================

-- 1) Users Table
-- Hardened with regex CHECK constraints to prevent dirty data, 
-- ENUM types for status/badge, and deleted_at for Soft Deletes.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL CHECK (username ~ '^[a-zA-Z0-9_.]+$'),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    badge user_badge_type DEFAULT 'User',
    status user_status_type DEFAULT 'active',
    location GEOGRAPHY(Point, 4326), -- Upgraded to PostGIS geography for accurate radius queries
    onboarding_completed BOOLEAN DEFAULT FALSE,
    location_granted BOOLEAN DEFAULT FALSE,
    notifications_granted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete
);

-- 2) User Interests Table
CREATE TABLE user_interests (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, interest)
);

-- 3) User Settings Table
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    privacy_level privacy_level_type DEFAULT 'public',
    push_notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- SOCIAL CONNECTIONS MODULE
-- ====================================

-- 4) Follows Table
-- Essential check constraint added to prevent users from following themselves.
CREATE TABLE follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followed_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, followed_id),
    CONSTRAINT cannot_follow_self CHECK (follower_id != followed_id)
);

-- ====================================
-- BUSINESS & PLACES MODULE
-- ====================================

-- 5) Businesses Table
-- Hardened with PostGIS geography for hyperlocal searches, and a soft delete field.
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    vibe VARCHAR(100),
    description TEXT,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    cover_image_url TEXT,
    meta_info JSONB DEFAULT '{}'::jsonb, -- Enforced default JSON for predictable parsing
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- ====================================
-- CONTENT MODULE
-- ====================================

-- 6) Posts Table
-- Protected counters with non-negative constraints.
-- Added PostGIS location for "Trending Nearby".
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    caption TEXT,
    location_name VARCHAR(255),
    location GEOGRAPHY(Point, 4326),
    likes_count INT DEFAULT 0 CHECK (likes_count >= 0),
    comments_count INT DEFAULT 0 CHECK (comments_count >= 0),
    shares_count INT DEFAULT 0 CHECK (shares_count >= 0),
    saves_count INT DEFAULT 0 CHECK (saves_count >= 0),
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 7) Stories Table
-- Enforced default JSON for ring colors.
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    ring_colors_json JSONB DEFAULT '[]'::jsonb,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8) Hashtags Table
-- Strict regex ensures clean, URL-safe hashtags.
CREATE TABLE hashtags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL CHECK (name ~ '^[a-zA-Z0-9_]+$'),
    usage_count INT DEFAULT 0 CHECK (usage_count >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9) Post Hashtags Table
CREATE TABLE post_hashtags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    hashtag_id UUID REFERENCES hashtags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, hashtag_id)
);

-- ====================================
-- ENGAGEMENT MODULE
-- ====================================

-- 10) Post Likes Table
CREATE TABLE post_likes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

-- 11) Comments Table
-- Checked constraint prevents blank/empty whitespace comments.
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE, 
    text_content TEXT NOT NULL CHECK (length(trim(text_content)) > 0),
    likes_count INT DEFAULT 0 CHECK (likes_count >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 12) Comment Likes Table
CREATE TABLE comment_likes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, comment_id)
);

-- 13) Saved Collections Table
-- Added regex to ensure valid hex codes for the UI accent colors.
CREATE TABLE saved_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    cover_url TEXT,
    accent_color VARCHAR(7) CHECK (accent_color ~ '^#[0-9a-fA-F]{6}$'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14) Saved Posts Table
CREATE TABLE saved_posts (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES saved_collections(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

-- ====================================
-- MESSAGING MODULE
-- ====================================

-- 15) Conversations Table
-- added last_message_at for optimized inbox sorting without aggressive JOINs
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_group BOOLEAN DEFAULT FALSE,
    name VARCHAR(255),
    avatar_url TEXT,
    last_message_preview TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16) Conversation Participants Table
-- Added left_at for tracking group chat history correctly.
CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (conversation_id, user_id)
);

-- 17) Messages Table
-- Soft delete flag added for "unsend" features.
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    message_type message_content_type DEFAULT 'text',
    text_content TEXT,
    media_url TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- NOTIFICATIONS MODULE
-- ====================================

-- 18) Notifications Table
-- Utilizing ENUM for type constraint
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, 
    actor_id UUID REFERENCES users(id) ON DELETE CASCADE, 
    type notification_category NOT NULL,
    entity_id UUID, 
    title VARCHAR(255),
    description TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- INDEX STRATEGY (PRODUCTION OPTIMIZED)
-- ====================================

-- Users & Auth (Case-insensitive unique login handling)
CREATE UNIQUE INDEX idx_users_username_lower ON users(LOWER(username));
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;

-- Geo-Location PostGIS Indexes (Crucial for Hyperlocal Feeds)
CREATE INDEX idx_users_location ON users USING GIST (location);
CREATE INDEX idx_businesses_location ON businesses USING GIST (location);
CREATE INDEX idx_posts_location ON posts USING GIST (location);

-- Feed & Cursor Pagination (Replaces inefficient OFFSET)
CREATE INDEX idx_posts_feed_pagination ON posts(created_at DESC, id);
CREATE INDEX idx_posts_user_id_created ON posts(user_id, created_at DESC);

-- Engagement Queries (Fast loading of replies)
CREATE INDEX idx_comments_post_pagination ON comments(post_id, created_at DESC);
CREATE INDEX idx_likes_post ON post_likes(post_id);
CREATE INDEX idx_follows_relations ON follows(follower_id, followed_id);

-- Messaging Realtime & Inbox 
-- Speeds up "My Inbox" rendering
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);
CREATE INDEX idx_messages_conversation_time ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_participants_user_unread ON conversation_participants(user_id, last_read_at);

-- Notifications (Filtered Index)
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, created_at DESC) WHERE is_read = FALSE;

-- Explore & Discover
CREATE INDEX idx_hashtags_usage ON hashtags(usage_count DESC);
CREATE INDEX idx_businesses_category ON businesses(category);

-- ====================================
-- FINAL DATABASE SUMMARY
-- ====================================
-- Total Tables: 18
-- Total Indexes: 16 (Using GIST, Partial, and Composite)
-- Total Relationship Tables: 6
-- Geo-enabled Tables: 3 (users, posts, businesses via PostGIS)
-- Realtime-related Tables: 4 (conversations, conversation_participants, messages, notifications)
