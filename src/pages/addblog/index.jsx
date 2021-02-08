import React, { memo, useRef, useState, useEffect } from "react";
import { Button, Input, Form, message, Collapse, Select, Result } from "antd";
//redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getBlogTypeAction,
  getAreaAction,
  getBlogDetailAction,
} from "../store/actionCreators";
import { useHistory, useParams } from "react-router-dom";
import { AddBlogWrap } from "./style";
import ImgUpload from "@c/imgupload";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { addBlog,editBlog } from "@/service/blog";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
const { Panel } = Collapse;
const { Option } = Select;

export default memo(function AddBlog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //在完成时显示完成组件
  const [result, setResult] = useState(false);
  const [resultData, setResultData] = useState("");
  //上传图片后的地址
  const [retImg, setRetImg] = useState("");
  const history = useHistory();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const mdRef = useRef(null);
  //俩下拉框
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
  //编辑时的填充数据
  useEffect(() => {
    dispatch(getBlogDetailAction(id));
    return () => {
      //组件卸载时，清除掉详情数据
      dispatch(getBlogDetailAction("new"));
    };
  }, [id, dispatch]);
  const { blogDetail } = useSelector(
    (state) => ({
      blogDetail: state.getIn(["page", "blogDetail"]),
    }),
    shallowEqual
  );
  const [formData] = Form.useForm();
  //当有id时默认先加载下拉框
  useEffect(() => {
    if (id !== "new") {
      blogType.rows || dispatch(getBlogTypeAction());
      area.rows || dispatch(getAreaAction());
    }
  }, [id, blogType, area, dispatch]);
  //当有id时填充数据
  useEffect(() => {
    if (blogDetail.id) {
      formData.setFieldsValue(blogDetail);
      setRetImg(blogDetail.showimg);
      mdRef.current.setText(blogDetail.content);
    }
  }, [blogDetail, formData]);

  //提交操作
  const onFinish = (values) => {
    const mdVal = mdRef.current.getMdValue();
    const showimg = retImg;
    if (!(mdVal && showimg)) {
      message.error("数据不完整");
      return
    }
    if (id === "new") {
      const blog = {
        content: mdVal,
        showimg,
        read: 1,
        good: 0,
        location: "",
        ...values,
      };
      //直接axios
      addBlog(blog).then((res) => {
        message.success("发布成功🎉");
        setResult(true);
        setResultData(res);
      });
    } else {
      const blog = {
        content: mdVal,
        showimg,
        ...values,
      };
      //直接axios
      editBlog(id,blog).then((res) => {
        message.success("修改成功🎉");
        setResult(true);
        setResultData(res);
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("请填写完整数据!");
  };

  return (
    <AddBlogWrap>
      {!result ? (
        <Form
          name="basic"
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={formData}
          initialValues={blogDetail}
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
              {/* {TableInputItem("标题", "title", selectData, true)} */}
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
                  originalImg={retImg && retImg}
                  callBack={(ret) => {
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
              如果需要查看请{" "}
              <a href={resultData} target="blank">
                点击这里🎯
              </a>
            </div>
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={(e) => {
                setResult(false);
              }}
            >
              再写一篇
            </Button>,
            <Button
              key="buy"
              onClick={(e) => {
                history.push("/editBlog");
              }}
            >
              查看列表
            </Button>,
          ]}
        />
      )}
    </AddBlogWrap>
  );
});
