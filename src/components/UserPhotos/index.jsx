import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const u = await fetchModel(
          `https://rr39dg-8081.csb.app/api/user/${userId}`
        );
        const p = await fetchModel(
          `https://rr39dg-8081.csb.app/api/photo/photosOfUser/${userId}`
        );

        setUser(u || null);
        setPhotos(p || []);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) loadData();
  }, [userId]);

  if (loading) return <p>Loading photos...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No photos yet.
        </Typography>
      )}

      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "30px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${photo.file_name}`}
            alt={photo.file_name}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              display: "block",
              marginBottom: "8px",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <Typography variant="body2" color="textSecondary">
            Posted on {new Date(photo.date_time).toLocaleString()}
          </Typography>

          {photo.comments && photo.comments.length > 0 ? (
            <div style={{ marginTop: "10px" }}>
              <Typography variant="subtitle1">Comments:</Typography>

              {photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginLeft: "15px" }}>
                  <Typography variant="body2">
                    {comment.user ? (
                      <Link to={`/users/${comment.user._id}`}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    ) : (
                      <span>Anonymous</span>
                    )}{" "}
                    ({new Date(comment.date_time).toLocaleString()}):
                  </Typography>

                  <Typography variant="body2" style={{ marginLeft: "10px" }}>
                    {comment.comment}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}

          <Divider style={{ marginTop: "20px" }} />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
