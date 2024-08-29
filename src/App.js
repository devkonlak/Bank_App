import React, { useState } from "react";
import "./App.css";
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";

function App() {
  const [showExistingUser, setShowExistingUser] = useState(false);

  const handleExistingUserClick = () => {
    setShowExistingUser(true);
  };

  return (
    <>
      <NewUser />
      <button onClick={handleExistingUserClick}>Existing user</button>
      {showExistingUser && <ExistingUser />}
    </>
  );
}

export default App;
