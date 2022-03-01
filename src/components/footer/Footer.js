import React, { useState, useEffect, useCallback } from "react";
import { blogFooter } from "../../client";
import FooterContent from "./FooterContent";

const Footer = () => {
  const [footer, setFooter] = useState([]);

  // cleanFooterData
  const cleanUpFooterResponse = useCallback((footerRawData) => {
    const cleanFooterData = footerRawData.map((footerData) => {
      const { sys, fields } = footerData;
      const { id } = sys;
      const {
        footerTitle,
        copyRightTitle,
        footerYear,
        footerStrongTitle,
        footerText,
      } = fields;
      return {
        id,
        footerTitle,
        copyRightTitle,
        footerYear,
        footerStrongTitle,
        footerText,
      };
    });
    setFooter(cleanFooterData);
  }, []);

  // getFooterData from contentful
  const getFooterContent = useCallback(async () => {
    try {
      const response = await blogFooter.getEntries({
        content_type: "blogFooter",
      });
      const footerResponse = response.items;
      if (footerResponse) {
        cleanUpFooterResponse(footerResponse);
      } else {
        setFooter([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpFooterResponse]);

  useEffect(() => {
    getFooterContent();
  }, [getFooterContent]);

  return (
    <footer>
      <div className="container">
        <div className="row">
          {footer.map((footerItem) => (
            <FooterContent key={footerItem.id} footerItem={footerItem} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
