import React, { memo, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImg } from "@/service/upload";
import { ImgUploadWrap } from "./style";

export default memo(function ImgUpload(props) {
  const [loading, setLoading] = useState(false);
  const [retImg, setRetImg] = useState(null);
  const {
    originalImg,//原始图,在编辑时会将原来的图显示上去
    tailor = false,//是否需要裁减
    callBack,//回调函数,回传上传后的url
  } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadEvent = async (data) => {
    setLoading(true);
    uploadImg(data).then((ret) => {
      setRetImg(ret);
      callBack && callBack(ret);
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
            {originalImg ? (
              <img src={originalImg} alt="avatar" style={{ width: "100%" }} />
            ) : retImg ? (
              <img src={retImg} alt="avatar" style={{ width: "100%" }} />
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
          {originalImg ? (
            <img src={originalImg} alt="avatar" style={{ width: "100%" }} />
          ) : retImg ? (
            <img src={retImg} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      )}
    </ImgUploadWrap>
  );
});
