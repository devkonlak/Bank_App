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
    // Fetch data based on the search term
    fetch(`http://localhost:3002/customers?name=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [searchTerm]); // Refetch data whenever the searchTerm changes

  return (
    <Container>
      <Box mt={4}>
        <TextField
          label="Search by name"
          varient="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          className="search-bar"
        />
      </Box>
      <tableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Mobile no</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Date Of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.First_name}</TableCell>
                <TableCell>{d.Last_name}</TableCell>
                <TableCell>{d.city}</TableCell>
                <TableCell>{d.mobile_no}</TableCell>
                <TableCell>{d.occupation}</TableCell>
                <TableCell>{d.dob}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </tableContainer>
    </Container>
  );
}

export default App;
