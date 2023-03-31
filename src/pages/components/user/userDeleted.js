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
import MaterialTable from "@material-table/core";
import { useState } from "react";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button, Modal, Form } from "react-bootstrap";
import "../../../../src/assets/css/style.css";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { USER_DELETED_DETAIL } from "../../Graphql/Queries";
import { DELETE_USER, USER_RESTORE } from "../../Graphql/Mutation";
import { useMutation } from "@apollo/client";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useConfirm } from "material-ui-confirm";
import { Link, useHistory } from "react-router-dom";
import { gql } from "@apollo/client";

const BasicTable = () => {
  let history = useHistory();
  const confirm = useConfirm();

  //Restore
  const [userRestore] = useMutation(USER_RESTORE);
  const dataRestore = (id) => {
    confirm({ description: "Want to restore data ?" }).then(() => {
      userRestore({
        variables: {
          id: id,
        },
      });
      history.push("/userList");
    });
  };

  //Deleted Details
  const { data } = useQuery(USER_DELETED_DETAIL);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.userDeletedDetail);
    }
  }, [data]);

  const columns = [
    {
      title: "ID",
      field: "id",
      filtering: false,
      cellStyle: {
        width: 50,
        whiteSpace: "nowrap",
        maxWidth: 50,
      },
      headerStyle: {
        width: 50,
        maxWidth: 40,
      },
    },
    {
      title: "Name",
      field: "name",
      filterPlaceholder: "Filter by Name",
      cellStyle: {
        width: 200,
        whiteSpace: "nowrap",
        maxWidth: 200,
      },
      headerStyle: {
        width: 200,
        maxWidth: 200,
      },
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "Filter by Email",
      cellStyle: {
        width: 200,
        maxWidth: 200,
      },
      headerStyle: {
        width: 200,
        maxWidth: 200,
      },
    },
    {
      title: "Gender",
      field: "gender",
      filterPlaceholder: "Filter by Gender",
      cellStyle: {
        width: 200,
        maxWidth: 200,
      },
      headerStyle: {
        width: 200,
        maxWidth: 200,
      },
    },
    {
      title: "Actions",
      field: "id",
      filtering: false,
      render: (data) => (
        <div>
          <RestoreFromTrashIcon
            onClick={() => dataRestore(data.id)}
            style={{ color: "black" }}
            data-tip="hello world"
          ></RestoreFromTrashIcon>
          &nbsp;
        </div>
      ),
      cellStyle: {
        width: 200,
        maxWidth: 200,
      },
      headerStyle: {
        width: 200,
        maxWidth: 200,
      },
    },
  ];
  return (
    <React.Fragment>
      <Content page="component">
        <ToastContainer position="top-center" autoClose={500} />
        <NavLink to="userList">
          <Button className="list-button">List</Button>
        </NavLink>
        <MaterialTable
          columns={columns}
          data={users}
          title="Deleted User"
          options={{
            sorting: true,
            filtering: true,
            pageSizeOptions: [5, 10, 20, 30, 50, 100],
            exportButton: true,
            emptyRowsWhenPaging: false,
            columnResizable: true,
            grouping: true,
            tableLayout: "fixed",
            actionsColumnIndex: -1,
            addRowPosition: "first",
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (columns, data) => ExportPdf(columns, data, "table"),
              },
              {
                label: "Export CSV",
                exportFunc: (columns, data) => ExportCsv(columns, data, "table"),
              },
            ],
          }}
        ></MaterialTable>
      </Content>
    </React.Fragment>
  );
};
export default BasicTable;
