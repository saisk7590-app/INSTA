import { db } from "../config/db";
import bcrypt from "bcryptjs";

const users = [
    { username: "sai_kiran", email: "sai@test.com", password: "Sai@123", full_name: "Sai Kiran", bio: "Building a live map of the city through moments, meetups, and hidden spots.", avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300", location: "POINT(17.4126 78.4354)" },
    { username: "alex_smith", email: "alex@test.com", password: "Alex@123", full_name: "Alex Smith", bio: "Photographer & Traveler exploring local vibes", avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300", location: "POINT(17.4150 78.4400)" },
    { username: "maya_creative", email: "maya@test.com", password: "Maya@123", full_name: "Maya Creative", bio: "Foodie & Chef sharing late night picks", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300", location: "POINT(17.4190 78.4300)" },
    { username: "ryan_style", email: "ryan@test.com", password: "Ryan@123", full_name: "Ryan Style", bio: "Fashion Enthusiast & Designer", avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300", location: "POINT(17.4080 78.4420)" },
    { username: "sara_guru", email: "sara@test.com", password: "Sara@123", full_name: "Sara Guru", bio: "Building the future through maps and coffee", avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300", location: "POINT(17.4100 78.4320)" }
];

const postImages = [
    "https://images.unsplash.com/photo-1506744626753-1fa28f673b0c",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4"
];

const captions = [
    "What a beautiful day! ☀️", "Loving this view.", "Coffee break ☕", 
    "Working hard or hardly working?", "Exploring new places 🌍", 
    "Just wrapped up a great project!", "Good vibes only ✨", "Weekend getaway mode."
];

async function seed() {
    try {
        console.log("Starting DB seed...");
        
        console.log("Truncating existing tables...");
        await db.query(`
            TRUNCATE users, posts, follows, comments, post_likes, comment_likes, 
            saved_collections, saved_posts, conversations, conversation_participants, 
            messages, notifications CASCADE;
        `);
        console.log("✅ Tables truncated successfully");

        // Insert Users
        const userIds: string[] = [];
        for (const u of users) {
            const passwordHash = bcrypt.hashSync(u.password, 10);
            const res = await db.query(`
                INSERT INTO users (username, email, password_hash, full_name, avatar_url, bio, location, onboarding_completed)
                VALUES ($1, $2, $3, $4, $5, $6, ST_GeomFromText($7, 4326), TRUE)
                RETURNING id
            `, [u.username, u.email, passwordHash, u.full_name, u.avatar_url, u.bio, u.location]);
            userIds.push(res.rows[0].id);
        }
        console.log(`✅ Seeded 5 Users`);

        // Insert Posts (5 per user = 25 posts)
        let totalPosts = 0;
        const postIds: string[] = [];
        for (const userId of userIds) {
            for (let i = 0; i < 5; i++) {
                const img = postImages[Math.floor(Math.random() * postImages.length)] + "?random=" + Math.random();
                const caption = captions[Math.floor(Math.random() * captions.length)];
                const res = await db.query(`
                    INSERT INTO posts (user_id, media_url, caption, location_name, likes_count, comments_count)
                    VALUES ($1, $2, $3, 'Local Spot', $4, $5)
                    RETURNING id
                `, [userId, img, caption, Math.floor(Math.random() * 100), Math.floor(Math.random() * 20)]);
                postIds.push(res.rows[0].id);
                totalPosts++;
            }
        }
        console.log(`✅ Seeded ${totalPosts} New Posts`);

        // Insert Follows (User 0 follows 1 & 2. User 1 follows 0 & 3, etc.)
        const follows = [
            [0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 4], [3, 0], [3, 4], [4, 1], [4, 2]
        ];

        for (const f of follows) {
            const follower = userIds[f[0]];
            const followed = userIds[f[1]];
            await db.query("INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)", [follower, followed]);
        }
        console.log(`✅ Seeded 10 Follow Relationships`);

        // Insert Comments (3 to 8 per post)
        const commentTexts = [
            "Amazing view! Thanks for sharing.",
            "This looks like such a cool place, where is it?",
            "Wow, I need to visit this spot soon!",
            "Great shot! What time did you go?",
            "Love the vibe of this photo.",
            "Perfect recommendation, I went there yesterday!",
            "Is it crowded on weekends?",
            "So true! Totally agree with this.",
            "Such a gem in the city.",
            "Nice capture, the lighting is beautiful."
        ];

        console.log("Seeding comments...");
        let totalComments = 0;
        for (const postId of postIds) {
            const numComments = Math.floor(Math.random() * 6) + 3; // between 3 and 8 comments
            for (let i = 0; i < numComments; i++) {
                const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
                const randomText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
                const commentTime = new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000);
                await db.query(`
                    INSERT INTO comments (post_id, user_id, text_content, created_at)
                    VALUES ($1, $2, $3, $4)
                `, [postId, randomUser, randomText, commentTime]);
                totalComments++;
            }
            // Update comments_count in posts table
            await db.query(`
                UPDATE posts SET comments_count = $1 WHERE id = $2
            `, [numComments, postId]);
        }
        console.log(`✅ Seeded ${totalComments} comments across posts`);

        // Insert 4 Conversations (with 2 participants each)
        const conversationPairs = [
            [0, 1], // Sai & Alex
            [0, 2], // Sai & Maya
            [1, 2], // Alex & Maya
            [0, 3]  // Sai & Ryan
        ];

        const conversationIds: string[] = [];
        for (const pair of conversationPairs) {
            const res = await db.query(`
                INSERT INTO conversations (is_group, name)
                VALUES (FALSE, NULL)
                RETURNING id
            `);
            const convId = res.rows[0].id;
            conversationIds.push(convId);

            // Add participants
            await db.query(`
                INSERT INTO conversation_participants (conversation_id, user_id)
                VALUES ($1, $2), ($1, $3)
            `, [convId, userIds[pair[0]], userIds[pair[1]]]);
        }

        // Seed 20 realistic messages across the 4 conversations
        const messagesData = [
            // Conv 0 (Sai & Alex) - 5 messages
            { convIdx: 0, senderIdx: 0, text: "Hey Alex, you coming to the coffee meetup?", delayMin: 40 },
            { convIdx: 0, senderIdx: 1, text: "Hey Sai! Yeah, I will be there in 10 mins.", delayMin: 35 },
            { convIdx: 0, senderIdx: 0, text: "Awesome, I'm already at the spot.", delayMin: 30 },
            { convIdx: 0, senderIdx: 1, text: "Great, save me a seat!", delayMin: 25 },
            { convIdx: 0, senderIdx: 0, text: "Sure thing, see you.", delayMin: 20 },

            // Conv 1 (Sai & Maya) - 5 messages
            { convIdx: 1, senderIdx: 2, text: "Did you try the late night dessert spot?", delayMin: 50 },
            { convIdx: 1, senderIdx: 0, text: "Not yet, is it good?", delayMin: 45 },
            { convIdx: 1, senderIdx: 2, text: "Unbelievable! You have to try the chocolate lava cake.", delayMin: 40 },
            { convIdx: 1, senderIdx: 0, text: "Let's go this Friday.", delayMin: 35 },
            { convIdx: 1, senderIdx: 2, text: "Deal! I'll invite the others.", delayMin: 30 },

            // Conv 2 (Alex & Maya) - 5 messages
            { convIdx: 2, senderIdx: 1, text: "Hey Maya, love your new food post!", delayMin: 60 },
            { convIdx: 2, senderIdx: 2, text: "Thank you Alex! Let me know if you want to collaborate.", delayMin: 55 },
            { convIdx: 2, senderIdx: 1, text: "Definitely. Let's plan a shoot next week.", delayMin: 50 },
            { convIdx: 2, senderIdx: 2, text: "Sounds perfect. Let's discuss details.", delayMin: 45 },
            { convIdx: 2, senderIdx: 1, text: "Awesome, talk to you soon.", delayMin: 40 },

            // Conv 3 (Sai & Ryan) - 5 messages
            { convIdx: 3, senderIdx: 3, text: "Hey Sai, the fashion event is starting.", delayMin: 90 },
            { convIdx: 3, senderIdx: 0, text: "Oh cool, where is it exactly?", delayMin: 85 },
            { convIdx: 3, senderIdx: 3, text: "At the Jubilee Hills gallery. Check it out!", delayMin: 80 },
            { convIdx: 3, senderIdx: 0, text: "Nice, I'll try to drop by.", delayMin: 75 },
            { convIdx: 3, senderIdx: 3, text: "Awesome, see you there!", delayMin: 70 }
        ];

        for (const msg of messagesData) {
            const conversationId = conversationIds[msg.convIdx];
            const senderId = userIds[msg.senderIdx];
            const timestamp = new Date(Date.now() - msg.delayMin * 60 * 1000);

            await db.query(`
                INSERT INTO messages (conversation_id, sender_id, text_content, created_at)
                VALUES ($1, $2, $3, $4)
            `, [conversationId, senderId, msg.text, timestamp]);

            // Update conversation's last message info
            await db.query(`
                UPDATE conversations
                SET last_message_preview = $1, last_message_at = $2, updated_at = $2
                WHERE id = $3
            `, [msg.text, timestamp, conversationId]);
        }
        console.log(`✅ Seeded 20 Messages`);

        // Seed 35 Notifications
        // Categories: follow, like, comment, mention
        // We will distribute these notifications among our 5 users
        const notificationsData = [
            // Sai (User 0) receives 12 notifications
            { userIdx: 0, actorIdx: 1, type: "follow", title: "Alex started following you", desc: "You both have 8 mutual connections nearby." },
            { userIdx: 0, actorIdx: 2, type: "follow", title: "Maya started following you", desc: "Maya is a Creator based nearby." },
            { userIdx: 0, actorIdx: 3, type: "follow", title: "Ryan started following you", desc: "Ryan is a Fashion Enthusiast." },
            { userIdx: 0, actorIdx: 4, type: "follow", title: "Sara started following you", desc: "Sara is a coffee lover." },
            { userIdx: 0, actorIdx: 1, type: "like", title: "Alex liked your post", desc: "Your coffee crawl post is gaining traction." },
            { userIdx: 0, actorIdx: 2, type: "like", title: "Maya liked your post", desc: "Your coffee crawl post is gaining traction." },
            { userIdx: 0, actorIdx: 3, type: "like", title: "Ryan liked your post", desc: "Your photo walk invite post got a like." },
            { userIdx: 0, actorIdx: 1, type: "comment", title: "Alex commented on your post", desc: "This spot looks amazing! Dropping by soon." },
            { userIdx: 0, actorIdx: 2, type: "comment", title: "Maya commented on your post", desc: "Where is this located? Love the vibe." },
            { userIdx: 0, actorIdx: 3, type: "mention", title: "Ryan mentioned you", desc: "Tagged you in a fashion show photo walk." },
            { userIdx: 0, actorIdx: 4, type: "mention", title: "Sara mentioned you", desc: "Check this new spot out @sai_kiran." },
            { userIdx: 0, actorIdx: 2, type: "mention", title: "Maya mentioned you", desc: "Let's meet here this weekend!" },

            // Alex (User 1) receives 8 notifications
            { userIdx: 1, actorIdx: 0, type: "follow", title: "Sai started following you", desc: "Sai is a Hyperlocal Platform Builder." },
            { userIdx: 1, actorIdx: 4, type: "follow", title: "Sara started following you", desc: "Sara is a coffee lover." },
            { userIdx: 1, actorIdx: 0, type: "like", title: "Sai liked your post", desc: "Your sunset shot got a like." },
            { userIdx: 1, actorIdx: 2, type: "like", title: "Maya liked your post", desc: "Your sunset shot got a like." },
            { userIdx: 1, actorIdx: 0, type: "comment", title: "Sai commented on your post", desc: "Stunning colors! What lens did you use?" },
            { userIdx: 1, actorIdx: 2, type: "comment", title: "Maya commented on your post", desc: "So beautiful, love this vibe!" },
            { userIdx: 1, actorIdx: 3, type: "mention", title: "Ryan mentioned you", desc: "Tagged you in a photo shoot setup." },
            { userIdx: 1, actorIdx: 4, type: "like", title: "Sara liked your post", desc: "Your local spot highlight got a like." },

            // Maya (User 2) receives 7 notifications
            { userIdx: 2, actorIdx: 0, type: "follow", title: "Sai started following you", desc: "Sai is a Hyperlocal Platform Builder." },
            { userIdx: 2, actorIdx: 4, type: "follow", title: "Sara started following you", desc: "Sara is a coffee lover." },
            { userIdx: 2, actorIdx: 0, type: "like", title: "Sai liked your post", desc: "Your dessert review got a like." },
            { userIdx: 2, actorIdx: 1, type: "like", title: "Alex liked your post", desc: "Your dessert review got a like." },
            { userIdx: 2, actorIdx: 0, type: "comment", title: "Sai commented on your post", desc: "Wow, looks delicious. Going there today!" },
            { userIdx: 2, actorIdx: 1, type: "comment", title: "Alex commented on your post", desc: "Great review, spot looks perfect." },
            { userIdx: 2, actorIdx: 3, type: "like", title: "Ryan liked your post", desc: "Your late-night eats post got a like." },

            // Ryan (User 3) receives 4 notifications
            { userIdx: 3, actorIdx: 0, type: "follow", title: "Sai started following you", desc: "Sai is a Hyperlocal Platform Builder." },
            { userIdx: 3, actorIdx: 0, type: "like", title: "Sai liked your post", desc: "Your style showcase got a like." },
            { userIdx: 3, actorIdx: 1, type: "like", title: "Alex liked your post", desc: "Your style showcase got a like." },
            { userIdx: 3, actorIdx: 4, type: "comment", title: "Sara commented on your post", desc: "Where is that jacket from? Love the look!" },

            // Sara (User 4) receives 4 notifications
            { userIdx: 4, actorIdx: 1, type: "follow", title: "Alex started following you", desc: "Alex is a Photographer." },
            { userIdx: 4, actorIdx: 2, type: "follow", title: "Maya started following you", desc: "Maya is a Creator based nearby." },
            { userIdx: 4, actorIdx: 1, type: "like", title: "Alex liked your post", desc: "Your latte art got a like." },
            { userIdx: 4, actorIdx: 2, type: "comment", title: "Maya commented on your post", desc: "Best coffee in town! Totally agree." }
        ];

        for (let i = 0; i < notificationsData.length; i++) {
            const notif = notificationsData[i];
            const timestamp = new Date(Date.now() - (i + 1) * 30 * 60 * 1000); // spread over last 18 hours
            const entityId = notif.type === "like" || notif.type === "comment" 
                ? postIds[Math.floor(Math.random() * postIds.length)] 
                : null;

            await db.query(`
                INSERT INTO notifications (user_id, actor_id, type, entity_id, title, description, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [userIds[notif.userIdx], userIds[notif.actorIdx], notif.type, entityId, notif.title, notif.desc, timestamp]);
        }
        console.log(`✅ Seeded 35 Notifications`);

        console.log("🎉 Database seed completed successfully!");
    } catch (error) {
        console.error("❌ Seed error:", error);
    } finally {
        await db.end();
    }
}

seed();
