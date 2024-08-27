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

// Define a route to fetch customer data based on cust_id
app.get("/customers", (req, res) => {
  const custId = req.query.cust_id ? req.query.cust_id : ""; // Ensure custId is defined here

  // SQL query to select customer details based on cust_id
  const sql = `
    SELECT c.cust_id,
    c.First_name,
    c.Last_name,
    c.city,
    a.acc_status,
    a.acc_number,
    IFNULL(t.transaction_type, 'No Transaction') AS transaction_type, 
    IFNULL(t.transaction_amount, 0) AS transaction_amount
    FROM customer c
    LEFT JOIN account a ON c.cust_id = a.cust_id
    LEFT JOIN tran_details t ON a.acc_number = t.acc_number
    WHERE c.cust_id LIKE ?`;

  // Execute the query with the provided cust_id
  db.query(sql, [`%${custId}%`], (err, data) => {
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
