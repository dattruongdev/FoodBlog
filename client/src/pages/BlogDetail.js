import React, { useEffect, useState } from "react";
import "../styles/blog/blogdetail.style.css";
import { Form, useNavigate, useParams } from "react-router-dom";
import BlogReviews from "./BlogReview";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
export default function BlogDetail() {
  const { blogId } = useParams();
  const [detail, setDetail] = useState(undefined);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toEditPage = () => {
    navigate(`/recipe/${blogId}/edit`);
  };
  // Trang detail cua blog
  // Dung useParams de lay param tu Route (duoc khai bao trong /src/index.js) o day la :id
  // Fetch lai document cho id nay
  // set data cho bien detail
  //
  //
  const handleAuthorInfo = async () => {
    detail?.author
      ? navigate(`/blogs/userinfo/${detail.author._id}`)
      : navigate("/");
  };
  const changeImage = (e) => {
    let offset = e.target.dataset.direction === "next" ? 1 : -1;
    let isInRange =
      currentImageIndex + offset >= 0 &&
      currentImageIndex + offset < detail?.images?.length;
    if (!isInRange) return;
    setCurrentImageIndex((prev) => prev + offset);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_MAIN_API_URL}/api/v1/blogs/${blogId}`)
      .then((resp) => resp.json())
      .then((data) => setDetail(data));

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  if (detail) {
    return (
      <div>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="blog-detail-container">
          <div className="blog-detail-hero-img">
            {detail?.images.length > 0 ? (
              detail.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onError={(e) => {
                    e.target.src = "/noimage.jpeg";
                  }}
                  alt="/batman.png"
                  className={index === currentImageIndex ? "active" : ""}
                />
              ))
            ) : (
              <img className="active" src={"/noimage.jpeg"} alt="noimage" />
            )}
            <div className="switches">
              <div onClick={(e) => changeImage(e)} data-direction="prev">
                &lt;
              </div>
              <div onClick={(e) => changeImage(e)} data-direction="next">
                &gt;
              </div>
            </div>
          </div>
          <div className="blog-detail">
            <div className="blog-detail-author">
              <img
                src={detail?.author?.avatar ?? "/userpicture.jpeg"}
                alt=""
                onClick={handleAuthorInfo}
              />
              <div className="author-name" onClick={handleAuthorInfo}>
                By {detail?.author?.name ?? "User"}
              </div>
              <div>
                {new Date(detail.createdDate).toString().substring(3, 15)}
              </div>

              {user?.id === detail?.author?._id && (
                <button onClick={toEditPage}>Edit blog</button>
              )}
            </div>

            <h1 className="blog-detail-title">{detail.title}</h1>

            <p
              dangerouslySetInnerHTML={{ __html: detail.content }}
              className="blog-detail-content"
            ></p>
            <div className="separator"></div>
          </div>
          <BlogReviews />
        </div>
      </div>
    );
  } else return <div>Loading</div>;
}
