import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  message,
  Popconfirm,
  PageHeader,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getBlogAction,
  editBlogAction,
  delBlogAction,
} from "../store/actionCreators";
import { useHistory } from "react-router-dom";
import { EditblogWrap } from "./style";
const { Column } = Table;

export default memo(function Editblog(props) {
  //hooks
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { blog } = useSelector(
    (state) => ({
      blog: state.getIn(["page", "blog"]),
    }),
    shallowEqual
  );

  const { count, rows } = blog;

  const DelData = async (id) => {
    await dispatch(delBlogAction(id, page, pageSize));
    message.success(`删除成功`);
  };
  const updateStatus = async (status, id) => {
    await dispatch(
      editBlogAction(id, { status: status === 1 ? 0 : 1 }, page, pageSize)
    );
    message.success(`更改状态成功`);
  };
  return (
    <EditblogWrap>
      <PageHeader
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={e=>{history.push("/addBlog/new")}}
          >
            新增
          </Button>,
        ]}
      />
      <Table
        dataSource={rows}
        rowKey="id"
        size="middle"
        bordered
        pagination={{
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          total: count,
        }}
      >
        <Column title="id" dataIndex="id" align="center" />
        <Column title="标题" dataIndex="title" align="center" />
        <Column
          title="配图"
          dataIndex="showimg"
          responsive={["md"]}
          align="center"
          render={(showimg) => {
            return <img src={showimg} alt="avatar" style={{ width: "50px" }} />;
          }}
        />
        <Column
          title="概要"
          dataIndex="resume"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="作者"
          dataIndex="author"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="状态"
          dataIndex="status"
          align="center"
          render={(status, render) => (
            <Tag
              onClick={(e) => {
                updateStatus(status, render.id);
              }}
              color={status === 1 ? "green" : "red"}
            >
              {status === 1 ? "启用" : "禁用"}
            </Tag>
          )}
        />
        <Column
          title="修改时间"
          dataIndex="udate"
          align="center"
          render={(udate) => {
            return dayjs(udate).format("YYYY-MM-DD HH:mm");
          }}
          responsive={["md"]}
        />
        <Column
          title="创建时间"
          dataIndex="cdate"
          align="center"
          render={(cdate) => {
            return dayjs(cdate).format("YYYY-MM-DD HH:mm");
          }}
          responsive={["md"]}
        />
        <Column
          title="操作"
          align="center"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="link"
                size="small"
                onClick={e=>{history.push(`/addBlog/${record.id}`)}}
              >
                编辑
              </Button>
              <Popconfirm
                title="是否删除数据?"
                onConfirm={() => {
                  DelData(record.id);
                }}
                onCancel={() => {
                  message.info("取消删除");
                }}
                okText="是"
                cancelText="否"
              >
                <Button type="link" size="small">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </EditblogWrap>
  );
});
