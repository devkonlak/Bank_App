import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data based on the customer ID (using cust_id)
    fetch(`http://localhost:3002/customers?cust_id=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([]); // Ensure data is an array
        }
      })
      .catch((err) => console.log(err));
  }, [searchTerm]); // Refetch data whenever the searchTerm changes

  return (
    <Container>
      <Box mt={4}>
        <TextField
          label="Search by Customer ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          className="search-bar"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Account Status</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Transaction Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.cust_id}</TableCell>
                  <TableCell>{d.First_name}</TableCell>
                  <TableCell>{d.Last_name}</TableCell>
                  <TableCell>{d.city}</TableCell>
                  <TableCell>{d.acc_status}</TableCell>
                  <TableCell>{d.acc_number}</TableCell>
                  <TableCell>{d.transaction_type}</TableCell>
                  <TableCell>{d.transaction_amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
