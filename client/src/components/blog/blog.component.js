import { useEffect, useState } from "react";
import BlogCard from "./blogcard.component";
import "../../styles/blog/blog.style.css";
import Pagination from "./pagination.component";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const pagesShown = 5;

const Blog = ({ filterByUser }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [{ blogs, totalCount }, setBlogs] = useState({
    blogs: undefined,
    totalCount: 1,
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [searchContent, setSearchContent] = useState("");

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  const filterDeleted = (id) => {
    setBlogs((prev) => ({
      totalCount: totalCount - 1,
      blogs: prev.blogs.filter((blog) => blog._id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `${process.env.MAIN_API_URL}/api/v1/blogs/search?title=${searchContent}&page=${page}&filterByUser=${filterByUser}`,
      filterByUser && user
        ? {
            headers: {
              "Content-type": "application/json",
              userid: `${user.id}`,
            },
            method: "GET",
          }
        : null
    );

    let data = await res.json();
    setBlogs({
      blogs: data.blogs,
      totalCount: data.totalDocCount,
    });
  };

  const calcPages = (blogCount) => {
    let totalCount = blogCount;

    //Tong so trang || Moi trang 12 documents || Co the fix 12 thanh so khac chia het cho 2 de show document deu` || Co the them query cho url la limit = 12 v.v
    const totalPages =
      Math.floor(totalCount / 12) + (totalCount % 12 !== 0 ? 1 : 0);

    // So trang nhieu hon so can show. Vi du 6 trang nhung can show 5 trang mot lan
    if (totalPages > pagesShown) {
      // Khoang giua cua pagesShown = 5 la 3, 3 cach trang cuoi 2 trang, cach trang dau 2 trang =>  Math.floor(5 / 2) == 2 == offset
      let offset = Math.floor(pagesShown / 2);

      // Trang hien tai (page) van co' offset hop le
      if (page - offset > 0 && page + offset <= totalPages) {
        setPages([page - 2, page - 1, page, page + 1, page + 2]);
      } else {
        // Trang hien tai nam o gan` cuoi'
        if (page + offset >= totalPages)
          setPages(arrayRange(totalPages - pagesShown + 1, totalPages, 1));
        else if (page - offset < 0)
          // Trang hien tai nam` o~ dau`
          setPages(arrayRange(1, pagesShown, 1));
      }
    } else {
      //So trang it hon so trang minh can show. Vi du can show 5 trang mot lan`, nhung documents chi du~ cho 2 trang
      setPages(arrayRange(1, totalPages, 1));
    }
  };

  async function fetchBlogs() {
    console.log("MAIN_API_URL", process.env.REACT_APP_MAIN_API_URL);
    console.log("NODE_ENV", process.env.NODE_ENV);
    let resp = await fetch(
      `${process.env.REACT_APP_MAIN_API_URL}/api/v1/blogs?page=${page}&filterByUser=${filterByUser}`,
      filterByUser && user
        ? {
            headers: {
              "Content-type": "application/json",
              userid: `${user.id}`,
            },
            method: "GET",
          }
        : null
    );
    let data = await resp.json();
    setBlogs((prev) => {
      calcPages(data.totalDocCount);
      return {
        blogs: data.blogs,
        totalCount: data.totalDocCount,
      };
    });
  }
  useEffect(() => {
    /* Fetch blog data here */
    fetchBlogs();
  }, [page]);

  return (
    <div style={{ marginTop: "2rem" }}>
      {blogs && (
        <div className="searchbox">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setSearchContent(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
      <div className="blogs-layout">
        {/* Cac blog */}
        <div className="blogs">
          {blogs
            ? blogs.map((blog, index) => (
                <BlogCard key={index} data={blog} refetch={filterDeleted} />
              ))
            : "Loading"}
        </div>
      </div>
      {/* Component phan trang */}
      {blogs && <Pagination currentPage={{ page, setPage }} pages={pages} />}
    </div>
  );
};

export default Blog;
