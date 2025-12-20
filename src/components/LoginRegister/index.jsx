import React, { useState } from "react";
import { Typography, TextField, Button, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function LoginRegister({ setUser }) {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!loginName) {
      setError("Please enter login name");
      return;
    }

    try {
      const user = await fetchModel(
        "https://rr39dg-8081.csb.app/api/admin/login",
        {
          method: "POST",
          body: JSON.stringify({ login_name: loginName }),
        }
      );

      // ✅ LƯU USER VÀO APP STATE
      setUser(user);

      navigate(`/users/${user._id}`);
    } catch (err) {
      if (err.status === 400) {
        setError("Invalid login name");
      } else {
        setError("Server error. Try again.");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Please Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Login Name"
        fullWidth
        margin="normal"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginRegister;
