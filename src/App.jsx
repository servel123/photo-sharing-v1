import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

function App() {
  return (
    <Router>
      <TopBar />

      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {/* LEFT SIDEBAR */}
        <Grid item xs={3}>
          <Paper style={{ height: "100vh", padding: "10px" }}>
            <UserList />
          </Paper>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid item xs={9}>
          <Paper style={{ minHeight: "100vh", padding: "20px" }}>
            <Routes>
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
