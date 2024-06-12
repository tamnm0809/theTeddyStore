import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import bannerAPI from "../api/bannerAPI";

const PanelManagementBanner = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const result = await bannerAPI.getBanners();
      setFileList(result || []);
    };
    fetchBanner();
  }, []);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  const handleUploadBanner = async ({ file }) => {
    const base64String = await fileToBase64(file);
    const result = await bannerAPI.addBanner({ url: base64String });
    setFileList((prev) => [...prev, result]);
  };

  const handleDeleteBanner = async (data) => {
    const result = await bannerAPI.deleteBanner(data?.id || "");
    if (result) {
      setFileList((prev) => prev.filter((item) => item.id !== data.id));
    }
  };

  return (
    <div>
      <h4 className="text-color">Quản lý banner</h4>
      <div className="mt-4">
        <ImgCrop aspect={3 / 1} rotationSlider>
          <Upload
            customRequest={handleUploadBanner}
            listType="picture-card"
            fileList={fileList}
            onPreview={onPreview}
            onRemove={handleDeleteBanner}>
            {"+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default PanelManagementBanner;
