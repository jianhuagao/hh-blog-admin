import React, { memo, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImg } from "@/service/upload";
import { ImgUploadWrap } from "./style";

export default memo(function ImgUpload(props) {
  const [loading, setLoading] = useState(false);
  const { dataIndex, selectData, setSelectData, tailor = false } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadEvent = async (data) => {
    setLoading(true);
    uploadImg(data).then((ret) => {
      setSelectData({ ...selectData, [dataIndex]: ret });
      setLoading(false);
    });
  };

  return (
    <ImgUploadWrap>
      {tailor ? (
        <ImgCrop
          modalTitle={"图片上传"}
          modalOk={"上传"}
          modalCancel={"取消"}
          rotate
        >
          <Upload
            listType="picture-card"
            showUploadList={false}
            customRequest={(data) => {
              uploadEvent(data);
            }}
          >
            {selectData[dataIndex] ? (
              <img
                src={selectData[dataIndex]}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          listType="picture-card"
          showUploadList={false}
          customRequest={(data) => {
            uploadEvent(data);
          }}
        >
          {selectData[dataIndex] ? (
            <img
              src={selectData[dataIndex]}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      )}
    </ImgUploadWrap>
  );
});
