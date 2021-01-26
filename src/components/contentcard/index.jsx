import React, { memo,Suspense } from "react";
import { renderRoutes } from "react-router-config";
import { router } from "@/router";
import { Card ,Spin } from 'antd';
import { ContentCardWrap } from "./style";

export default memo(function ContentCard(props) {
  return (
    <ContentCardWrap>
      <Card className="mainCard" bordered={false}>
          <Suspense fallback={<Spin />}>
            {renderRoutes(router)}
          </Suspense>
      </Card>
    </ContentCardWrap>
  );
});
