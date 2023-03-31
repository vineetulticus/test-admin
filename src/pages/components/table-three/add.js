import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Row, Col, FormGroup } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { format } from 'date-fns'


if (typeof window !== "undefined") {
  injectStyle();
}

const FormLayoutsPage = () => {

  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  // const [dob, setDOB] = useState('');
  const [note, setNote] = useState('');
  const [dob, setDOB] = React.useState(new Date());
  console.log(dob);
  // const [dob, setDOB] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

  const submitForm = (e) => {
    e.preventDefault();
    if(!name || !email || !password){
      console.log("Invalid");
      toast.error("Please provide some value into fields")
    }else{
      console.log("api call");
      axios.post('http://localhost:5000/api/insert', {
        name : name,
        email : email,
        password : password,
        gender : gender,
        dob : dob,
        note : note,
       }).catch((err)=> toast.error(err.response.data));
       toast.success("Added Successfully !");
       setTimeout(() => history.push("./list"),500);
    }
    
  };
  return (
    <React.Fragment>
      <Head title="Form Layouts" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
        <ToastContainer position="top-center"/>
          <BlockHeadContent>
            <BackTo link="/list" icon="arrow-left">
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
                      <input className="form-control" type="text"  id='name'
                        name='name'
                        onChange = {(e)=>{
                          setName(e.target.value)
                        }}
                        placeholder="Enter your your Name" />
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="email-address">
                      Email address
                    </label>
                    <div className="form-control-wrap">
                      <input className="form-control" type="email"  id='email'
                        name='email'
                        // value = {email}
                         onChange = {(e)=>{
                          setEmail(e.target.value)
                        }}
                        placeholder="Enter your your email address" />
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input className="form-control" type="password"  id='password'
                        name='password'
                        // value = {contact}
                         onChange = {(e)=>{
                          setPassword(e.target.value)
                        }}
                        placeholder="Enter your Password" />
                    </div>
                  </FormGroup>
                  {/* <FormGroup className="form-group">
                    <DateTimePickerComponent id="datetimepicker"  name='dob'
                        onChange = {(e)=>{
                        setDOB(e.target.value)
                      }} placeholder="Select date of birth"/>
                  </FormGroup> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      value={dob}
                      dateFormat="YYYY-MM-DD HH:MM:SS"
                      onChange={(newValue) => {
                        setDOB(newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <FormGroup>
                   <label className="form-label" htmlFor="full-name">
                      Gender
                    </label>
                    <ul className="custom-control-group g-3 align-center flex-wrap">
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            defaultChecked
                            onChange = {(e)=>{
                              setGender(e.target.value)
                            }}
                            name="gender"
                            id="reg-enable"
                          />
                          <label className="custom-control-label" htmlFor="reg-enable">
                            Male
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            // value={}
                            name="gender"
                            onChange = {(e)=>{
                              setGender(e.target.value)
                            }}
                            id="reg-disable"
                          />
                          <label className="custom-control-label" htmlFor="reg-disable">
                            Female
                          </label>
                        </div>
                      </li>
                    </ul>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="cf-default-textarea">
                      Note
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        className="form-control form-control-sm"
                        id="note"
                        name="note"
                        placeholder="Write your note"
                        onChange = {(e)=>{
                          setNote(e.target.value)
                        }}
                      ></textarea>
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Button color="primary" size="lg" onClick={submitForm}>
                      Save Informations
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
