import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function TopBar({ user, setUser }) {
  // ===== LOGOUT =====
  const handleLogout = async () => {
    try {
      await fetchModel("https://rr39dg-8081.csb.app/api/admin/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    // Clear user state ở App
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT */}
        <Typography variant="h6">Photo Sharing App</Typography>

        {/* RIGHT */}
        {!user ? (
          <Typography variant="body1">Please Login</Typography>
        ) : (
          <div>
            <Typography variant="body1" sx={{ mr: 2, display: "inline" }}>
              Hi {user.first_name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
