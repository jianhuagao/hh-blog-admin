import React, { memo } from "react";
import { PageHeader } from 'antd';
import { ContentHeadWrap } from "./style";

export default memo(function ContentHead(props) {
  return (
    <ContentHeadWrap>
      <PageHeader
          className="site-page-header"
          title="Title"
          //breadcrumb={{ routes }}
          subTitle="This is a subtitle"
      />
    </ContentHeadWrap>
  );
});
