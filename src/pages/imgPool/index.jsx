import React, { memo, useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Image,
  Pagination,
  message,
  Popconfirm,
  Typography,
  PageHeader,
  Button,
  Modal,
  Statistic
} from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, FileImageOutlined ,PieChartOutlined} from "@ant-design/icons";
import ImgUpload from "@c/imgupload";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getImgPoolAction, delImgPoolAction } from "@p/store/actionCreators";
import { ImgPoolWrap } from "./style";

export default memo(function ImgPool(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { imgPool } = useSelector(
    (state) => ({
      imgPool: state.getIn(["page", "imgPool"]),
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(getImgPoolAction(page, pageSize));
  }, [dispatch, page, pageSize]);

  async function delImg(id) {
    await dispatch(delImgPoolAction(id, page, pageSize));
    message.success(`删除成功🎉`);
  }
  return (
    <ImgPoolWrap>
      <PageHeader
        tags={
          <div>
            <Statistic
              title="图片总数"
              value={imgPool && imgPool.count}
              prefix={<FileImageOutlined />}
            />
            <Statistic
              title="图片占用"
              value={imgPool && imgPool.countSize}
              prefix={<PieChartOutlined />}
              suffix="kb"
            />
          </div>
        }
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            新增
          </Button>,
        ]}
      />
      <Row gutter={[16, 10]}>
        {imgPool.rows &&
          imgPool.rows.map((item, index) => {
            return (
              <Col xs={12} sm={8} md={6} lg={6} xl={6} key={index}>
                <Card
                  style={{ textAlign: "center" }}
                  actions={[
                    <Popconfirm
                      title="此操作将会从服务器删除图片资源,是否继续?"
                      onConfirm={() => {
                        delImg(item.fileName);
                      }}
                      onCancel={() => {
                        message.success("取消删除!");
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined />
                    </Popconfirm>,
                    <Typography.Paragraph
                      copyable={{ text: item.url }}
                    ></Typography.Paragraph>,
                  ]}
                >
                  <div style={{ height: "100px" }}>
                    <Image src={item.url} width={80} />
                  </div>
                  <Card.Meta
                    description={`${dayjs(item.time).format(
                      "YY-MM-DD HH:mm"
                    )}  ${item.size}kb`}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
      <Pagination
        defaultCurrent={page}
        pageSize={pageSize}
        total={imgPool.count}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
      <Modal
        title="上传图片"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <ImgUpload
          callBack={async () =>  {
            message.success("上传成功!🎉");
            setIsModalVisible(false);
            await dispatch(getImgPoolAction(page, pageSize));
          }}
        />
      </Modal>
    </ImgPoolWrap>
  );
});
