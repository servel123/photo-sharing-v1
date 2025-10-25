import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const [rightText, setRightText] = useState("");

  useEffect(() => {
    const users = models.userListModel();
    let text = "";

    if (location.pathname === "/users") {
      text = "User List";
    } else if (
      location.pathname.startsWith("/users/") &&
      !location.pathname.includes("/photos")
    ) {
      const userId = location.pathname.split("/")[2];
      const user = users.find((u) => u._id === userId);
      if (user) text = `${user.first_name} ${user.last_name}`;
    } else if (location.pathname.startsWith("/photos/")) {
      const userId = location.pathname.split("/")[2];
      const user = users.find((u) => u._id === userId);
      if (user) text = `Photos of ${user.first_name} ${user.last_name}`;
    }

    setRightText(text);
  }, [location]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Huy Lee</Typography>
        <Typography variant="h6">{rightText}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
