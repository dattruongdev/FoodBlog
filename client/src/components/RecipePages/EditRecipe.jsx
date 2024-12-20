import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { TailSpin } from "react-loader-spinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import "../../css/editRecipe.css";
import Navbar from "../Navbar";
const EditRecipe = () => {
  const id = useParams().id;
  const { user } = useAuthContext();
  const imageElm = useRef(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newImageURLs, setNewImageURLs] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailRecipe = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_MAIN_API_URL}/api/recipe/${id}`
        );
        // , {
        //   headers: {
        //     "Content-type": "application/json",
        //     authorization: `Bearer ${user.token}`,
        //   },
        // });
        console.log(data);
        const blog = data.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setOldImages(blog.images);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
        console.log("runtime error: ", error);
        setTimeout(() => {
          navigate("/");
        }, 4500);
      }
    };
    getDetailRecipe();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleSubmit = async (e) => {
    setUpdating(true);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("content", content);
    oldImages.forEach((image, _) => {
      formdata.append("oldImages", image);
    });
    newImages.forEach((image, _) => {
      formdata.append("images", image);
    });

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_MAIN_API_URL}/api/recipe/${id}/edit`,
        formdata
      );
      // {
      //   headers: {
      //     "Content-type": "application/json",
      //     authorization: `Bearer ${user.token}`,
      //   },
      // });

      setSuccess("Edit Story successfully ");
      setTimeout(() => {
        navigate("/");
      }, 2500);

      setUpdating(false);
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 4500);
      setUpdating(false);
      setError(error.response.data.error);
    }
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] === "image") {
        setNewImageURLs((prevImageURLs) => [
          ...prevImageURLs,
          URL.createObjectURL(files[i]),
        ]);
        setNewImages((prevImages) => [...prevImages, files[i]]);
      }
    }
    console.log(newImages);
  };

  const deleteImage = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setNewImageURLs((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const deleteOldImage = (index) => {
    setOldImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="navbar-container">
        <Navbar />
      </div>
      {loading ? (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <TailSpin color="red" radius={"8px"} />
            <p className="text-xl font-bold">Getting post data</p>
            <p className="text-gray-600">
              Please wait while we getting the content.
            </p>
          </div>
        </div>
      ) : (
        <div className="editRecipe-page ">
          <form
            onSubmit={handleSubmit}
            className="editRecipe-form"
            encType="multipart/form-data"
          >
            {error && <div className="error_msg">{error}</div>}
            {success && (
              <div className="success_msg">
                <span>{success}</span>
                {/* <Link to="/">Go home</Link> */}
              </div>
            )}

            <input
              type="text"
              required
              id="name"
              placeholder="Name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <input
              type="text"
              required
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <CKEditor
              editor={ClassicEditor}
              onChange={(e, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              data={content}
            />
            {(oldImages.length > 0 || newImageURLs.length > 0) && (
              <div className="w-full max-w-2xl mx-auto bg-[#f0f0f0] rounded-lg p-4 border border-gray-300 h-64 overflow-auto">
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {oldImages.map((image, index) => {
                    return (
                      <div
                        className="mx-0 min-w-full flex flex-col items-center"
                        key={index}
                      >
                        <img
                          alt="Uploaded Image"
                          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                          height="200"
                          src={image}
                          width="200"
                        />
                        <button
                          type="button"
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2 mb-5"
                          onClick={() => deleteOldImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  {newImageURLs.map((image, index) => {
                    return (
                      <div
                        className="mx-0 min-w-full flex flex-col items-center"
                        key={index}
                      >
                        <img
                          alt="Uploaded Image"
                          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                          height="200"
                          src={image}
                          width="200"
                        />
                        <button
                          type="button"
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2 mb-5"
                          onClick={() => deleteImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="RecipeImageField">
              <AiOutlineUpload />
              <div className="txt">{"Change the image in your recipe "}</div>
              <input
                className="file"
                name="image"
                type="file"
                ref={imageElm}
                multiple
                onChange={onFileSelect}
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={updating}
            >
              {updating ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mt-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.365A10.01 10.01 0 002.365 14H4v-2zm18-2a8 8 0 01-8 8v2a10.01 10.01 0 002.365-14H20v2z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Update Blog"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditRecipe;
