import React from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId); // Lấy thông tin người dùng

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
