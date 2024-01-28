const { getDatabase } = require('../config/database');

async function checkUser(username, password) {
    const db = getDatabase();
    const collection = db.collection('users');

    try {
        const user = await collection.findOne({ username, password });
        return user;
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
}

async function registerUser(username, password, email) {
    const db = getDatabase();
    const collection = db.collection('users');

    try {
        // Check if username or email already exists
        const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new Error('Username or email already exists');
        }

        // Create new user
        const newUser = await collection.insertOne({ username, password, email });
        return newUser;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

module.exports = { registerUser, checkUser };
