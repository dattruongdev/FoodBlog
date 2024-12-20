import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/blog/blogcreate.style.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./createBlog.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const { user } = useAuthContext();
  const [blogData, setBlogData] = useState({
    title: "",
    duration: 0,
    description: "",
    images: [],
    content: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);

  console.log(blogData);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const imageData = fileReader.result;
        setSelectedImages([...selectedImages, imageData]);
        setBlogData({
          ...blogData,
          images: [...blogData.images, imageData],
        });
      };

      fileReader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_MAIN_API_URL}/api/v1/blogs/create-blog`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(blogData),
        }
      );
      const data = await response.json();

      // Clear input fields after successful submission
      setBlogData({
        title: "",
        duration: 0,
        description: "",
        images: [],
        content: "",
      });

      setSelectedImages([]); // Clear selected images

      toast.success("Blog created successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error creating blog:", error.message);
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="parent-container">
        <div className="container">
          <h2>Create A Recipes Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
            />

            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={blogData.duration}
              onChange={handleChange}
              required
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              required
            />

            <label>Images:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />

            {/* Display the selected images */}
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                className="image-preview"
              />
            ))}

            <label>Content:</label>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              required
            />

            <button
              style={{
                background: "#14C38E",
                color: "white",
                marginTop: "1rem",
              }}
              type="submit"
            >
              Create Blog
            </button>
            <ToastContainer autoClose={1000} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
