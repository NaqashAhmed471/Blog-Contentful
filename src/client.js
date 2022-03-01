import * as contentful from "contentful";

export const blogLogo = contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

export const headerLinks = contentful.createClient({
  space: process.env.REACT_APP_HEADER_LINKS,
  accessToken: process.env.REACT_APP_HEADER_LINKS_TOKEN,
});

export const blogBanner = contentful.createClient({
  space: process.env.REACT_APP_SPACE_BANNER,
  accessToken: process.env.REACT_APP_BANNER_TOKEN,
});

export const contentModel = contentful.createClient({
  space: process.env.REACT_APP_SPACE_CONTENT_MODEL,
  accessToken: process.env.REACT_APP_CONTENT_MODEL_TOKEN,
});

export const blogFooter = contentful.createClient({
  space: process.env.REACT_APP_SPACE_FOOTER,
  accessToken: process.env.REACT_APP_FOOTER_TOKEN,
});
