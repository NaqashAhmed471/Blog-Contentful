import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import BlogContent from "./BlogContent";

const Blogs = ({
  isFliterNewsBlog,
  isFliterEcommerceBlog,
  isFliterPodcastingBlog,
}) => {
  const [blogContent, setBlogContent] = useState([]);

  // cleanBlogData
  const cleanUpBlogContentData = useCallback(
    (blogContentRawData) => {
      const cleanBlogContentData = blogContentRawData.map(
        (blogContentFields) => {
          const { sys, fields } = blogContentFields;
          const { id } = sys;
          const {
            author,
            category,
            commints,
            date,
            modelLink,
            modelTitle,
            readMore,
            description,
            type,
          } = fields;
          const blogContentImage = fields.modelImage.fields.file.url;
          return {
            id,
            author,
            category,
            commints,
            date,
            modelLink,
            modelTitle,
            readMore,
            description,
            type,
            blogContentImage,
          };
        }
      );

      if (isFliterNewsBlog) {
        const filterNewsBlog = cleanBlogContentData.filter(
          (data) => data.type === "news"
        );
        setBlogContent(filterNewsBlog);
      } else if (isFliterEcommerceBlog) {
        const filterEcommerceBlog = cleanBlogContentData.filter(
          (data) => data.type === "e-commerce"
        );
        setBlogContent(filterEcommerceBlog);
      } else if (isFliterPodcastingBlog) {
        const filterPodcastingBlog = cleanBlogContentData.filter(
          (data) => data.type === "podcasting"
        );
        setBlogContent(filterPodcastingBlog);
      } else {
        setBlogContent(cleanBlogContentData);
      }
    },
    [isFliterNewsBlog, isFliterEcommerceBlog, isFliterPodcastingBlog]
  );

  // getBlogData from contentful
  const getBlogContent = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "blogModel",
      });
      const blogContentResponse = response.items;
      if (blogContentResponse) {
        cleanUpBlogContentData(blogContentResponse);
      } else {
        setBlogContent([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpBlogContentData]);

  useEffect(() => {
    getBlogContent();
  }, [getBlogContent]);

  return (
    <div className="content">
      <section className="blogs">
        <div className="container">
          <div className="row">
            {blogContent.map((content) => (
              <BlogContent key={content.id} content={content} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
