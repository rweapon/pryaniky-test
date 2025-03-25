import type { TableField } from "./config";

export type TableRow = {
  id: string;
  // uniqueKey?: string;
  isNew?: boolean;
  [TableField.COMPANY_SIG_NAME]: string;
  [TableField.DOC_NAME]: string;
  [TableField.DOC_STATUS]: string;
  [TableField.DOC_TYPE]: string;
  [TableField.EMPLOYEE_NUM]: string;
  [TableField.EMPLOYEE_SIG_DATE]: string;
  [TableField.EMPLOYEE_SIG_NAME]: string;
};

export type TableState = {
  rows: TableRow[];
};
