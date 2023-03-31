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
import { basicData } from "./TableData";

// Self import
import MaterialTable from '@material-table/core';
import { useState } from 'react';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,Modal } from 'react-bootstrap';
import "../../../../src/assets/css/style.css"
// import Button from 'react-bootstrap/Button';




const BasicTable = () => {
const [data, setData] = useState([
  
]);

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



// Working api
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/get").then((data) => data.json()).then((data) => setData(data))
  // })

  useEffect(() => {
    fetch("http://localhost:5000/api/get")
    .then(resp=>resp.json())
    .then(resp=> {
      setData(resp)
    })
  },[])


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
      <MaterialTable 
          //  style={{ overflowX:'scroll',overFlowY: "hidden"}} 
          title="First Table" 
          columns={columns} 
          data={data}
          editable={{
            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
              setData([...data,newRow])
              setTimeout(()=>resolve(),500)
            }),
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
              icon: <button type="button" className="btn btn-primary">Primary</button>,
              // icon:<svg data-testid="Delete"></svg>,
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
       </Content>
     </React.Fragment>
   
  );
};
export default BasicTable;
