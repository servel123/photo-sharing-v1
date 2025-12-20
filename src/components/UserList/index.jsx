import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("https://rr39dg-8081.csb.app/api/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        // 👇 CHỈ DÒNG NÀY là mấu chốt Problem 1
        if (err.status === 401) {
          setUsers([]); // chưa login → không hiển thị gì
        }
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
