import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios"; // Import Axios

const NewUser = () => {
  // State to hold form data
  const [customerData, setCustomerData] = useState({
    cust_id: "",
    first_name: "",
    last_name: "",
    city: "",
    mobile_no: "",
    occupation: "",
    dob: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server
      const response = await axios.post(
        "http://localhost:3002/add-customer",
        customerData
      );
      console.log(response.data.message);

      // Optionally, you can reset the form after submission
      setCustomerData({
        cust_id: "",
        first_name: "",
        last_name: "",
        city: "",
        mobile_no: "",
        occupation: "",
        dob: "",
      });

      // Display success message or navigate as needed
      alert("Customer added successfully!");
    } catch (error) {
      console.error("There was an error adding the customer:", error);
      alert("Failed to add customer. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create New Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Customer ID"
                name="cust_id"
                value={customerData.cust_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={customerData.first_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={customerData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={customerData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile_no"
                value={customerData.mobile_no}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Occupation"
                name="occupation"
                value={customerData.occupation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={customerData.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  type="reset"
                  onClick={() =>
                    setCustomerData({
                      cust_id: "",
                      first_name: "",
                      last_name: "",
                      city: "",
                      mobile_no: "",
                      occupation: "",
                      dob: "",
                    })
                  }
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container> 
  );
};

export default NewUser;
