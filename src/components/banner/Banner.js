import React, { useState, useEffect, useCallback } from "react";
import { blogBanner } from "../../client"

const Banner = () => {
  const [banner, setBanner] = useState([]);
 
  // cleanBannerData
  const cleanUpBannerDate = useCallback((bannerRawData) => {
    const clearBannerData = bannerRawData.map((bannerData) => {
      const { sys, fields } = bannerData;
      const { id } = sys;
      const { bannerTitle } = fields;
      const bannerImage = fields.bannerImage.fields.file.url;
      return { id, bannerImage, bannerTitle };
    });
    setBanner(clearBannerData);
  }, []);
 
  // getBannerData from contentful
  const getBanner = useCallback(async () => {
    try {
      const response = await blogBanner.getEntries({
        content_type: "blogBanner",
      });
      const responseBannerData = response.items;
      if (responseBannerData) {
        cleanUpBannerDate(responseBannerData);
      } else {
        setBanner([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpBannerDate]);

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  return banner.map((bannerItem) => {
    const { id, bannerImage, bannerTitle } = bannerItem;
    return (
      <div
        className="banner"
        key={id}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="container">
          <h2>{bannerTitle}</h2>
        </div>
      </div>
    );
  });
};

export default Banner;