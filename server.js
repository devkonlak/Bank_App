// Import required modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3002; // Define the port to run the server

const app = express(); // Initialize the Express app

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for the app

// Set up MySQL database connection
const db = mysql.createConnection({
  host: "localhost", // Database host
  user: "root", // Database user
  password: "Kong@rasu07", // Database user password
  database: "Bank", // Name of the database
});

// Define a route for the root URL
app.get("/", (req, res) => {
  return res.status(200).json("From Backend");
});

// Define a route to fetch customer data based on a search query
app.get("/customers", (req, res) => {
  const searchQuery = req.query.name ? req.query.name : ""; // Get the search query from the request, default to an empty string if not provided

  // SQL query to select customers whose first or last name matches the search query
  const sql = `
    SELECT * 
    FROM customer 
    WHERE First_name LIKE ? OR Last_name LIKE ?`;

  // Execute the query with the search parameter
  db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json("Error");
    }
    return res.status(200).json(data);
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening from port ${PORT}`);
});
