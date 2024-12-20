import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Blog } from "../components/blog";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, dispatch } = useAuthContext();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_MAIN_API_URL}/auth/dashboard`,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      const res = await response.json();
      if (!response.ok) {
        window.alert("token expired");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
      if (response.ok) {
        const { name, email, avatar } = res;
        setAvatar(avatar);
        setEmail(email);
        setName(name);
      }
    };
    if (user) {
      loadData();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [user]);

  const { deleteUser, deletePending, deleteError } = useDeleteUser();

  const handleClick = async (e) => {
    e.preventDefault();
    await deleteUser(password);
    setPassword("");
  };

  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className="dashboard">
        <div className="blogContainer">
          <Blog filterByUser />
        </div>
        <div className="info">
          <h3>User Information</h3>

          <div className="userInfo">
            <p>Your avatar</p>
            <img
              id="avatar"
              width="100px"
              height="100px"
              alt="This is the avatar of user"
              src={avatar ?? "/userpicture.jpeg"}
              onError={(e) => (e.target.src = "/userpicture.jpeg")}
            />

            <p className="avatarStatus"></p>

            <p>Your Name: {name}</p>

            <p>Your email: {email}</p>

            <Link to="/auth/dashboard/updateuser">Change Information</Link>
            <Popup
              trigger={<button> Delete User </button>}
              position="bottom center"
            >
              <label>
                {" "}
                Password :
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              <button disabled={deletePending} onClick={handleClick}>
                Confirm Password
              </button>
              <p>{deleteError}</p>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
