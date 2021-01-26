import React, { memo } from "react";
import { WebsiteWrap } from "./style";

export default memo(function Website(props) {
  return (
    <WebsiteWrap>
      <h1>Website</h1>
    </WebsiteWrap>
  );
});
