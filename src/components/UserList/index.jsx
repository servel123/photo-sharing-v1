import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // gọi API backend Codesandbox
    fetchModel("https://rr39dg-8081.csb.app/api/user/list").then((data) => {
      if (data) setUsers(data);
    });
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem>
              <Link
                to={`/users/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={` ${item.last_name}`} />
              </Link>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
