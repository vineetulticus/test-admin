import React, { useEffect } from "react";
import Content from "../../../layout/content/Content";
import { ReactDOM } from "react";
import Head from "../../../layout/head/Head";
import {
  Table,
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
} from "../../../components/Component";
// import { basicData } from "./TableData";

// Self import
import { useHistory } from "react-router-dom";
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,Modal,Form  } from 'react-bootstrap';
import "../../../../src/assets/css/style.css"
import axios from 'axios'
// import Button from 'react-bootstrap/Button';


// *******API Start********
const BasicTable = () => {
  const [data, setData] = useState([
    
  ]);
  

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [contact, setContact] = useState('');

const handleClose = () => {
  axios.post('http://localhost:5000/api/insert', {
      name : name,
      email : email,
      contact : contact,
      
     }).then(()=>{
      // setShow(false)
    
     })
    setShow(false);
    history.push("./crud");
};
    // => Working List APi
        //  const loadData = async()=>{
        //   const response = await axios.get("http://localhost:5000/api/get").then((data) => data.json())
        //   // console.log(response.data);
        //        toast.success("Data Added successfully");
        //       setTimeout(() => loadData(), 500 );
        //   setData(response.data);
        //   }
        //   useEffect(()=>{
        //     loadData();
        //   },[]);

    // => List Working api
        // useEffect(() => {
        //   fetch("http://localhost:5000/api/get").then((data) => data.json()).then((data) => setData(data))
        // })

    // => list Api in Use
      useEffect(() => {
        fetch("http://localhost:5000/api/get")
        .then(resp=>resp.json())
        .then(resp=> {
          setData(resp)
        })
      },[])

    // => Insert Api
      const [formData,setFormdata]=useState({name:"",email:"",contact:""})

// ***********API End**************
  //Modal
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  const columns=[
    {
      title:"ID", field:'id', 
      filterPlaceholder:"Filter by ID", filtering:false,
      cellStyle: {
        width: 50,
        whiteSpace: 'nowrap',
        maxWidth: 50
      },
      headerStyle: {
        width:50,
        maxWidth: 50
      }
    },
    {
      title:"Name", field:'name', 
      filterPlaceholder:"Filter by Name", 
      cellStyle: {
        width: 200,
        whiteSpace: 'nowrap',
        maxWidth: 200
      },
      headerStyle: {
        width:200,
        maxWidth: 200
      }
    },
    {
      title:"Email", 
      field:'email', 
      filterPlaceholder:"Filter by Email",
      cellStyle: {
        width: 200,
        maxWidth: 200
      },
      headerStyle: {
        width:200,
        maxWidth: 200
      }
    },
    // {
    //   title:"Gender", 
    //   field:'gender', 
    //   lookup:{M:"Male",F:"Female"},
    //   filterPlaceholder:"Filter by Gender",
    //   cellStyle: {
    //     width: 200,
    //     maxWidth: 200
    //   },
    //   headerStyle: {
    //     width:200,
    //     maxWidth: 200
    //   }
    // },
    {
      title:"Contact", field:'contact', 
      filterPlaceholder:"Filter by Contact",
      cellStyle: {
        width: 200,
        maxWidth: 200
      },
      headerStyle: {
        width:200,
        maxWidth: 200
      }
    }
  ]
  // console.log(data,columns);
  return (
  <React.Fragment>
      <Content page="component">
        <Button variant="primary add-button" onClick={handleShow}>
          Add
        </Button>
        <MaterialTable 
            //  style={{ overflowX:'scroll',overFlowY: "hidden"}} 
            title="Second Table" 
            columns={columns} 
            data={data}
            editable={{
              onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
                const updateData=[...data]
                updateData[oldRow.data.id]=newRow
                setData(updateData)
                setTimeout(()=>resolve(),500)
              }),
              onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                const updateData=[...data]
                updateData.splice(selectedRow.data.id,)
                setData(updateData)
                setTimeout(()=>resolve(),500)
              }),
            }}
            actions={[
              {
                icon:'delete',
                tooltip:"Deleted all selected rows",
                onClick:()=>console.log("deleted"),
              }
            ]}
            options={{
            // headerStyle: {
            //   backgroundColor: "black",
            //   color:"white",
            // },
            // searchFieldAlignment:"left",
            search:true,
            exportButton: true,
            // columnResizable:true,
            // tableLayout: "fixed",
            // density:"comfortable",
            // tableWidth:200,
            columnResizable: true,
            tableLayout: "fixed",
            // doubleHorizontalScroll:true,
            columnResizable: true,
            title: 'Avatar',
            filtering:true,
            showFirstLastPageButtons:false,
            // addRowPosition:'first',
            actionsColumnIndex:-1, 
            toolbarButtonAlignment:"right",
            selection:true,
            grouping:true,
            columnsButton:true,
            emptyRowsWhenPaging:false,
            exportMenu: [{
            label: 'Export PDF',
                exportFunc: (columns, data) => ExportPdf(columns, data, 'myPdfFileName')
              }, {
                label: 'Export CSV',
                exportFunc: (columns, data) => ExportCsv(columns, data, 'myCsvFileName')
              }]
              //  rowStyle:(data,index)=>index%2==0?{background:"gray"}:null
            }}
            onRowClick={(event, rowData) => {
                // Copy row data and set checked state
                const rowDataCopy = { ...rowData };
                rowDataCopy.data.checked = !rowDataCopy.data.checked;
                // Copy data so we can modify it
                const dataCopy = [...data];
                // Find the row we clicked and update it with `checked` prop
                dataCopy[rowDataCopy.data.id] = rowDataCopy;
                setData(dataCopy);
              }}
        />
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
         
        >
        <Modal.Header>
          <Modal.Title>Add Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form action="/crud">
          <Form.Group className="mb-3" >
            <Form.Label>Name :</Form.Label>
            <Form.Control type="name" name="name" id="name" placeholder="Enter Your Name"  onChange = {(e)=>{setName(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Email address :</Form.Label>
            <Form.Control type="email" name="email" id="email" placeholder="Enter Your email" onChange = {(e)=>{setEmail(e.target.value)}}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contact Number :</Form.Label>
            <Form.Control type="number" id="contact" name="contact" placeholder="Enter Your Number"  onChange = {(e)=>{setContact(e.target.value)}}/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success"  onClick={handleClose}>Save</Button>
        </Modal.Footer>
        </Modal>
       </Content>
     </React.Fragment>
   
  );
};
export default BasicTable;
