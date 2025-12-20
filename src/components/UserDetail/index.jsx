import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";
// Thay vì models.js

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    fetchModel(`https://rr39dg-8081.csb.app/api/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/login");
        }
      });
  }, [userId, navigate]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return null;

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
