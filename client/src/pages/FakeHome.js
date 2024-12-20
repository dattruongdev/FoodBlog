
import { Blog } from "../components/blog"
import { useAuthContext } from '../hooks/useAuthContext'
import "../styles/home.style.css"
import { NavLink } from "react-router-dom"
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
  }, [])


  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="slogan">
        Unleash Your Inner Chef
      </div>

      <div className="home-description">
        <h1>Chef Tank</h1>
        <h3>Unleash your passion for food in a collaborative community of chefs, home cooks, and food enthusiasts. Share recipes, techniques, and tips to elevate your culinary skills.</h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ background: "#14C38E" }}>

          <NavLink to="/blogs/create-blog" style={({ isActive, isPending, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: "white",
              viewTransitionName: isTransitioning ? "slide" : "",

            };
          }}>Create Blog</NavLink>
        </button>

      </div>
      <Blog />
    </div>
  )
}

export default Home
