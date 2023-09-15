import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./views/pages/Home";
import BlogPage from "./views/pages/BlogPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
