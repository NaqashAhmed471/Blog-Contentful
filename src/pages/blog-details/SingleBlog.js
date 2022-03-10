import React from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const SingleBlog = ({ blogDetail }) => {
  const {
    author,
    category,
    commints,
    date,
    modelLink,
    description,
    type,
    blogContentImage,
  } = blogDetail;
  return (
    <div className="content">
      <section className="blog__detail__content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
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
                      <Link to={`${modelLink}`}>{type}</Link>
                    </li>
                    <li>{commints}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlog;
