import React, { useState, useEffect, useCallback } from "react";
import { contentModel } from "../../client";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState([]);
  const { id } = useParams();

  //   cleanBlogData
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
    setBlogDetail(cleanBlogContentData);
  }, []);

  //   getSingleBlogData from contentful
  const getBlogContent = useCallback(async () => {
    try {
      const response = await contentModel.getEntries({
        content_type: "blogModel",
        "sys.id": id,
      });
      const blogContentResponse = response.items;
      if (blogContentResponse) {
        cleanUpBlogContentData(blogContentResponse);
      } else {
        setBlogDetail([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpBlogContentData, id]);

  useEffect(() => {
    getBlogContent();
  }, [getBlogContent]);

  return (
    <>
      <div className="banner">
        <div className="container">
          {blogDetail.map((details) => {
            const { modelTitle } = details;
            return (
              <>
                <h2 key={details.id}>{modelTitle}</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {id}
                    </li>
                  </ol>
                </nav>
              </>
            );
          })}
        </div>
      </div>
      <div className="content">
        <section className="blog__detail__content">
          <div className="container">
            <div className="row">
              {blogDetail.map((details) => {
                const {
                  author,
                  category,
                  commints,
                  date,
                  modelLink,
                  description,
                  blogContentImage,
                } = details;
                return (
                  <div className="col-lg-10" key={details.id}>
                    <div className="blog__detail__card">
                      <div className="blog__img">
                        <img src={blogContentImage} alt="" />
                      </div>
                      <div className="blog__card__body">
                        <div>{documentToReactComponents(description)}</div>

                        <ul className="post-infos clearfix">
                          <li>{date}</li>
                          <li>{author}</li>
                          <li>
                            {category}
                            <a href="/">{modelLink}</a>
                          </li>
                          <li>{commints}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetails;
