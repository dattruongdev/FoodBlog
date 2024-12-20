import React, { useRef, useState } from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import axios from "axios";
import Rating from "./Rating";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Review(prop) {
  // console.log(prop);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(prop.review?.content);
  const [rating, setRating] = useState(prop.review?.rating);
  const { user } = useAuthContext();

  const editor = async (e) => {
    e.preventDefault();
    if (comment === "") {
      window.alert("editing must have comment value");
      return;
    }
    // console.log(e.target.comment.value);
    const dataAxios = await axios.put(
      `${process.env.REACT_APP_MAIN_API_URL}/api/v1/reviews/${prop.review?._id}`,
      {
        content: comment,
        date: new Date(),
        rating: rating,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(dataAxios);
    prop.fetchReview();
    setEditing(false);
  };
  return (
    <div
      style={{
        marginBottom: "5px",
        backgroundColor: "#14C38E",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <img
        className="avatar-img"
        src={prop.review?.userId?.avatar ?? "/userpicture.jpeg"}
        alt="avatar"
        width="65"
        height="65"
        style={{ borderRadius: "50%" }}
      />
      <MDBTypography tag="h1">{prop.review?.userId?.name}</MDBTypography>
      <p className="small">
        Date: {prop.review?.date?.toString().substr(0, 10)}
      </p>
      {!editing ? (
        <p>Review: {prop.review?.content}</p>
      ) : (
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      )}
      {editing && (
        <>
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">1- Bad</option>
            <option value="2">2- Fair</option>
            <option value="3">3- Good</option>
            <option value="4">4- Very good</option>
            <option value="5">5- Excelent</option>
          </select>
        </>
      )}
      <Rating value={prop.review?.rating} />

      {user && user?.id === prop.review?.userId?._id && (
        <div>
          {editing ? (
            <button
              className="primary"
              type="submit"
              style={{
                backgroundColor: "Orange",
              }}
              onClick={editor}
            >
              Accept
            </button>
          ) : (
            <button
              className="primary"
              type="submit"
              style={{
                backgroundColor: "pink",
              }}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}

          <button
            className="primary"
            type="submit"
            style={{
              backgroundColor: "red",
              marginLeft: "10px",
            }}
            onClick={(e) => {
              console.log(prop.review);
              prop.handleDelete(e, prop.review?._id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
