import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const AllowModal = ({ open, allowModal }) => {
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState([]);
  console.log(selected);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/user-list`,
        { headers: { Authorization: `${token}` } }
      );
      setErrorMsg("");
      let { result } = data;
      setUserList(result);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const savePermission = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/allow-permission`,
        { userIds: selected },
        { headers: { Authorization: `${token}` } }
      );
      allowModal();
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const setIds = (selectedList) => {
    let userIds = [];

    for (let user of selectedList) {
      userIds.push(user._id);
    }

    setSelected(userIds);
  };

  return (
    <div>
      <Modal isOpen={open} toggle={allowModal}>
        <ModalHeader toggle={allowModal}>User Permission</ModalHeader>
        <ModalBody>
          <Multiselect
            options={userList}
            displayValue="fullName"
            onSelect={setIds}
            onRemove={setIds}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={savePermission}>
            Allow Permission
          </Button>
          <Button onClick={allowModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AllowModal;
