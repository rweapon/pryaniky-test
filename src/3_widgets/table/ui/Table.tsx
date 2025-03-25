import type { GridColDef, GridEventListener, GridRowId, GridRowModesModel } from "@mui/x-data-grid";

import { useAppSelector } from "@app/appStore";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import { useState } from "react";

import type { TableRow } from "../model/types";

import { useCreateRowMutation, useDeleteRowMutation, useTableApi, useUpdateRowMutation } from "../api/tableApi";
import { tableColumns, tableColumnWidth, tableStyles } from "../model/config";
import { EditToolbar } from "./EditToolbar";

type Props = { isLoading: boolean };

export default function Table({ isLoading }: Props) {
  const rows = useAppSelector(state => state.table.rows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [createRow, { isLoading: isCreateLoading }] = useCreateRowMutation();
  const [updateRow, { isLoading: isUpdateLoading }] = useUpdateRowMutation();
  const [deleteRow, { isLoading: isDeleteLoading }] = useDeleteRowMutation();

  const { deleteCreatedRow } = useTableApi();

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteRow(id.toString());
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    deleteCreatedRow(id.toString());
  };

  const processRowUpdate = async (newRow: TableRow) => {
    const { companySignatureName, documentName, documentType, employeeSignatureName, isNew } = newRow;

    if (!companySignatureName.trim() || !documentName.trim() || !documentType.trim() || !employeeSignatureName.trim()) {
      throw new Error("Нужно заполнить все поля");
    }
    else if (isNew) {
      createRow(newRow);
    }
    else {
      updateRow(newRow);
    }

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Действия",
    type: "actions",
    cellClassName: "cellClass",
    width: tableColumnWidth,
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key={id}
            icon={<SaveIcon />}
            label="Сохранить"
            color="primary"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key={id}
            icon={<CancelIcon />}
            label="Отменить"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key={id}
          icon={<EditIcon />}
          label="Изменить"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key={id}
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  return (
    <DataGrid
      rows={rows}
      columns={[...tableColumns, actionColumn]}
      hideFooter
      sx={tableStyles}
      getRowHeight={() => "auto"}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      // eslint-disable-next-line no-alert
      onProcessRowUpdateError={(error: Error) => alert(error.message)}
      slots={{ toolbar: EditToolbar }}
      slotProps={{
        toolbar: { setRowModesModel },
      }}
      loading={isLoading || isDeleteLoading || isCreateLoading || isUpdateLoading}
    />
  );
}
