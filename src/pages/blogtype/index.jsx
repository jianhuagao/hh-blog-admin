import React, { memo, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Drawer,
  Button,
  Form,
  Col,
  Row,
  Input,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getBlogTypeAction } from "../store/actionCreators";
import { BlogTypeWrap } from "./style";
const { Column } = Table;

export default memo(function BlogType() {
  //hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectData, setSelectData] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogTypeAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  const { blogType } = useSelector(
    state => ({
      blogType: state.getIn(["page", "blogType"]),
    }),
    shallowEqual
  );
  const { count, rows } = blogType;

  return (
    <BlogTypeWrap>
      <Table
        dataSource={rows}
        rowKey="id"
        size="middle"
        loading={!blogType}
        bordered
        pagination={{
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          total: count,
        }}
      >
        <Column title="id" dataIndex="id" />
        <Column title="描述" dataIndex="name" />
        <Column title="Logo" dataIndex="logo_img" responsive={["md"]} />
        <Column title="version" dataIndex="version" responsive={["md"]} />
        <Column title="开源协议" dataIndex="protocol" responsive={["md"]} />
        <Column title="运行环境" dataIndex="system" responsive={["md"]} />
        <Column
          title="状态"
          dataIndex="status"
          render={(status) => (
            <Tag color={status === 1 ? "green" : "red"}>
              {status === 1 ? "启用" : "禁用"}
            </Tag>
          )}
        />
        <Column
          title="修改时间"
          dataIndex="udate"
          render={(udate) => {
            return dayjs(udate).format("YYYY-MM-DD HH:mm");
          }}
          responsive={["md"]}
        />
        <Column
          title="创建时间"
          dataIndex="cdate"
          render={(cdate) => {
            return dayjs(cdate).format("YYYY-MM-DD HH:mm");
          }}
          responsive={["md"]}
        />
        <Column
          title="操作"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setVisible(true);
                  setSelectData(record);
                }}
              >
                详细
              </Button>
              <Button type="link" size="small">
                删除
              </Button>
              {/* <a href={record.id}></a> */}
            </Space>
          )}
        />
      </Table>
      <Drawer
        width="auto"
        title="数据详情"
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        <Form layout="vertical" hideRequiredMark>
          {Object.keys(selectData).map((item) => {
            return (
              item === "cdate" ||
              item === "udate" ||
              item === "del" ||
              item === "status" ||
              item === "id" || (
                <Row gutter={16} key={item}>
                  <Col span={20}>
                    <Form.Item label={item}>
                      {item===""}
                      <Input
                        placeholder={item}
                        value={selectData[item]}
                        onChange={e=>{
                          setSelectData({ ...selectData,[item] : e.target.value })
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )
            );
          })}
        </Form>
        <Button type="primary" onClick={()=>{console.log(selectData)}}>修改</Button>
      </Drawer>
    </BlogTypeWrap>
  );
});
