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




const BasicTable = () => {
const [tableData, setTableData] = useState([
  {name:"Abc", email:"abc@gmail.com", gender:"M"},
  {name:"Xyz", email:"xyz@gmail.com", gender:"M"},
  {name:"Jyz", email:"enrjn@gmail.com", gender:"F"},
  {name:"Zyz", email:"ewuieh@gmail.com", gender:"F"},
  {name:"Xyz", email:"kal@gmail.com", gender:"M"},
  {name:"Cyz", email:"acy@gmail.com", gender:"M"},
  {name:"BMz", email:"enmcs@gmail.com", gender:"M"},
  {name:"PWyz", email:"csyu@gmail.com", gender:"F"},
  {name:"REz", email:"sdbhjs@gmail.com", gender:"F"},
  {name:"Wz", email:"cnjs@gmail.com", gender:"F"},
  {name:"Lmno", email:"cncn@gmail.com", gender:"F"}
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



  const columns=[
    {
      title:"Name", field:'name', 
      filterPlaceholder:"Filter by Name", 
      cellStyle: {
        width: 250,
        whiteSpace: 'nowrap',
        maxWidth: 250
      },
      headerStyle: {
        width:250,
        maxWidth: 250
      }
    },
    {
      title:"Email", 
      field:'email', 
      filterPlaceholder:"Filter by Email",
      cellStyle: {
        width: 250,
        maxWidth: 250
      },
      headerStyle: {
        width:250,
        maxWidth: 250
      }
    },
    {
      title:"Gender", 
      field:'gender', 
      lookup:{M:"Male",F:"Female"},
      filterPlaceholder:"Filter by Gender",
      cellStyle: {
        width: 250,
        maxWidth: 250
      },
      headerStyle: {
        width:250,
        maxWidth: 250
      }
    },
    // {
    //   title:"Contact", field:'contact', 
    //   filterPlaceholder:"Filter by Contact",
    //   cellStyle: {
    //     width: 250,
    //     maxWidth: 250
    //   },
    //   headerStyle: {
    //     width:250,
    //     maxWidth: 250
    //   }
    // }
  ]
  // console.log(data,columns);
  return (
  <React.Fragment>
      <Content page="component">
      <MaterialTable 
          //  style={{ overflowX:'scroll',overFlowY: "hidden"}} 
          title="List View" 
          columns={columns} 
          data={tableData}
          editable={{
            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
              setData([...tableData,newRow])
              setTimeout(()=>resolve(),500)
            }),
             onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
              const updateData=[...tableData]
              updateData[oldRow.tableData.id]=newRow
              setData(updateData)
              setTimeout(()=>resolve(),500)
            }),
            onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
              const updateData=[...tableData]
              updateData.splice(selectedRow.tableData.id,)
              setData(updateData)
              setTimeout(()=>resolve(),500)
            }),
          }}
          // actions={[
          //   {
          //     icon:()=><i className="fas fa-edit edit"></i>,
          //   }
          // ]}
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
              rowDataCopy.tableData.checked = !rowDataCopy.tableData.checked;
              // Copy data so we can modify it
              const dataCopy = [...data];
              // Find the row we clicked and update it with `checked` prop
              dataCopy[rowDataCopy.tableData.id] = rowDataCopy;
              setData(dataCopy);
            }}
      />
       </Content>
     </React.Fragment>
   
  );
};
export default BasicTable;
