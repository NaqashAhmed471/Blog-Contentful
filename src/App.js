import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import BlogDetails from "./pages/blog-details/BlogDetails";
import EcommerceBlogs from "./pages/ecommerce-blogs/EcommerceBlogs";
import Home from "./pages/home/Home";
import NewsBlogs from "./pages/news-blogs/NewsBlogs";
import PodcastingBlogs from "./pages/podcasting-blogs/PodcastingBlogs";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsBlogs />} />
        <Route path="/e-commerce" element={<EcommerceBlogs />} />
        <Route path="/podcasting" element={<PodcastingBlogs />} />
        <Route path="/blog-detail/:id" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
