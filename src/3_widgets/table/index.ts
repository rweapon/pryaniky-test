import { useGetTableInfoQuery } from "./api/tableApi";
import { tableColumns } from "./model/config";
import tableReducer from "./model/tableSlice";
import Table from "./ui/Table";

export { Table, tableColumns, tableReducer, useGetTableInfoQuery };
