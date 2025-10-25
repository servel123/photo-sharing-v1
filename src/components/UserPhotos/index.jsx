import React from "react";
import { Typography, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "30px" }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${photo.file_name}`}
            alt={`Photo by ${user.first_name}`}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              display: "block",
              marginBottom: "8px",
            }}
          />

          <Typography variant="body2" color="textSecondary">
            Posted on {new Date(photo.date_time).toLocaleString()}
          </Typography>
          {/* Danh sách comment */}
          {photo.comments && photo.comments.length > 0 ? (
            <div style={{ marginTop: "10px" }}>
              <Typography variant="subtitle1">Comments:</Typography>
              {photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginLeft: "15px" }}>
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>{" "}
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
