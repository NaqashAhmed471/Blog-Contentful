import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import BlogDetails from "./pages/blog-details/BlogDetails";
import Home from "./pages/home/Home";
import NewsBlogs from "./pages/news-blogs/NewsBlogs";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsBlogs />} />
        <Route path="/blog-detail/:id" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
