import React, { memo } from "react";
import { UserInfoWrap } from "./style";

export default memo(function UserInfo(props) {
  return (
    <UserInfoWrap>
      <h1>Admin</h1>
    </UserInfoWrap>
  );
});
