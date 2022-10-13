import {Column} from "react-table";

export const TABLE_COULUMNS: Column[] = [
  {Header: "Id", accessor: "id", minWidth: 50},
  {Header: "Name", accessor: "name"},
  {Header: "Username", accessor: "username"},
  {Header: "Email", accessor: "email"},
  {Header: "City", accessor: "city"},
];
