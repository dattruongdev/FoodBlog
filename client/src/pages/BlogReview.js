import React, { useEffect, useState } from "react";
import Review from "../components/blog/review/review.component";
import { ListGroup } from "react-bootstrap";
import { Form, useParams } from "react-router-dom";
import axios from "axios";
import "./BlogReview.css";
import { useAuthContext } from "../hooks/useAuthContext";

// const review = () => {
//   //logic

//   return;
//   //view
//   <div>hello</div>;
// };
// export default review;

export default function BlogReviews() {
  const { blogId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pages, setPages] = useState(1);
  const { user } = useAuthContext();
  // console.log(user);
  //   const { user, review, date } = data;
  //   setUser(user);
  //   setReviews(review);
  //   console.log(reviews);
  const fetchReview = () => {
    fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/api/v1/reviews/${blogId}?pages=${pages}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data.reviews);
      });
  };
  useEffect(() => {
    fetchReview();
  }, [pages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      alert("Please enter comment");
      return;
    }

    // console.log(e.target.comment.value);
    const dataAxios = await axios.post(
      `${process.env.REACT_APP_MAIN_API_URL}/api/v1/reviews/`,
      {
        content: comment,
        rating: rating,
        blogId: blogId,
        userId: user?.id,
        date: new Date(),
      }
    );
    console.log(dataAxios);
    fetchReview();
    setComment("");
    setRating(0);
    // const fromData = new FormData(e.target);
    // console.log(fromData);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const dataAxios = await axios.delete(
      `${process.env.REACT_APP_MAIN_API_URL}/api/v1/reviews/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      }
    );
    console.log(dataAxios, id);
    fetchReview();
  };

  if (reviews) {
    // console.log(data);
    return (
      <div>
        <div className="Review">
          <h2>Reviews</h2>
          {/* {reviews.length === 0 && <Message>No Reviews</Message>} */}
          {user ? (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <form className="form" onSubmit={handleSubmit}>
                  <div>
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
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
                  </div>
                  <div>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      name="opinion"
                      cols="20"
                      rows="5"
                      placeholder="Your opinion..."
                    ></textarea>
                  </div>

                  <div class="btn-group">
                    <label />
                    <button
                      class="btn submit"
                      type="submit"
                      // onClick={fetchReview}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <h2>Đăng nhập để review</h2>
          )}

          {reviews.map((review, index) => (
            <Review
              key={index}
              review={review}
              handleDelete={handleDelete}
              fetchReview={fetchReview}
            />
          ))}
          <button
            className="primary"
            type="submit"
            onClick={() => {
              setPages(pages + 1);
            }}
            style={{
              backgroundColor: "#3278ff",
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 10,
              color: "#fff",
            }}
          >
            See more
          </button>
        </div>
      </div>
    );
  }
}
