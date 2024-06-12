import axios from "axios";
import React, { useState, useEffect } from "react";
import "../user/css/infor_modal.css";

function Modal({ setOpenModal }) {
  const [infor, setInfor] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const updatedInfor = [...infor];

  useEffect(() => {
    const fetchInfor = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7070/teddy-store/getDataAccWithId/${userProfile.id}`
        );
        console.log(result.data);
        setInfor(result.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };
    fetchInfor();
  }, [userProfile.id]);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };
  
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        const fileName = file.name; // Lấy tên của file
        console.log("Avatar đã thay đổi:", fileName);
  
        // Cập nhật tên avatar trong thông tin infor dựa trên chỉ số (index)
        setInfor(prevInfor => {
          const updatedInfor = [...prevInfor];
          updatedInfor[index] = {
            ...updatedInfor[index],
            avatar: fileName
          };
          return updatedInfor;
        });
      };
      reader.readAsDataURL(file);
    }
  };
  

 
  const handleNameChange = (index, value) => { 
    updatedInfor[index].name = value;
    setInfor(updatedInfor);
    console.log("Tên đã thay đổi:", updatedInfor);
}; 
const handlephoneChange = (index, value) => {
  // const updatedInfor = [...infor];
  updatedInfor[index].phone = value;
  setInfor(updatedInfor);
  console.log("Tên đã thay đổi:", updatedInfor);
}; 
const handleEmailChange = (index, value) => {
  // const updatedInfor = [...infor];
  updatedInfor[index].email = value;
  setInfor(updatedInfor);
  console.log("Tên đã thay đổi:", updatedInfor);
}; 
const handlebirthdayChange = (index, value) => {
  // const updatedInfor = [...infor];
  updatedInfor[index].birthday = value;
  setInfor(updatedInfor);
  console.log("Tên đã thay đổi:", updatedInfor);
}; 
console.log("inforUpdate" , updatedInfor);



  const handleChangeGender = (index, selectedMethod) => {
    const updatedInfor = [...infor]; // Tạo một bản sao của mảng infor
    updatedInfor[index].gender = selectedMethod; // Cập nhật giới tính cho phần tử cụ thể
    setInfor(updatedInfor); // Cập nhật state mới
    console.log("Giới tính đã thay đổi:", selectedMethod);
  };

  const handleSave = () => {
    console.log("Thông tin đã thay đổi:", infor);
    // Thêm logic lưu thông tin vào database ở đây nếu cần
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer" style={{ height: "750px", overflowY: "auto" }}>
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className="body">
          {infor.map((acc, index) => (
            <React.Fragment key={index}>
              <form className="row mx-5">
                <h5 className="text_brown fw-bold">Hồ sơ cá nhân</h5>
                <div>
                  <img
                    src={selectedImage || `/img_pro/${acc.avatar}`}
                    alt="Upload"
                    className="rounded-circle mx-auto text-light d-block mt-4 bg-img"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    onClick={handleImageClick}
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }} 
                    onChange={(e) => handleFileChange(index, e)}
                  />
                  <button className="btn"></button>
                </div>
                <div className="text-center text_brown mb-4">Ảnh đại diện</div>
                <div className="row">
                  <label className="col-sm-3 text-end text_brown mt-3 fw-bold">Họ và tên</label>
                  <div className="col-sm-9">
                  <input
                        type="text"
                        className="form-input"
                        value={acc.name }
                        onChange={(e) => handleNameChange(index, e.target.value)}
                    />
                  </div>
                </div>
                <div className="row my-4 text_brown">
                  <label className="col-sm-3 text-end mt-3 fw-bold">Số điện thoại</label>
                  <div className="col-sm-9">
                  <input
                        type="text"
                        className="form-input"
                        value={acc.phone }
                        onChange={(e) => handlephoneChange(index, e.target.value)}
                    />
                  </div>
                </div>
                <div className="row text_brown">
                  <label className="col-sm-3 text-end mt-3 fw-bold">Email</label>
                  <div className="col-sm-9">
                  <input
                        type="text"
                        className="form-input"
                        value={acc.email || ""}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                    />
                  </div>
                </div>
                <div className="row my-4 text_brown">
                  <label className="col-sm-3 mt-3 text-end fw-bold">Ngày sinh</label>
                  <div className="col-sm-9">
                  <input
                        type="text"
                        className="form-input"
                        value={acc.birthday || ""}
                        onChange={(e) => handlebirthdayChange(index, e.target.value)}
                    />
                  </div>
                </div>
                <div className="row text_brown">
                  <div className="col-sm-3 text-end fw-bold">Giới tính</div>
                  <div className="col-sm-9">
                    <div className="ms-5 d-flex">
                      <label className="form-check">
                        <input
                         id="true"
                         type="radio"
                         value="true"
                         checked={acc.gender === true}
                         name={`gender_${index}`} // Sử dụng chỉ mục của mảng infor để tạo tên duy nhất cho radio button
                         onChange={() => handleChangeGender(index, "true")} // Truyền chỉ mục và giá trị giới tính vào hàm handleChangeGender
                        />
                        Nam
                        <span className="checkmark" />
                      </label>
                      <label className="form-check ms-5">
                        Nữ
                        <input
                           id="false"
                           type="radio"
                           name={`gender_${index}`}
                           value="false"
                           checked={acc.gender === false}
                           onChange={() => handleChangeGender(index, "false")}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </React.Fragment>
          ))}
        </div>
        <div className="footer_model mt-3">
          <button className="btn text-light dark_brown px-4" onClick={handleSave}>Lưu</button>
          <button className="btn text-light dark_brown px-4" onClick={() => setOpenModal(false)} id="cancelBtn">Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
