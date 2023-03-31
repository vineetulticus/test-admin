import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { , Label, Input, Row, Col } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../Graphql/Mutation";

import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useForm } from "../../../utility/hooks";

if (typeof window !== "undefined") {
  injectStyle();
}

const FormLayoutsPage = (props) => {
  const context = useContext(AuthContext);
  let history = useHistory();
  const [erorrs, setErros] = useState([]);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    update(proxy, { data: { createUser: userData } }) {
      context.login(userData);
      history("/userList");
    },
    onError({ graphQLErrors }) {
      setErros(graphQLErrors);
    },
    variables: { createUser: values },
  });

  // const history = useHistory();
  // const [InputField, setInputField] = useState({
  //   name: "",
  //   email: "",
  //   gender: "",
  // });

  // const [createUser, { loading }] = useMutation(CREATE_USER);
  // const inputHandler = (e) => {
  //   setInputField({
  //     ...InputField,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const formSubmit = (e) => {
  //   createUser({ variables: InputField }).then((res) => console.log(res));
  //   toast.success("Added Successfully !");
  //   history.push("/userList");
  // };
  return (
    <React.Fragment>
      <Head title="Form Layouts" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          <ToastContainer position="top-center" autoClose={500} />
          <BlockHeadContent>
            <BackTo link="/userList" icon="arrow-left">
              List View
            </BackTo>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <Row className="g-gs">
            <Col lg="8">
              <PreviewCard className="h-100">
                <div className="card-head">
                  <h5 className="card-title">User Form</h5>
                </div>
                <form>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="full-name">
                      Full Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        onChange={inputHandler}
                        value={InputField.name}
                        placeholder="Enter your your Name"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="email-address">
                      Email address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        value={InputField.email}
                        onChange={inputHandler}
                        placeholder="Enter your your email address"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={InputField.password}
                        onChange={inputHandler}
                        placeholder="Enter your your password address"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="default-4" className="form-label">
                      Default Select
                    </Label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input
                          type="select"
                          name="select"
                          id="default-4"
                          value={InputField.gender}
                          onChange={inputHandler}
                        >
                          <option value="default_option">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Button color="primary" size="lg" onClick={formSubmit}>
                      Save
                    </Button>
                  </FormGroup>
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
