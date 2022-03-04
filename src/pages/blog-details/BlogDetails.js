import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import { useParams } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import SingleBlog from "./SingleBlog";

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState({});
  const { id } = useParams();

  //   cleanBlogData
  const cleanUpSingleBlogData = useCallback((singleBlogRawData) => {
    const { sys, fields } = singleBlogRawData;
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
    setBlogDetail({
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
    });
  }, []);

  //   getSingleBlogData from contentful
  const getSingleBlog = useCallback(async () => {
    try {
      const response = await client.getEntry(id);
      if (response) {
        cleanUpSingleBlogData(response);
      } else {
        setBlogDetail({});
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpSingleBlogData, id]);

  useEffect(() => {
    getSingleBlog();
  }, [getSingleBlog]);

  return (
    <>
      <Banner isReadMore  blogDetail={blogDetail} />
      <SingleBlog blogDetail={blogDetail} />
    </>
  );
};

export default BlogDetails;
