import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalOpen = ({ show, handleModal, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");

  const uploadFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("selectedFile", selectedFile);

    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/file/file-upload`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onFileUpload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const hideCloseModal = () => {
    handleModal(!show);
  };

  return (
    <div>
      <Modal isOpen={show} toggle={show}>
        <ModalHeader charCode="Y" toggle={show} close="">
          Upload File
        </ModalHeader>
        <form onSubmit={uploadFile}>
          <ModalBody>
            <input type="file" onChange={handleFileSelect} />
            {/* <Button color="primary">Save</Button> */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Upload</Button>
            <Button type="button" onClick={hideCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ModalOpen;
