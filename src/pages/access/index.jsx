import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  PageHeader,
  Modal,
} from "antd";
import ReactJson from "react-json-view";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAccessAction, delAccessAction } from "../store/actionCreators";
import { AccessWrap } from "./style";
const { Column } = Table;
export default memo(function Access(props) {
  //hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectData, setSelectData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { access } = useSelector(
    (state) => ({
      access: state.getIn(["page", "access"]),
    }),
    shallowEqual
  );

  const { count, rows } = access;

  const DelData = async (id) => {
    await dispatch(delAccessAction(id, page, pageSize));
    message.success(`删除成功`);
  };
  return (
    <AccessWrap>
      <PageHeader />
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
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>设备信息：{record["user-agent"]}</p>
          ),
          rowExpandable: (record) => record.id !== "",
        }}
      >
        <Column title="id" dataIndex="id" responsive={["md"]} align="center" />
        <Column
          title="host"
          dataIndex="host"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="connection"
          dataIndex="connection"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="real ip"
          dataIndex="x-real-ip"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="origin"
          dataIndex="origin"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="响应码"
          dataIndex="resstatus"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="method"
          dataIndex="method"
          responsive={["md"]}
          align="center"
        />
        <Column
          title="访问时间"
          dataIndex="cdate"
          align="center"
          render={(cdate) => {
            return dayjs(cdate).format("YYYY-MM-DD HH:mm");
          }}
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
                  setIsModalVisible(true);
                  setSelectData(record);
                }}
              >
                源
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
      <Modal
        title="Basic"
        visible={isModalVisible}
        onOk={(e) => {
          setIsModalVisible(false);
        }}
        onCancel={(e) => {
          setIsModalVisible(false);
        }}
      >
        {selectData.remarks&&(<ReactJson src={JSON.parse(selectData.remarks)} />)} 
      </Modal>
    </AccessWrap>
  );
});
