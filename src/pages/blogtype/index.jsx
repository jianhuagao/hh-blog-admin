import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Drawer,
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  PageHeader,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getBlogTypeAction,
  editBlogTypeAction,
  delBlogTypeAction,
  addBlogTypeAction,
} from "../store/actionCreators";
import ImgUpload from "@c/imgupload";
import { BlogTypeWrap } from "./style";
const { Column } = Table;

export default memo(function BlogType() {
  //hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectData, setSelectData] = useState({});
  const [visible, setVisible] = useState(false);
  const [addFunc, setAddFunc] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogTypeAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { blogType } = useSelector(
    (state) => ({
      blogType: state.getIn(["page", "blogType"]),
    }),
    shallowEqual
  );

  const { count, rows } = blogType;

  const EditData = async (data) => {
    const reData = {
      ...data,
      udate: undefined,
      cdate: undefined,
      del: undefined,
    };
    await dispatch(editBlogTypeAction(data.id, reData, page, pageSize));
    message.success(`修改成功`);
    setVisible(false);
  };
  const AddData = async (data) => {
    await dispatch(addBlogTypeAction(data, page, pageSize));
    message.success(`添加成功`);
    setVisible(false);
  };
  const DelData = async (id) => {
    await dispatch(delBlogTypeAction(id, page, pageSize));
    message.success(`删除成功`);
  };
  const TableInputItem = (label, objKey, value) => {
    return (
      <Form.Item label={label}>
        <Input
          placeholder={label}
          value={value[objKey]}
          onChange={(e) => {
            setSelectData({
              ...selectData,
              [objKey]: e.target.value,
            });
          }}
        />
      </Form.Item>
    );
  };

  const updateStatus = async (status, id) => {
    await dispatch(
      editBlogTypeAction(id, { status: status === 1 ? 0 : 1 }, page, pageSize)
    );
    message.success(`更改状态成功`);
  };
  return (
    <BlogTypeWrap>
      <PageHeader
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setSelectData({});
              setVisible(true);
              setAddFunc(true);
            }}
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
        <Column title="描述" dataIndex="name" align="center" />
        <Column
          title="Logo"
          dataIndex="logo_img"
          responsive={["md"]}
          align="center"
          render={(logo_img) => {
            return (
              <img src={logo_img} alt="avatar" style={{ width: "50px" }} />
            );
          }}
        />
        <Column
          title="version"
          dataIndex="version"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="开源协议"
          dataIndex="protocol"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="平台"
          dataIndex="system"
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
                onClick={() => {
                  setVisible(true);
                  setAddFunc(false);
                  setSelectData(record);
                }}
              >
                详细
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
      <Drawer
        width={(() => {
          return window.innerWidth < 620 ? "100%" : "30%";
        })()}
        title={addFunc ? "新增数据" : "编辑数据"}
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        <Form layout="vertical" hideRequiredMark>
          {TableInputItem("类型描述", "name", selectData)}
          <Form.Item label="LOGO">
            <ImgUpload
              dataIndex="logo_img"
              // url={selectData.logo_img}
              tailor={true}
              selectData={selectData}
              setSelectData={setSelectData}
            />
          </Form.Item>
          {TableInputItem("页面路径", "page_url", selectData)}
          {TableInputItem("描述", "introduction", selectData)}
          {TableInputItem("文档路径", "api_url", selectData)}
          {TableInputItem("官网地址", "website", selectData)}
          {TableInputItem("作者", "inventor", selectData)}
          {TableInputItem("协议", "protocol", selectData)}
          {TableInputItem("版本", "version", selectData)}
          {TableInputItem("下载", "download", selectData)}
          {TableInputItem("平台", "system", selectData)}
        </Form>
        <Button
          type="primary"
          onClick={() => {
            addFunc ? AddData(selectData) : EditData(selectData);
          }}
        >
          {addFunc ? "新增" : "修改"}
        </Button>
      </Drawer>
    </BlogTypeWrap>
  );
});
