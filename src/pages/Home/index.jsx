import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Nav, NavItem, NavLink, Table, Row } from "reactstrap";
import AllowModal from "./AllowModal";
import ModalOpen from "./ModalOpen";

const Home = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const allowModal = (e) => {
    setOpen(!open);
  };

  const handleModal = (e) => {
    setShow(!show);
  };

  const [userList, setuserList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getFilesList();
  }, []);

  const getFilesList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/file/file-list`,
        { headers: { Authorization: `${token}` } }
      );
      setErrorMsg("");
      let { result } = data;
      setFilesList(result);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const onFileUpload = () => {
    getFilesList();
    setShow(!show);
  };

  const downloadFile = async (name) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/file/download/${name}`,
      responseType: "blob",
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const logOut = (e) => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className="container-fluid m-1">
      <nav>
        <Nav className=" justify-content-end mb-5">
          <NavItem>
            <NavLink type="button" href="#">
              <Button onClick={logOut} outline color="danger">
                Logout
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
      </nav>

      <main>
        <Row>
          <Col xs={12} className="d-flex justify-content-between">
            <div>
              <h4>File List</h4>
            </div>
            <div>
              <Button
                className="mx-2"
                color="primary"
                outline
                onClick={allowModal}
              >
                Allow User Permission
              </Button>
            </div>
            <div>
              <Button
                className="mx-2"
                color="primary"
                outline
                onClick={handleModal}
              >
                Upload New File
              </Button>
            </div>
          </Col>
          <Col xs={12}>
            <div className=" mt-2 ">
              <div className="justify-content-center">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>File Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filesList.length > 0 ? (
                      filesList.map(({ _id, name }) => (
                        <tr key={_id}>
                          <td className="">{name}</td>
                          <td>
                            <Button
                              color="primary"
                              outline
                              onClick={() => downloadFile(name)}
                            >
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} style={{ fontWeight: "300" }}>
                          No files found. Please add some.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </main>
      {show && (
        <ModalOpen
          show={show}
          handleModal={handleModal}
          onFileUpload={onFileUpload}
        />
      )}
      {open && <AllowModal open={open} allowModal={allowModal} />}
    </div>
  );
};

export default Home;
