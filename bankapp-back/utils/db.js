const postgres = require('pg');

const connectDB = async () => {
  try {
    await postgres.connect(process.env.CONNECTION_URI);
    console.log("Connected to PostgreSQL!");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
};

module.exports = connectDB;