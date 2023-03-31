import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, FormGroup } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Button,
} from "../../../components/Component";

const FormLayoutsPage = () => {
  let history = useHistory();
  const { id } = useParams();
  const [tableData, setTableData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  const { name, email, gender } = tableData;
  const onInputChange = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setTableData({ ...resp.data[0] }));
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:5000/api/put/${id}`, {
        name,
        gender,
        email,
      })
      .then(() => {
        setTableData({ name: "", email: "", gender: "" });
      })
      .catch((err) => toast.error(err.resp.data));
    toast.success("Updated");
    history.push("/userList");
  };

  return (
    <React.Fragment>
      <Head title="Form Layouts" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <ToastContainer />
          <BlockHeadContent>
            <BackTo link="/userList" icon="arrow-left">
              List View
            </BackTo>
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">User details</BlockTitle>
              {/* <p>Below example helps you to build your own form nice way.</p> */}
            </BlockHeadContent>
          </BlockHead>
          <Row className="g-gs">
            <Col lg="6">
              <PreviewCard className="h-100">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter Your Name"
                      id="name"
                      name="name"
                      value={name ?? ""}
                      onChange={(e) => onInputChange(e)}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter Your E-mail Address"
                      name="email"
                      value={email ?? ""}
                      onChange={(e) => onInputChange(e)}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter Your Phone Number"
                      name="gender"
                      value={gender ?? ""}
                      onChange={(e) => onInputChange(e)}
                      readOnly
                    />
                  </div>

                  <button className="btn btn-warning btn-block" value={id ? "update" : ""}>
                    Back
                  </button>
                </form>
              </PreviewCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default FormLayoutsPage;
