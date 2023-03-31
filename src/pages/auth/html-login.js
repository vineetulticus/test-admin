import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  // const [passState, setPassState] = useState(false);
  // const [errorVal, setError] = useState("");

  // const onFormSubmit = (formData) => {
    // setLoading(true);
    // const loginName = "info@softnio.com";
    // const pass = "123456";
    // if (formData.name === loginName && formData.passcode === pass) {
    //   localStorage.setItem("accessToken", "token");
    //   setTimeout(() => {
    //     window.history.pushState(
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
    //       "auth-login",
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    //     );
    //     window.location.reload();
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     setError("Cannot login with credentials");
    //     setLoading(false);
    //   }, 2000);
    // }
  // };

  // const { errors, register, handleSubmit } = useForm();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitForm = () =>{
    console.log(email + '' +password);
  }

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Admin panel using your email and passcode.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {/* {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )} */}
            <Form className="is-alter" >
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    onChange={e=>setEmail(e.target.value)}
                    // ref={register({ required: "This field is required" })}
                    // defaultValue="info@softnio.com"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    className={`form-icon lg form-icon-right passcode-switch `}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={e=>setPassword(e.target.value)}
                    
                    // ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control`}
                  />
                  {/* {errors.passcode && <span className="invalid">{errors.passcode.message}</span>} */}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit"  onClick={submitForm} color="primary">
                  {/* {loading ? <Spinner size="sm" color="light" /> : "Sign in"} */}Sign in
                </Button>
              </FormGroup>
            </Form>
          
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
