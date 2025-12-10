import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; // Thay vì models.js

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchModel(`https://rr39dg-8081.csb.app/api/user/${userId}`).then(
        (data) => {
          if (data) setUser(data);
        }
      );
    }
  }, [userId]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Typography variant="body1" paragraph>
        Description: {user.description}
      </Typography>

      <Link to={`/photos/${user._id}`}>View Photos</Link>
    </div>
  );
}

export default UserDetail;
