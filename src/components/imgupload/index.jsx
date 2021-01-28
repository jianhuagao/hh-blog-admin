import React, { memo, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImg } from "@/service/upload";
import { ImgUploadWrap } from "./style";

export default memo(function ImgUpload(props) {
  const [loading, setLoading] = useState(false);
  const { url,selectData,setSelectData } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadEvent =async (data) => {
    setLoading(true);
    uploadImg(data).then((ret)=>{
      setSelectData({...selectData,logo_img:ret})
      setLoading(false);
    })
    
  };
  return (
    <ImgUploadWrap>
      <ImgCrop rotate>
        <Upload
          listType="picture-card"
          showUploadList={false}
          customRequest={(data) => {
            uploadEvent(data);
          }}
        >
          {url ? (
            <img src={url} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </ImgUploadWrap>
  );
});
