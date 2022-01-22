import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const AllowModal = ({ open, allowModal }) => {
  const [userList, setUserList] = useState([]);
  const [allowedUser, setAllowedUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selected, setSelected] = useState([]);
  console.log(selected);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    getUserPermission();
  }, []);


  useEffect(() => {
    let alloweduserList = [];
    console.log("allowedUser", allowedUser);
    for (const user of userList) {
      if(allowedUser.includes(user._id)) {
        alloweduserList.push(user);

      }
    }
    setSelectedUser(alloweduserList);
  }, [userList, allowedUser]);

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


  const getUserPermission = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/list-permission-member`,
        { headers: { Authorization: `${token}` } }
      );
      let { result } = data;



      if(result[0]) {
        console.log("result[0]", result[0].allowedUser);

        setAllowedUser(result[0].allowedUser);
      }

      getUserList();
      


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
      <Modal isOpen={open} toggle={open}>
        <ModalHeader toggle={open}>User Permission</ModalHeader>
        <ModalBody style={{height: "50vh"}}>
          <Multiselect
            options={userList}
            selectedValues={selectedUser}
            displayValue="fullName"
            onSelect={setIds}
            onRemove={setIds}
            showCheckbox
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
