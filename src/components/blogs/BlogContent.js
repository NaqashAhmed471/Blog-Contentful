import React from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const BlogContent = ({ content }) => {
  const {
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
  } = content;
  return (
    <div className="col-lg-6 blog__col">
      <div className="blog__card" key={id}>
        <div className="blog__img">
          <img src={blogContentImage} alt="" />
        </div>
        <div className="blog__card__body">
          <h3>{modelTitle}</h3>
          <ul className="post-infos clearfix">
            <li>{date}</li>
            <li>{author}</li>
            <li>
              {category}
              <Link to={modelLink}>{type}</Link>
            </li>
            <li>{commints}</li>
          </ul>
          <div>{documentToReactComponents(description)}</div>
        </div>
        <Link to={`/blog-detail/${id}`} className="read__more__btn">
          {readMore}
        </Link>
      </div>
    </div>
  );
};

export default BlogContent;
