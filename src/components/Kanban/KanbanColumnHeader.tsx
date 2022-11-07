import { useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import { IColumn } from "./interfaces";
import { ReactComponent as DotsIcon } from "@/assets/icons/dots.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";

interface IKanbanColumnHeader {
  column: IColumn;
  deleteColumn: (columnId: string) => void;
}

const SColumnTitleInput = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  "& input": {
    fontSize: "1.125rem",
    fontWeight: 700,
    paddingBlock: theme.spacing(8),
    borderRadius: "0.5rem",
    border: "1px solid transparent",
    transition:
      "padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

    "&:hover, &:focus": {
      paddingLeft: 8,
      border: `1px solid ${theme.palette.gray[800]}`,
    },
  },
}));

const KanbanColumnHeader: React.FC<IKanbanColumnHeader> = (props) => {
  const { anchorEl, isOpen, onClose, onOpen } = useAnchorDisclosure();
  const columnTitleInputRef = useRef<HTMLInputElement>(null);
  const [columnTitle, setColumnTitle] = useState(props.column.title);

  const focusOnTitleInput = () => {
    onClose();
    setTimeout(() => {
      columnTitleInputRef.current?.focus();
    }, 0);
  };

  const handleDeleteSection = () => {
    props.deleteColumn(props.column.id);
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.currentTarget.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 24,
        pb: 8,
      }}
    >
      <SColumnTitleInput
        value={columnTitle}
        onChange={handleTitleOnChange}
        inputRef={columnTitleInputRef}
        placeholder="Section name"
      />

      <IconButton size="small" onClick={(e) => onOpen(e.currentTarget)}>
        <DotsIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{ sx: { p: 8 } }}
      >
        <MenuItem onClick={handleDeleteSection} sx={{ color: "error.main" }}>
          <Box component={TrashIcon} sx={{ width: 20, height: 20, mr: 16 }} />
          Delete section
        </MenuItem>
        <MenuItem onClick={focusOnTitleInput}>
          <Box component={PenIcon} sx={{ width: 20, height: 20, mr: 16 }} />
          Rename section
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default KanbanColumnHeader;
