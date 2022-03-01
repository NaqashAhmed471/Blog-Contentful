import React from "react";

const FooterContent = ({ footerItem }) => {
  const {
    footerTitle,
    copyRightTitle,
    footerYear,
    footerStrongTitle,
    footerText,
  } = footerItem;
  return (
    <>
      <div className="col-sm-5">
        <p>
          <strong>{footerTitle}</strong>
        </p>
      </div>
      <div className="col-sm-7 text-sm-right">
        <p>
          {copyRightTitle} &copy; {footerYear}{" "}
          <strong>{footerStrongTitle}</strong> | {footerText}
        </p>
      </div>
    </>
  );
};

export default FooterContent;
