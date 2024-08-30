const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3002;

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kong@rasu07",
  database: "Bank",
});

app.get("/", (req, res) => {
  return res.status(200).json("From Backend");
});

// Route to add a new customer
app.post("/add-customer", (req, res) => {
  const { cust_id, first_name, last_name, city, mobile_no, occupation, dob } =
    req.body;

  const sql = `
    INSERT INTO customer (cust_id, First_name, Last_name, city, mobile_no, occupation, dob)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [cust_id, first_name, last_name, city, mobile_no, occupation, dob],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Failed to add customer" });
      }
      return res.status(200).json({ message: "Customer added successfully" });
    }
  );
});

app.get("/customers", (req, res) => {
  const custId = req.query.cust_id ? req.query.cust_id : "";

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

  db.query(sql, [`%${custId}%`], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json("Error");
    }
    return res.status(200).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Listening from port ${PORT}`);
});
