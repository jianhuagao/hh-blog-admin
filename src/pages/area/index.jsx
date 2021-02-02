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
  getAreaAction,
  editAreaAction,
  delAreaAction,
  addAreaAction,
} from "../store/actionCreators";
import ImgUpload from "@c/imgupload";
import { AreaWrap } from "./style";
const { Column } = Table;

export default memo(function Area(props) {
  //hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectData, setSelectData] = useState({});
  const [visible, setVisible] = useState(false);
  const [addFunc, setAddFunc] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAreaAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { area } = useSelector(
    (state) => ({
      area: state.getIn(["page", "area"]),
    }),
    shallowEqual
  );

  const { count, rows } = area;

  const EditData = async (data) => {
    const reData = {
      ...data,
      udate: undefined,
      cdate: undefined,
      del: undefined,
    };
    await dispatch(editAreaAction(data.id, reData, page, pageSize));
    message.success(`修改成功`);
    setVisible(false);
  };
  const AddData = async (data) => {
    await dispatch(addAreaAction(data, page, pageSize));
    message.success(`添加成功`);
    setVisible(false);
  };
  const DelData = async (id) => {
    await dispatch(delAreaAction(id, page, pageSize));
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
      editAreaAction(id, { status: status === 1 ? 0 : 1 }, page, pageSize)
    );
    message.success(`更改状态成功`);
  };
  return (
    <AreaWrap>
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
        loading={!rows}
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
        <Column title="板块名称" dataIndex="title" align="center" />
        <Column
          title="配图"
          dataIndex="img"
          responsive={["md"]}
          align="center"
          render={(img) => {
            return <img src={img} alt="avatar" style={{ width: "50px" }} />;
          }}
        />
        <Column
          title="副标题"
          dataIndex="second_title"
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
          {TableInputItem("板块名称", "title", selectData)}
          {TableInputItem("副标题", "second_title", selectData)}
          <Form.Item label="配图">
            <ImgUpload
              dataIndex="img"
              // url={selectData.img}
              selectData={selectData}
              setSelectData={setSelectData}
            />
          </Form.Item>
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
    </AreaWrap>
  );
});
