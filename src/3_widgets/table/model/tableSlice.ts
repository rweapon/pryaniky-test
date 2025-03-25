import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { TableRow, TableState } from "./types";

import { DocType, TableField } from "./config";

const initialState: TableState = {
  rows: [],
};

export const tableSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    createEmptyRow: (state, action: PayloadAction<string>) => {
      const newRow = {
        id: action.payload,
        isNew: true,
        [TableField.COMPANY_SIG_NAME]: "",
        [TableField.DOC_NAME]: "",
        [TableField.DOC_STATUS]: DocType.NOT_SIGNED,
        [TableField.DOC_TYPE]: "",
        [TableField.EMPLOYEE_NUM]: "0",
        [TableField.EMPLOYEE_SIG_DATE]: new Date().toISOString(),
        [TableField.EMPLOYEE_SIG_NAME]: "",
      };
      state.rows = [...state.rows, newRow];
    },
    deleteCreatedRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => !(row.id === action.payload && "isNew" in row));
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      state.rows = [...state.rows, action.payload];
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
  },
});

export const { setRows, createEmptyRow, deleteCreatedRow, updateRow, deleteRow } = tableSlice.actions;

export default tableSlice.reducer;
