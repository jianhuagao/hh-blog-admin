import React, { memo } from "react";
import { DashboardWrap } from "./style";

export default memo(function Dashboard(props) {
  return (
    <DashboardWrap>
      <h1>Dashboard</h1>
    </DashboardWrap>
  );
});
