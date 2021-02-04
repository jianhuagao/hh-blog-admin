import React, { memo, useRef, useState } from "react";
import { Button, Input, Form, message, Collapse, Select,Result } from "antd";
//redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getBlogTypeAction, getAreaAction } from "../store/actionCreators";
import { useHistory } from "react-router-dom";
import { AddBlogWrap } from "./style";
import ImgUpload from "@c/imgupload";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { addBlog } from "@/service/blog";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
const { Panel } = Collapse;
const { Option } = Select;
export default memo(function AddBlog(props) {
  const [result, setResult] = useState(false);
  const [resultData, setResultData] = useState("");
  const [retImg, setRetImg] = useState("");
  const history = useHistory();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdRef = useRef(null);
  const dispatch = useDispatch();
  const { blogType } = useSelector(
    (state) => ({
      blogType: state.getIn(["page", "blogType"]),
    }),
    shallowEqual
  );
  const { area } = useSelector(
    (state) => ({
      area: state.getIn(["page", "area"]),
    }),
    shallowEqual
  );

  const onFinish = (values) => {
    const mdVal = mdRef.current.getMdValue();
    const showimg = retImg;
    if (!(mdVal && showimg)) {
      message.error("数据不完整");
    }
    const blog = {
      content: mdVal,
      showimg,
      read: 1,
      good: 0,
      location: "",
      ...values,
    };
    addBlog(blog).then((res) => {
      message.success("发布成功🎉");
      setResult(true);
      setResultData(res)
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <AddBlogWrap>
      {!result ? (
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Collapse defaultActiveKey={["1"]} ghost>
            <Panel header="资讯详情" key="1">
              <Form.Item
                label="标题"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "标题不能为空!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="概述"
                name="resume"
                rules={[
                  {
                    required: true,
                    message: "概述不能为空!",
                  },
                ]}
              >
                <Input.TextArea rows={7} />
              </Form.Item>
              <Form.Item label="首页图">
                <ImgUpload
                  callBack={(ret) => {
                    // message.success(ret)
                    setRetImg(ret);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="类型"
                name="type"
                rules={[{ required: true, message: "请选择你的类型!" }]}
              >
                <Select
                  placeholder="资讯类型"
                  style={{ maxWidth: 300 }}
                  onClick={() => {
                    blogType.rows || dispatch(getBlogTypeAction());
                  }}
                >
                  {blogType.rows &&
                    blogType.rows.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="板块"
                name="area"
                rules={[{ required: true, message: "请选择你的板块!" }]}
              >
                <Select
                  placeholder="资讯板块"
                  style={{ maxWidth: 300 }}
                  onClick={() => {
                    area.rows || dispatch(getAreaAction());
                  }}
                >
                  {area.rows &&
                    area.rows.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.title}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>

              <Form.Item
                label="作者"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "作者不能为空!",
                  },
                ]}
              >
                <Input style={{ maxWidth: 300 }} />
              </Form.Item>

              <Form.Item label="来源" name="source">
                <Input style={{ maxWidth: 300 }} />
              </Form.Item>

              <Form.Item label="备注" name="remark">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Panel>
          </Collapse>
          <MdEditor
            ref={mdRef}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
          />
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title="成功发布你的资讯!"
          subTitle={
            <div>
              如果需要查看请 <a href={resultData} target="blank">点击这里🎯</a>
            </div>
          }
          extra={[
            <Button type="primary" key="console" onClick={e=>{setResult(false);}}>
              再写一篇
            </Button>,
            <Button key="buy"  onClick={e=>{history.push("/editBlog");}}>查看列表</Button>,
          ]}
        />
      )}
    </AddBlogWrap>
  );
});
