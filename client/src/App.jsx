import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRecipe from "./components/RecipePages/EditRecipe";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route exact path="/story/:slug/like" element={<PrivateRoute />}>
            <Route exact path="/story/:slug/like" element={<DetailStory />} />
          </Route> */}

          {/* <Route exact path="/story/:slug/edit" element={<PrivateRoute />} */}
          <Route exact path="/recipe/:id/edit" element={<EditRecipe />} />
          {/* </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
