import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Grid, Paper } from "@mui/material";

import TopBar from "./components/TopBar";
import LoginRegister from "./components/LoginRegister";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

function App() {
  // 🔥 trạng thái user đăng nhập
  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* ===== TOP BAR ===== */}
      <TopBar user={user} setUser={setUser} />

      {/* ===== CHƯA LOGIN ===== */}
      {!user ? (
        <LoginRegister setUser={setUser} />
      ) : (
        /* ===== ĐÃ LOGIN ===== */
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* LEFT SIDEBAR */}
          <Grid item xs={3}>
            <Paper sx={{ height: "100vh", p: 2 }}>
              <UserList />
            </Paper>
          </Grid>

          {/* RIGHT CONTENT */}
          <Grid item xs={9}>
            <Paper sx={{ minHeight: "100vh", p: 3 }}>
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />

                {/* deep link không hợp lệ */}
                <Route
                  path="*"
                  element={<Navigate to={`/users/${user._id}`} />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Router>
  );
}

export default App;
