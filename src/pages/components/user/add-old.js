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
import { useNavigate } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
// import {MDCFormField} from '@material/form-field';
// import {MDCRadio} from '@material/radio';

// const initialState = {
//   name: "",
//   email: "",
//   contact: "",
// }
if (typeof window !== "undefined") {
  injectStyle();
}

const FormLayoutsPage = ({ ...props }) => {
  // const [state, setState] = useState(initialState);
  // const {name, email, contact} = state;

  // const handleSubmit = (e) => {
  //    e.preventDefault();
  //   if(!name || !email || !contact){
  //     console.log("Please enterv a value");
  //   }else{
  //     axios.post('http://localhost:5000/api/post', {
  //       name,
  //       email,
  //       contact,
  //     })
  //     .then(() => {
  //       setState({name: "", email: "", contact: ""});
  //     })
  //     .catch((error) => console.log(error, Response));
  //   }
  // };
  // const handleInputChange = (e) => {
  //   console.log ($(e.target));
  //   const {name, value} = e.target();
  //   setState({...state,[name]:value});
  // }
  const [name, setName] = useState('');
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if(!name || !email || !contact){
      console.log("Invalid");
      toast.error("Please provide value into fields")
    }else{
      console.log("api call");
      axios.post('http://localhost:5000/api/insert', {
        name : name,
        email : email,
        contact : contact,
        // gender : gender,
        // dob : dob,
        // note : note,
       }).catch((err)=> toast.error(err.response.data));
       toast.success("Added Successfully !");
       setTimeout(() => history.push("./list"),500);
    }
    
  };
  // const [selectedDate, setSelectedDate] = useState(new Date());

  // const handleDateChange = (date) => {
  //   console.log(date);
  //   setSelectedDate(date);
  // };
//   let history = useHistory();
//   function handleSubmit() {
//     props.handleSubmit() // the one that comes from your App
//     history.push("/home");
//   }
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
            {/* <BlockTitle tag="h2" className="fw-normal">
              Form Layouts
            </BlockTitle> */}
            {/* <BlockDes>
              <p className="lead">
                Form is most esential part of your project. We styled out nicely so you can build your form so quickly.
              </p>
            </BlockDes> */}
          </BlockHeadContent>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add details</BlockTitle>
              <i className="fa fa-trash " aria-hidden="true"></i>
              {/* <p>Below example helps you to build your own form nice way.</p> */}
            </BlockHeadContent>
          </BlockHead>
          <Row className="g-gs">
            <Col lg="8">
              <PreviewCard className="h-100">
             
                <form>
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="full-name">
                      Full Name
                    </label>
                    <div className="form-control-wrap">
                      <input className="form-control" type="text"  id='name'
                        name='name'
                        // value = {name}
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
                    <label className="form-label" htmlFor="phone-no">
                      Phone No
                    </label>
                    <div className="form-control-wrap">
                      <input className="form-control" type="number"  id='contact'
                        name='password'
                        // value = {contact}
                         onChange = {(e)=>{
                          setContact(e.target.value)
                        }}
                        placeholder="Enter your your Contact" />
                    </div>
                  </FormGroup>
                  {/* <FormGroup className="form-group">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                      <KeyboardDatePicker
                        label="Select date of birth"
                        value={selectedDate}
                        name="dob"
                        id="dob"
                        // onChange={handleDateChange}
                        onChange = {(e)=>{
                          setDOB(e.target.value)
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormGroup>
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
                            name="Female"
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
                        id="cf-default-textarea"
                        placeholder="Write your note"
                        onChange = {(e)=>{
                          setNote(e.target.value)
                        }}
                      ></textarea>
                    </div>
                  </FormGroup> */}
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
