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
//  import { basicData } from "./TableData";

// Self import
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,Modal,Form  } from 'react-bootstrap';
import "../../../../src/assets/css/style.css"
import axios from 'axios'
import { NavLink ,useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import Button from 'react-bootstrap/Button';



const BasicTable = () => {
      const { id } = useParams();
      const [tableData, setTableData] = useState([
      ]);

        //****List API Start****
          useEffect(() => {
            fetch("http://localhost:5000/api/get")
            .then(resp=>resp.json())
            .then(resp=> {
              setTableData(resp)
              // loadData();
            })
          },[])
        //****API End****
        
        //****Delete API Start****
          const handeleDelete=(id)=>{
            if(window.confirm("Are you sure?",id)){
              axios.delete(`http://localhost:5000/api/remove/${id}`);
              toast.error("Data Deleted Successfully !");
              setTimeout(() => history.push("./add"),100);
            }else{
              console.log(e);
            }
          };
        //****Delete API End****
  const columns=[
    {
      title:"ID", field:'id', 
      filtering:false,
      cellStyle: {
        width: 50,
        whiteSpace: 'nowrap',
        maxWidth: 50
      },
      headerStyle: {
        width:50,
        maxWidth: 40
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
    },
    {
      title:"Actions", field:'id', 
      filtering:false,
      render: (tableData) =>
      <div>
        <NavLink to = {`/edit/${tableData.id}`}><Button className="">Edit</Button></NavLink>&nbsp;
        <Button className="btn btn-danger" onClick={()=>handeleDelete(tableData.id)}>Delete</Button>
      </div>,
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
  return (
    <React.Fragment>
      <Content page="component">
      <ToastContainer position="top-center" autoClose={500} />
          <NavLink to="add">
            <Button className="add-button">
            Add
            </Button>
          </NavLink>
          <MaterialTable columns={columns} data={tableData} title="User Table"
              options={{
                  sorting:true,
                  filtering:true,
                  pageSizeOptions:[5,10,20,30,50,100],
                  exportButton :true,
                  emptyRowsWhenPaging:false,
                  columnResizable: true,
                  grouping:true,
                  tableLayout: "fixed",
                  actionsColumnIndex:-1,
                  addRowPosition:'first',
                  exportMenu: [{
                      label: 'Export PDF',
                          exportFunc: (columns, tableData) => ExportPdf(columns, tableData, 'table')
                      }, {
                          label: 'Export CSV',
                          exportFunc: (columns, tableData) => ExportCsv(columns, tableData, 'table')
                      }]
              }}>
                  
          </MaterialTable>
      </Content>
    </React.Fragment>
  );
};
export default BasicTable;
