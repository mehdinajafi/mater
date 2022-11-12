import {
  Checkbox,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import DeleteProductDialog from "./DeleteProductDialog";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";

interface IHeaderToolbar {
  rowCount: number;
  selectionModel: GridSelectionModel;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderToolbar: React.FC<IHeaderToolbar> = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const numSelected = props.selectionModel.length;

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <Toolbar
      sx={{
        display: numSelected === 0 ? "none" : "flex",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        minHeight: "max-content !important",
        pl: { xs: 6, sm: 6 },
        pr: { xs: 16, sm: 16 },
        py: 8,
        bgcolor: "primary.lighter",
        zIndex: 1,
      }}
    >
      <DeleteProductDialog
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        selectionModel={props.selectionModel}
      />

      <Checkbox
        indeterminate={numSelected > 0 && numSelected < props.rowCount}
        checked={props.rowCount > 0 && numSelected === props.rowCount}
        onChange={props.onSelectAllClick}
      />
      <Typography
        variant="subtitle1"
        color="primary"
        sx={{ flexGrow: 1, ml: 16, fontWeight: 700 }}
      >
        {props.selectionModel.length} Selected
      </Typography>
      <Tooltip title="Delete">
        <IconButton color="primary" onClick={openDeleteModal}>
          <TrashIcon width={20} height={20} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default HeaderToolbar;
