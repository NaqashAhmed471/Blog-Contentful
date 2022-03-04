import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import BlogContent from "./BlogContent";

const Blogs = () => {
  const [blogContent, setBlogContent] = useState([]);

  // cleanBlogData
  const cleanUpBlogContentData = useCallback((blogContentRawData) => {
    const cleanBlogContentData = blogContentRawData.map((blogContentFields) => {
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
        blogContentImage,
      };
    });
    setBlogContent(cleanBlogContentData);
  }, []);

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
      {/* <!-- Blog End --> */}
    </div>
  );
};

export default Blogs;
