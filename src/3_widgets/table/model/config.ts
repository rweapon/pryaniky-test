import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

export enum TableField {
  COMPANY_SIG_NAME = "companySignatureName",
  DOC_NAME = "documentName",
  DOC_STATUS = "documentStatus",
  DOC_TYPE = "documentType",
  EMPLOYEE_NUM = "employeeNumber",
  EMPLOYEE_SIG_DATE = "employeeSigDate",
  EMPLOYEE_SIG_NAME = "employeeSignatureName",
}

export enum DocType {
  SIGNED = "Подписан",
  NOT_SIGNED = "Не подписан",
}

export const tableColumnWidth = 170;

export const tableColumnsFields: Record<TableField, GridColDef> = {
  [TableField.COMPANY_SIG_NAME]: { field: TableField.COMPANY_SIG_NAME, headerName: "Название подписи компании", type: "string" },
  [TableField.DOC_NAME]: { field: TableField.DOC_NAME, headerName: "Название документа", type: "string" },
  [TableField.DOC_STATUS]: { field: TableField.DOC_STATUS, headerName: "Статус документа", type: "singleSelect", valueOptions: [DocType.SIGNED, DocType.NOT_SIGNED] },
  [TableField.DOC_TYPE]: { field: TableField.DOC_TYPE, headerName: "Тип документа", type: "string" },
  [TableField.EMPLOYEE_NUM]: { field: TableField.EMPLOYEE_NUM, headerName: "Номер сотрудника", type: "number" },
  [TableField.EMPLOYEE_SIG_DATE]: { field: TableField.EMPLOYEE_SIG_DATE, headerName: "Дата подписи сотрудника", type: "dateTime", valueGetter: date => new Date(date) },
  [TableField.EMPLOYEE_SIG_NAME]: { field: TableField.EMPLOYEE_SIG_NAME, headerName: "Имя подписи сотрудника", type: "string" },
};

export const tableColumns: GridColDef[] = Object.values(tableColumnsFields).map(col => ({ ...col, width: tableColumnWidth, editable: true, flex: 1, cellClassName: "cellClass", align: "left" }));

export const tableStyles: SxProps<Theme> = {
  "color": "secondary",
  "backgroundColor": "white",
  "borderColor": "secondary",
  "borderRadius": "24px",
  "--unstable_DataGrid-headWeight": 600,
  "& .MuiDataGrid-scrollbar": {
    visibility: "hidden",
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  "& .MuiDataGrid-columnHeaders": {
    "borderBottom": "1px var(--DataGrid-rowBorderColor) solid",
    "paddingInline": "16px",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  "& .MuiDataGrid-columnHeader": {
    borderBottom: "none !important",
    fontWeight: 600,
    color: "gray",
  },
  "& .MuiDataGrid-row": {
    "padding": "16px",
    "display": "flex",
    "alignItems": "center",
    "position": "relative",
    "borderTopColor": "secondary",

    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },

    "&:not(:first-of-type)": {
      borderTop: "1px var(--rowBorderColor) solid",
    },
  },
  "& .cellClass": {
    "borderTop": "none !important",
    "maxWidth": "100%",
    "@media (max-width: 768px)": {
      width: "100%",
      paddingBlock: "4px",
    },
  },
};
