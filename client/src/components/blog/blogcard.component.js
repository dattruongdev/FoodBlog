import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/blog/blogcard.style.css"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

const BlogCard = ({ data, refetch }) => {
  const { user } = useAuthContext();
  const { title, createdDate, duration, description, content, _id, images, author } = data;
  // Em dung useNavigate o day thay cho useHistory o ban cu~ - Co the sua lai de su dung useHistory
  const navigate = useNavigate();

  const moveToPost = () => {
    navigate(`/blogs/${_id}`)
  }
  const handleEdit = () => {
    navigate(`/recipe/${_id}/edit`)
  }
  const handleDelete = async () => {
    await axios.delete(`/api/recipe/${_id}/delete`);
    await refetch(_id);
  }

  const handleAuthorInfo = async () => {

    author ? navigate(`/blogs/userinfo/${author._id}`) : navigate('/')
  }

  if (!data.length)
    return (
      <div>
        <div className="blogcard">
          <div className="blogcard-img" onClick={moveToPost}>
            <img src={images.length > 0 ? images[0] : " "} alt="" onError={e => {
              e.target.src = '/noimage.jpeg'
            }} />
          </div>
          <div className="blogcard-content">
            <div className="blogcard-content-title" onClick={moveToPost}>{title}</div>
            <div className="blogcard-content-time">{(new Date(createdDate)).toString().substring(3, 15)} * {duration} mins read</div>
            <p className="blogcard-content-desc">{description.length <= 50 ? description : description.slice(0, 50) + '...'} <Link to={`/blogs/${_id}`} style={{ pointerEvents: "auto", cursor: "pointer" }} >See more</Link></p>
          </div>

          <div className="blogcard-author" onClick={handleAuthorInfo}>
            <img className="blogcard-author-img" src={author?.avatar} alt="" />
            <div className="blogcard-author-info">
              <div style={{ color: "gray", fontSize: "0.9rem", fontStyle: "italic", fontWeight: "bold" }}>Author</div>
              <div>{author?.name}</div>

            </div>
          </div>
          <div className="mngBtn">
            {author && author?._id === user?.id && <button onClick={handleEdit}>Edit</button>}
            {author && author?._id === user?.id && <button className="delete-btn" onClick={handleDelete} style={{ backgroundColor: 'red', marginLeft: '10px', color: 'white' }}>Delete</button>}
          </div>

        </div>
      </div>
    )
  else
    return <div>Loading</div>
}

export default BlogCard;
