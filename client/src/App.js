
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";

import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Home from "./pages/FakeHome";
import Dashboard from "./pages/Dashboard";
import UpdateUser from "./pages/UpdateUser";
import CreateBlog from "./components/createBlog/createBlog.js";
import BlogDetail from "./pages/BlogDetail.js";
import EditRecipe from "./components/RecipePages/EditRecipe";
import AuthorInfo from './pages/AuthorInfo.js'
import "./styles/footer.style.css"

function App() {
  const { user, dispatch } = useAuthContext();
  const revalidate = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/auth/dashboard', {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    })
    if (!response.ok) {
      window.alert('token expired')
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })

    }
    if (response.ok) {
      console.log('token accepted')
    }
  }

  useEffect(() => {
    revalidate()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        

        <div className="Pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/auth/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/auth/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/auth/dashboard/updateuser"
              element={user ? <UpdateUser /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/blogs/create-blog"
              element={user ? <CreateBlog /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/blogs/userinfo/:authorId"
              element={<AuthorInfo />}
            />

            <Route path="/blogs/:blogId" element={<BlogDetail />} />

            <Route exact path="/recipe/:id/edit" element={<EditRecipe />} />
          </Routes>
        </div>

        <div className="Footer">
          <div className="footer footer-logo"></div>
          <div className="footer footer-navigation">
            <h3>Navigation</h3>
            <a href="/">Home</a>
            <a href="/auth/login">Join now</a>

          </div>
          <div className="footer footer-contact">
            <h3>Contact</h3>
            <p>info@stackoverkill.vn</p>
            <p>instagram.com</p>

          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
