import React, { memo ,useEffect} from "react";
import {Table,Tag} from "antd"
import {useDispatch,useSelector,shallowEqual} from "react-redux"
import {getBlogTypeAction} from "../store/actionCreators"
import { BlogTypeWrap } from "./style";
const { Column } = Table;
export default memo(function BlogType(props) {
  const dispatch = useDispatch();
  const {blogType} = useSelector(state=>({
    blogType:state.getIn(['page','blogType'])
  }),shallowEqual)

  useEffect(()=>{
    dispatch(getBlogTypeAction())
  },[dispatch])

  return (
    <BlogTypeWrap>
      <Table dataSource={blogType}  rowKey="id" size="middle" >
        <Column title="id" dataIndex="id"/>
        <Column title="name" dataIndex="name"/>
        <Column title="Logo" dataIndex="logo_img"/>
        <Column title="status" dataIndex="status"
          render={status => (
             <Tag color={status===1?"green":"red"}>
               {status===1?"启用":"禁用"}
             </Tag>
          )}
        />
      </Table>
    </BlogTypeWrap>
  );
});
