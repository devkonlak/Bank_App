import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";
import "./App.css";

function App() {
  const [showNewUser, setShowNewUser] = useState(false);
  const [showExistingUser, setShowExistingUser] = useState(false);

  const handleNewUserClick = () => {
    setShowNewUser(true);
    setShowExistingUser(false);
  };

  const handleExistingUserClick = () => {
    setShowNewUser(false);
    setShowExistingUser(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4f7",
        padding: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Bank App
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewUserClick}
        >
          New User
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleExistingUserClick}
        >
          Existing User
        </Button>
      </Box>
      {showNewUser && <NewUser />}
      {showExistingUser && <ExistingUser />}
    </Box>
  );
}

export default App;
