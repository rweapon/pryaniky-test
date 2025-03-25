import type { GridRowModesModel, ToolbarPropsOverrides } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { useTableApi } from "@widgets/table/api/tableApi";

import { TableField } from "../model/config";

declare module "@mui/x-data-grid" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface ToolbarPropsOverrides {
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

export function EditToolbar({ setRowModesModel }: ToolbarPropsOverrides) {
  const { createEmptyRow } = useTableApi();

  const handleClick = () => {
    const uniqueKey = Math.floor(Math.random() * 1000).toString();
    createEmptyRow(uniqueKey);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [uniqueKey]: { mode: GridRowModes.Edit, fieldToFocus: TableField.COMPANY_SIG_NAME },
    }));
  };

  return (
    <GridToolbarContainer className="!px-4 !pt-2">
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Добавить документ
      </Button>
    </GridToolbarContainer>
  );
}
