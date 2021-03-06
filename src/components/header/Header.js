import React, { useState, useEffect, useCallback } from "react";
import { client} from "../../client";
import HeaderLinks from "./HeaderLinks";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  const [logo, setLogo] = useState([]);
  const [headerLink, setHeaderLink] = useState([]);
 
  // cleanLogoData
  const cleanUpLogoData = useCallback((rawData) => {
    const cleanLogo = rawData.map((logoData) => {
      const { sys, fields } = logoData;
      const { id } = sys;
      const logoUrl = fields.logoUrl;
      const logo = fields.image.fields.file.url;
      return { id, logoUrl, logo };
    });
    setLogo(cleanLogo);
  }, []);
 
  // getLogo from contentful
  const getLogo = useCallback(async () => {
    try {
      const response = await client.getEntries({ content_type: "logo" });
      const responseData = response.items;
      if (responseData) {
        cleanUpLogoData(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpLogoData]);

  // cleanHeaderLinksData
  const cleanUpHeaderLinksData = useCallback((headerLinksRawData) => {
    const cleanHeaderLinksData = headerLinksRawData.map((headerLinkdata) => {
      const { sys, fields } = headerLinkdata;
      const { id } = sys;
      const { title, titleUrl } = fields;
      return { id, title, titleUrl };
    });
    setHeaderLink(cleanHeaderLinksData);
  }, []);
 
  // getHeaderLinks from Contentful
  const getHeaderLinks = useCallback(async () => {
    try {
      const responseLinks = await client.getEntries({
        content_type: "headerLinks",
      });
      const responseLinksData = responseLinks.items;
      if (responseLinksData) {
        cleanUpHeaderLinksData(responseLinksData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpHeaderLinksData]);

  useEffect(() => {
    getLogo();
    getHeaderLinks();
  }, [getLogo, getHeaderLinks]);

  return (
    <header>
      <div className="container">
        <div className="row align-items-center">
          {logo.map((item) => (
            <HeaderLogo key={item.id} item={item} />
          ))}
          <div className="col-8">
            <div className="nav">
              <ul>
                {headerLink
                  .slice(0)
                  .reverse()
                  .map((links) => (
                    <HeaderLinks key={links.id} links={links} />
                  ))}
              </ul>
            </div>
            {/* Menu btn */}
            <div className="menu__btn">
              <a href="/">
                <span>Menu</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
