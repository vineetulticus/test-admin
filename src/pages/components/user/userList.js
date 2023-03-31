import React, { useEffect } from "react";
import Content from "../../../layout/content/Content";
import { ReactDOM } from "react";
import Head from "../../../layout/head/Head";
import { ConfirmProvider } from "material-ui-confirm";
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
import { Link, useHistory } from "react-router-dom";
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
import { GET_USER_LIST } from "../../Graphql/Queries";
import { DELETE_USER } from "../../Graphql/Mutation";
import { useMutation } from "@apollo/client";
import { useConfirm } from "material-ui-confirm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BasicTable = () => {
  const { data } = useQuery(GET_USER_LIST);
  const confirm = useConfirm();
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.userList);
      setLoader(false);
    }
  }, [data]);

  //delete
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  const handleDelete = (id) => {
    confirm({ description: "Want to delete this user ?" }).then(() => {
      deleteUser({
        variables: {
          id: id,
        },
      });
      history.push("/userList");
    });
  };

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
          <NavLink to={`/userEdit/${data.id}`}>
            {/* <Button className="">Edit</Button> */}
            <EditIcon style={{ color: "black" }} data-tip="hello world" />
          </NavLink>
          <NavLink to={`/userView/${data.id}`}>
            <RemoveRedEyeIcon style={{ color: "black" }} data-tip="hello world" />
          </NavLink>
          &nbsp;
          <ConfirmProvider>
            <DeleteIcon
              onClick={() => {
                handleDelete(data.id);
              }}
              style={{ color: "black" }}
              data-tip="hello world"
            />
          </ConfirmProvider>
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
        <NavLink to="userAdd">
          {loader && <Skeleton />}
          {!loader && <Button className="add-button">Add Admin</Button>}
        </NavLink>
        &nbsp;
        <NavLink to="userDeleted">
          <Button className="add-button btn-success">Restore Admin</Button>
        </NavLink>
        <MaterialTable
          columns={columns}
          data={users}
          title="Admin Table"
          options={{
            sorting: true,
            filtering: true,
            pageSizeOptions: [5, 10, 20, 30, 50, 100],
            exportButton: true,
            emptyRowsWhenPaging: false,
            columnResizable: true,
            grouping: true,
            columnsButton: true,
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
