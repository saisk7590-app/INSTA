import { db } from "../config/db";

async function checkDatabase() {
    try {
        console.log("Testing Database Connection...");
        
        // Check if connection works
        const res = await db.query("SELECT NOW()");
        console.log(`✅ DB Connection Successful. Server Time: ${res.rows[0].now}`);

        // Fetch all users
        const usersRes = await db.query(`
            SELECT id, username, email, password_hash, full_name 
            FROM users;
        `);
        
        console.log("\n👤 Seeded Users in DB:");
        if (usersRes.rows.length === 0) {
            console.log("❌ No users found in users table.");
        } else {
            usersRes.rows.forEach(row => {
                console.log(` - ID: ${row.id} | Username: ${row.username} | Email: ${row.email} | Name: ${row.full_name} | Password Hash: ${row.password_hash}`);
            });
            console.log(`Total: ${usersRes.rows.length} users.`);
        }
    } catch (err) {
        console.error("❌ Database Error:", err);
    } finally {
        await db.end();
    }
}

checkDatabase();
